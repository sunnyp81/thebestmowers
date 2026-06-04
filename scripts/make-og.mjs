// Generates public/og-default.png (1200x630) from an inline SVG using sharp.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-default.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3faf0"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="12" fill="#316621"/>
  <g fill="none" stroke="#316621" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" transform="translate(96,150)">
    <path d="M0 96h78M12 96V40l27-21 27 21v56"/>
    <circle cx="39" cy="58" r="10"/>
  </g>
  <text x="210" y="226" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#316621">THE BEST MOWERS</text>
  <text x="96" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#24441b">Cordless &amp; Battery</text>
  <text x="96" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#24441b">Lawn Mowers, UK</text>
  <text x="96" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="500" fill="#475569">Independent, research-led buying guides and reviews</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out);
