/**
 * Fetches images from the legacy WP site and saves to public/images/
 * Run: node scripts/fetch-images.mjs
 */
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';

const WP_API = 'https://thebestmowers.co.uk/wp-json/wp/v2/media';
const OUT_DIR = new URL('../public/images/wp/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

async function fetchAllMedia() {
  const items = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${WP_API}?per_page=100&media_type=image&page=${page}`);
    if (!res.ok) break;
    const batch = await res.json();
    if (!batch.length) break;
    items.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return items;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return true;
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  console.log('Fetching WP media index…');
  const media = await fetchAllMedia();
  console.log(`Found ${media.length} images`);

  const manifest = [];
  for (const item of media) {
    const url = item.source_url;
    const filename = basename(url);
    const dest = join(OUT_DIR, filename);

    if (existsSync(dest)) {
      console.log(`  skip (exists): ${filename}`);
    } else {
      const ok = await downloadImage(url, dest);
      console.log(`  ${ok ? 'downloaded' : 'FAILED'}: ${filename}`);
    }

    manifest.push({
      id: item.id,
      filename,
      alt: item.alt_text || item.title?.rendered || '',
      width: item.media_details?.width,
      height: item.media_details?.height,
      originalUrl: url,
    });
  }

  await writeFile(
    join(OUT_DIR, '../wp-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nManifest written. Run: node scripts/optimise-images.mjs`);
}

main().catch(console.error);
