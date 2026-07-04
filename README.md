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
- `functions/api/waitlist.ts` — Cloudflare Pages Function. Validates, checks honeypot, POSTs to Kit's public form endpoint. Auto-deploys with the site.
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
| `KIT_FORM_ID` | Production + Preview | `a184c8d5c1` |
| `HONEYPOT_FIELD` | Production + Preview | e.g. `website_url` |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Production only | From Cloudflare Web Analytics |

`PUBLIC_*` vars are exposed to the client at build time. Non-prefixed vars are server-only (Pages Functions).

### Deploy

Push to `main` → Cloudflare Pages auto-builds and deploys.
Build command: `npm run build` · Output dir: `dist` · Node 20+ · Framework preset: Astro.
