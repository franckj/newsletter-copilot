# newslettercopilot.co: state and options (2026-11-19)

Reminder `newslettercopilot-next`. Client site (Juliet Lyall, care plan, unpaid: ops `clients/juliet-lyall.md`). This gives the state and the options; it does not pick for the client.

## State, checked today
- https://newslettercopilot.co/ answers 200; https://www.newslettercopilot.co/ forwards to it (301).
- Security certificate valid until 2026-12-19 (read from the live certificate; renewal is Cloudflare's, not checked).
- robots.txt, sitemap-index.xml and sitemap.xml answer 200.
- The waitlist address `/api/waitlist` answers (200 on a plain visit). No test signup was sent, so the path to Kit was not checked end to end.
- Search Console, 2026-10-19 to 2026-11-16: 0 clicks, 12 impressions, all on the home page.
- The page still loads Plausible's script (`src/layouts/BaseLayout.astro`, lines 71-75). On 2026-10-25 Franck said "leave newslettercopilot as is" when every other site left Plausible; on 2026-11-11 he wrote "Plausible is closed" (ops `subscriptions.md`). Whether Plausible still records anything for this site: not checked. Page views for the weekly digest come from Cloudflare Web Analytics (`scripts/analytics-digest.mjs`), not from Plausible.
- Still open in ops, not part of this site's code: the domain and the Cloudflare zone sit in Franck's accounts; the move to Juliet's own account is pending (ops `clients/juliet-lyall.md`; zone move dropped "later, not now" on 2026-10-19).

## Options
- **A. Stays as is.** Fits if nothing should change on a client site without a request from Juliet. Nothing to do.
- **B. Remove the Plausible script only.** Fits if a script that reports to a closed account should not load on her page. One change in `BaseLayout.astro`; page views keep coming from Cloudflare Web Analytics. Needs Franck's "go" and "deploy".

## Tasks
1. **Title: Remove the Plausible script from Juliet's site (only if Franck picks option B)**
   - Why: Plausible is closed (Franck, 2026-11-11); the script loads on every visit and its data goes nowhere he reads.
   - Change: delete the Plausible lines (71-75) in `src/layouts/BaseLayout.astro`, build, check the waitlist form still posts on a preview, then ask "deploy". If option A is picked, close the reminder and change nothing.

## Sources
- curl of the live site, 2026-11-19
- Search Console query (ops `scripts/gsc.py`), 2026-10-19 to 2026-11-16
- `README.md`, `src/layouts/BaseLayout.astro`, `scripts/analytics-digest.mjs`
- ops `plausible/README.md` (phase C, 2026-10-25), ops `subscriptions.md`, ops `clients/juliet-lyall.md`, ops `_context/decisions.md`

Research cost: $0 (curl, Search Console, repo reads).
