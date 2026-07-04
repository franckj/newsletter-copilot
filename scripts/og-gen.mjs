// Generates public/og-image.png (1200x630) from brand tokens + Juliet's portrait.
// Run: node scripts/og-gen.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;
const NAVY = '#0F0D4E';
const RED = '#DB1C4A';
const PALE = '#9BB9F9';

// Circular portrait, right side.
const PHOTO = 300;
const PHOTO_CX = 960;
const PHOTO_CY = 300;

const circleMask = Buffer.from(
  `<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`
);

const portrait = await sharp(join(root, 'src/assets/juliet.png'))
  .resize(PHOTO, PHOTO, { fit: 'cover' })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="12%" r="60%">
      <stop offset="0%" stop-color="${PALE}" stop-opacity="0.14"/>
      <stop offset="65%" stop-color="${PALE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- ring behind portrait -->
  <circle cx="${PHOTO_CX}" cy="${PHOTO_CY}" r="${PHOTO / 2 + 8}" fill="none" stroke="${PALE}" stroke-width="4"/>

  <text x="80" y="150" font-family="sans-serif" font-size="24" font-weight="700"
        fill="${PALE}" letter-spacing="6">NEWSLETTER CO-PILOT</text>

  <text x="78" y="270" font-family="sans-serif" font-size="66" font-weight="800" fill="#ffffff">The <tspan fill="${RED}">#1 solution</tspan> for</text>
  <text x="78" y="345" font-family="sans-serif" font-size="66" font-weight="800" fill="#ffffff">your newsletter stress,</text>
  <text x="78" y="420" font-family="sans-serif" font-size="66" font-weight="800" fill="#ffffff">mess &amp; unrest.</text>

  <rect x="80" y="470" width="54" height="5" rx="2.5" fill="${RED}"/>
  <text x="80" y="530" font-family="sans-serif" font-size="30" font-weight="600" fill="#ffffff">Juliet Lyall</text>
  <text x="80" y="572" font-family="sans-serif" font-size="24" font-weight="400" fill="${PALE}">1-to-1 newsletter help for B2B founders</text>
</svg>`);

await sharp(bg)
  .composite([
    { input: portrait, left: PHOTO_CX - PHOTO / 2, top: PHOTO_CY - PHOTO / 2 },
  ])
  .png()
  .toFile(join(root, 'public/og-image.png'));

console.log('Wrote public/og-image.png');
