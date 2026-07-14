interface Env {
  KIT_API_KEY: string;
  KIT_FORM_ID: string;
  HONEYPOT_FIELD: string;
  WAITLIST_LOG?: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();

  // Honeypot: real users don't fill hidden fields; bots do.
  const honeypotField = env.HONEYPOT_FIELD || 'website_url';
  const honeypotValue = form.get(honeypotField);
  if (honeypotValue) {
    // Silently accept — don't tell the bot it failed.
    return json({ ok: true });
  }

  const firstName = String(form.get('first_name') ?? '').trim();
  const email = String(form.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Please enter a valid email.' }, 400);
  }

  // POST to Kit's authenticated v3 API — NOT the public form widget endpoint
  // (app.kit.com/forms/{id}/subscriptions). That widget endpoint runs every
  // server-side POST through Kit's spam guard, which quarantines requests from
  // datacenter IPs (Cloudflare's) — the subscriber is never created and Kit
  // still returns HTTP 200 with { status: 'quarantined' }. The v3 API bypasses
  // the guard entirely. api_key is the public key; safe to use server-side.
  const kitRes = await fetch(
    `https://api.convertkit.com/v3/forms/${env.KIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        api_key: env.KIT_API_KEY,
        email,
        first_name: firstName,
      }),
    }
  );

  let kitBody: any = null;
  try {
    kitBody = await kitRes.json();
  } catch {
    // Non-JSON response — treat as an upstream failure.
  }

  // Success = HTTP 2xx AND a subscription object with an id was returned.
  // Failures come back as { error, message } (bad key/form id) or non-2xx.
  const failed =
    !kitRes.ok ||
    kitBody === null ||
    kitBody.error != null ||
    kitBody.subscription?.id == null;

  // Durable, privacy-preserving log of every submission + Kit's response.
  // Email is never stored raw: we keep a masked form (human-readable) plus a
  // SHA-256 hash (stable id for dedup without exposing the address).
  await logSubmission(env, {
    ts: new Date().toISOString(),
    ok: !failed,
    emailMasked: maskEmail(email),
    emailHash: await sha256Hex(email),
    firstName,
    kitStatus: kitRes.status,
    kitBody,
  });

  if (failed) {
    // Surface the real reason server-side so form breakage is visible in logs.
    console.error('Kit subscription failed', {
      formId: env.KIT_FORM_ID,
      httpStatus: kitRes.status,
      body: kitBody,
    });
    return json({ ok: false, error: 'Something went wrong. Please try again.' }, 502);
  }

  return json({ ok: true });
};

interface LogEntry {
  ts: string;
  ok: boolean;
  emailMasked: string;
  emailHash: string;
  firstName: string;
  kitStatus: number;
  kitBody: unknown;
}

// One KV key per submission (no read-modify-write, so concurrent signups never
// clobber each other). Key sorts chronologically: `sub:<iso-ts>:<hash8>`.
// Logging must never break a signup — swallow and console.error on failure.
async function logSubmission(env: Env, entry: LogEntry): Promise<void> {
  if (!env.WAITLIST_LOG) return;
  try {
    const key = `sub:${entry.ts}:${entry.emailHash.slice(0, 8)}`;
    await env.WAITLIST_LOG.put(key, JSON.stringify(entry));
  } catch (err) {
    console.error('Waitlist log write failed', err);
  }
}

// franck.j@gmail.com -> f******j@gmail.com (keeps first/last local char + domain)
function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const masked =
    local.length <= 2
      ? local[0] + '*'
      : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${masked}@${domain}`;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
