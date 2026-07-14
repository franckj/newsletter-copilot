#!/usr/bin/env node
// Dump the durable waitlist log (Cloudflare KV) to a local file for review.
// Emails in the log are already obfuscated (masked + SHA-256) by the Pages
// Function — no raw addresses ever leave Cloudflare.
//
//   node scripts/waitlist-log.mjs          # prints a table + writes reports/waitlist-log.ndjson
//
// Auth: uses your existing wrangler OAuth login (no token needed).

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const NAMESPACE_ID = 'd301b56ebaf743cfac930cc2040cf265'; // WAITLIST_LOG (see wrangler.toml)

const wrangler = (args) =>
  execFileSync('npx', ['wrangler', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

const keys = JSON.parse(
  wrangler(['kv', 'key', 'list', '--namespace-id', NAMESPACE_ID, '--remote'])
)
  .map((k) => k.name)
  .sort(); // keys are `sub:<iso-ts>:<hash8>` — lexical sort == chronological

if (keys.length === 0) {
  console.log('No waitlist submissions logged yet.');
  process.exit(0);
}

const entries = keys.map((key) =>
  JSON.parse(wrangler(['kv', 'key', 'get', key, '--namespace-id', NAMESPACE_ID, '--remote']))
);

mkdirSync('reports', { recursive: true });
writeFileSync('reports/waitlist-log.ndjson', entries.map((e) => JSON.stringify(e)).join('\n') + '\n');

console.log(`\n${entries.length} submission(s):\n`);
for (const e of entries) {
  const flag = e.ok ? 'ok ' : 'ERR';
  const kit = e.kitBody?.status ?? '—';
  console.log(`${e.ts}  ${flag}  kit=${e.kitStatus}/${kit}  ${e.firstName || '(no name)'}  ${e.emailMasked}`);
}
console.log(`\nFull records written to reports/waitlist-log.ndjson`);
