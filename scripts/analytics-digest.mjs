// Weekly Cloudflare Web Analytics digest for newslettercopilot.co.
// Writes a markdown report (last 7 days vs prior 7 days) to reports/.
//
// Auth: prefers CF_ANALYTICS_TOKEN env (durable, recommended for cron);
// falls back to the wrangler OAuth token cached on disk.
//
// Run: node scripts/analytics-digest.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const ACCOUNT = 'caaea080dc96ef6541c3f5091718fe1e';
const SITE_TAG = process.env.CF_SITE_TAG || '7c019a7ceaad44d8b00f249345902901';
const SITE = 'newslettercopilot.co';
const GQL = 'https://api.cloudflare.com/client/v4/graphql';

function getToken() {
  // 1) env  2) durable token file (used by the weekly cron)  3) wrangler OAuth (dev)
  if (process.env.CF_ANALYTICS_TOKEN) return process.env.CF_ANALYTICS_TOKEN.trim();
  try {
    const t = readFileSync(join(homedir(), '.config/newsletter-copilot/cf-analytics.token'), 'utf8').trim();
    if (t) return t;
  } catch {}
  try {
    const cfg = readFileSync(join(homedir(), '.config/.wrangler/config/default.toml'), 'utf8');
    const m = cfg.match(/oauth_token\s*=\s*"([^"]+)"/);
    if (m) return m[1];
  } catch {}
  throw new Error('No token: create ~/.config/newsletter-copilot/cf-analytics.token or set CF_ANALYTICS_TOKEN.');
}

const TOKEN = getToken();

// ── date helpers (YYYY-MM-DD, UTC) ──
const iso = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};
const TODAY = iso(new Date());
const D7 = iso(daysAgo(7));
const D14 = iso(daysAgo(14));

async function gql(query) {
  const res = await fetch(GQL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error('GraphQL: ' + JSON.stringify(json.errors));
  return json.data.viewer.accounts[0];
}

const filt = (from, to) =>
  `{ AND: [{ date_geq: "${from}" }, { date_lt: "${to}" }, { siteTag: "${SITE_TAG}" }] }`;

// Sampling-aware totals: estimate = Σ(count × sampleInterval).
async function totals(from, to) {
  const a = await gql(`query { viewer { accounts(filter: {accountTag: "${ACCOUNT}"}) {
    rumPageloadEventsAdaptiveGroups(limit: 5000, filter: ${filt(from, to)}) {
      count sum { visits } avg { sampleInterval } dimensions { date }
    } } } }`);
  let pv = 0, visits = 0;
  for (const r of a.rumPageloadEventsAdaptiveGroups) {
    const si = r.avg.sampleInterval || 1;
    pv += r.count * si;
    visits += (r.sum.visits || 0) * si;
  }
  return { pv: Math.round(pv), visits: Math.round(visits) };
}

async function topBy(dim, from, to, n = 5) {
  const a = await gql(`query { viewer { accounts(filter: {accountTag: "${ACCOUNT}"}) {
    rumPageloadEventsAdaptiveGroups(limit: 5000, filter: ${filt(from, to)}) {
      count avg { sampleInterval } dimensions { ${dim} }
    } } } }`);
  const agg = {};
  for (const r of a.rumPageloadEventsAdaptiveGroups) {
    const k = r.dimensions[dim] || '(none)';
    agg[k] = (agg[k] || 0) + r.count * (r.avg.sampleInterval || 1);
  }
  return Object.entries(agg)
    .sort((x, y) => y[1] - x[1])
    .slice(0, n)
    .map(([k, v]) => [k, Math.round(v)]);
}

async function webVitals(from, to) {
  const a = await gql(`query { viewer { accounts(filter: {accountTag: "${ACCOUNT}"}) {
    rumWebVitalsEventsAdaptiveGroups(limit: 1, filter: ${filt(from, to)}) {
      count
      quantiles {
        largestContentfulPaintP75
        interactionToNextPaintP75
        cumulativeLayoutShiftP75
        firstContentfulPaintP75
        timeToFirstByteP75
      }
    } } } }`);
  const g = a.rumWebVitalsEventsAdaptiveGroups[0];
  return g ? { count: g.count, q: g.quantiles } : null;
}

// ── format helpers ──
const ms = (us) => (us == null || us < 0 ? '—' : `${(us / 1000).toFixed(0)} ms`);
const s2 = (us) => (us == null || us < 0 ? '—' : `${(us / 1_000_000).toFixed(2)} s`);
const pct = (cur, prev) => {
  if (!prev) return cur ? '▲ new' : '—';
  const d = Math.round(((cur - prev) / prev) * 100);
  return d === 0 ? '± 0%' : d > 0 ? `▲ +${d}%` : `▼ ${d}%`;
};
// CWV rating vs Google thresholds
const rate = (v, good, poor) =>
  v == null || v < 0 ? '' : v <= good ? ' 🟢' : v <= poor ? ' 🟡' : ' 🔴';

const table = (rows) =>
  rows.length ? rows.map(([k, v]) => `| ${k} | ${v} |`).join('\n') : '| _(no data yet)_ | |';

const cur = await totals(D7, TODAY);
const prev = await totals(D14, D7);
const pages = await topBy('requestPath', D7, TODAY);
const refs = await topBy('refererHost', D7, TODAY);
const geo = await topBy('countryName', D7, TODAY);
const dev = await topBy('deviceType', D7, TODAY);
const cwv = await webVitals(D7, TODAY);

const q = cwv?.q ?? {};
const md = `# ${SITE} — weekly analytics digest

**Window:** ${D7} → ${TODAY} (vs prior week ${D14} → ${D7})
_Source: Cloudflare Web Analytics (RUM). Generated ${TODAY}._

## Traffic

| Metric | This week | Last week | Change |
|---|---|---|---|
| Pageviews | ${cur.pv} | ${prev.pv} | ${pct(cur.pv, prev.pv)} |
| Visits | ${cur.visits} | ${prev.visits} | ${pct(cur.visits, prev.visits)} |

## Core Web Vitals (p75)${cwv ? '' : ' — _no samples yet_'}

| Metric | p75 | Google "good" |
|---|---|---|
| LCP | ${s2(q.largestContentfulPaintP75)}${rate(q.largestContentfulPaintP75, 2_500_000, 4_000_000)} | ≤ 2.5 s |
| INP | ${ms(q.interactionToNextPaintP75)}${rate(q.interactionToNextPaintP75, 200_000, 500_000)} | ≤ 200 ms |
| CLS | ${q.cumulativeLayoutShiftP75 != null && q.cumulativeLayoutShiftP75 >= 0 ? q.cumulativeLayoutShiftP75.toFixed(3) : '—'}${rate(q.cumulativeLayoutShiftP75, 0.1, 0.25)} | ≤ 0.10 |
| FCP | ${s2(q.firstContentfulPaintP75)} | ≤ 1.8 s |
| TTFB | ${ms(q.timeToFirstByteP75)} | ≤ 800 ms |

## Top pages
| Path | Views |
|---|---|
${table(pages)}

## Top referrers
| Source | Views |
|---|---|
${table(refs.map(([k, v]) => [k === '' ? '(direct)' : k, v]))}

## Top countries
| Country | Views |
|---|---|
${table(geo)}

## Devices
| Type | Views |
|---|---|
${table(dev)}
`;

mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, `reports/analytics-${TODAY}.md`), md);
writeFileSync(join(root, 'reports/latest.md'), md);
console.log(`Wrote reports/analytics-${TODAY}.md (pv this week: ${cur.pv})`);
