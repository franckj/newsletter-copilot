interface Env {
  KIT_FORM_ID: string;
  HONEYPOT_FIELD: string;
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

  // POST to Kit's public form endpoint — no API key needed.
  const kitRes = await fetch(
    `https://app.kit.com/forms/${env.KIT_FORM_ID}/subscriptions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
      }),
    }
  );

  if (!kitRes.ok) {
    return json({ ok: false, error: 'Something went wrong. Please try again.' }, 502);
  }

  return json({ ok: true });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
