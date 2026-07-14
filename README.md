# Newsletter Co-Pilot

Landing page for Juliet Lyall's newsletter advisory service.

- **Live site:** https://newslettercopilot.co
- **Stack:** Astro (static) → Cloudflare Pages, waitlist form → Kit via a Pages Function.

---

## For Juliet — editing the site yourself (no code)

**To change any wording on the page:**

1. Go to `src/content/copy.ts` in this repo on GitHub.
2. Click the pencil icon (edit).
3. Change the text between the quote marks. Don't touch the labels before the `:`.
4. Scroll to the bottom → **Commit changes** → **Commit directly to `main`**.
5. Wait ~90 seconds. The live site updates automatically. Refresh to see it.

**Every piece of text on the page lives in that one file.** You never need to open anything else.

**To preview a change before it goes live:** commit to a new branch instead of `main`. Cloudflare Pages creates a preview URL you can share before merging.

---

## For Franck — how it's built

### Content & structure

- `src/content/copy.ts` — every user-facing string. Single source of truth.
- `src/pages/index.astro` — section order (edit to reorder/remove sections).
- `src/components/*.astro` — one component per landing section.
- `src/styles/tokens.css` — palette, spacing, type scale. Change a hex once → whole site updates.
- `src/styles/global.css` — reset, buttons, section shell, headings.
- `src/assets/` — logo + portraits (astro:assets optimizes them at build).

### Waitlist form

- `src/components/WaitlistForm.astro` — reusable form (Hero + Final CTA). Works without JS (native POST); JS upgrades it to inline success/error.
- `functions/api/waitlist.ts` — Cloudflare Pages Function. Validates, checks honeypot, subscribes via Kit's authenticated **v3 API** (`api.convertkit.com/v3/forms/{id}/subscribe`). Do **not** use the public `app.kit.com` widget endpoint — it quarantines Cloudflare datacenter IPs and silently drops every subscriber. Auto-deploys with the site.
- Honeypot field name is set by the `HONEYPOT_FIELD` env var — rotate it per major deploy for extra spam protection.

### Local dev

```bash
npm install
npm run dev        # http://localhost:4321 (static preview; form endpoint not live)
npm run build      # outputs to dist/
```

To test the **form endpoint locally**, use Wrangler (runs the Pages Function):

```bash
npm run build
npx wrangler pages dev dist
```

### Environment variables (Cloudflare Pages → Settings → Environment variables)

| Variable | Environment | Notes |
|---|---|---|
| `KIT_API_KEY` | Production + Preview (secret) | Kit v3 public `api_key` (Kit → Settings → Advanced → API). Used server-side to subscribe via the **authenticated v3 API** (`api.convertkit.com/v3/forms/{id}/subscribe`), which bypasses Kit's form spam-guard. The public widget endpoint quarantines Cloudflare datacenter POSTs — do **not** switch back to it. |
| `KIT_FORM_ID` | Production + Preview | `9571375` — "Newsletter Co-pilot Waitlist V2". The **numeric** form ID (NOT the `runyourletter.kit.com/<slug>` uid). |
| `HONEYPOT_FIELD` | Production + Preview | e.g. `website_url` |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Production only | From Cloudflare Web Analytics |

`PUBLIC_*` vars are exposed to the client at build time. Non-prefixed vars are server-only (Pages Functions).

**KV binding:** `WAITLIST_LOG` (namespace `d301b56ebaf743cfac930cc2040cf265`), defined in `wrangler.toml` and applied on `wrangler pages deploy`. The Function writes one obfuscated record per submission (masked email + SHA-256 hash, name, timestamp, Kit status + response body). No raw email addresses are stored.

### Reviewing waitlist submissions

```
npm run log        # prints a table + writes reports/waitlist-log.ndjson
```

Reads the log straight from Cloudflare KV via your wrangler login. (Note: `wrangler kv` commands need `--remote` — without it they read empty local state.)

### Deploy

Push to `main` → GitHub Action (`.github/workflows/deploy.yml`) builds and runs
`wrangler pages deploy`. Build: `npm run build` · Output: `dist` · Node 22.

The project is **direct-upload** (not CF-native Git), so deploys go through the
Action, not Cloudflare's own Git integration. Requires repo secrets
`CLOUDFLARE_API_TOKEN` (Pages:Edit) + `CLOUDFLARE_ACCOUNT_ID`. Let the Action own
deploys — don't also run `wrangler pages deploy` by hand (both hit one project).
