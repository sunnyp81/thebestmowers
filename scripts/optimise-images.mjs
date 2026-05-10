/**
 * Converts downloaded WP JPGs to optimised WebP using Sharp.
 * Input:  public/images/wp/*.jpg
 * Output: public/images/*.webp (max 900px wide, quality 82)
 * Run: node scripts/optimise-images.mjs
 *
 * Install: npm i -D sharp
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename, extname } from 'path';

const SRC_DIR = new URL('../public/images/wp/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const OUT_DIR = new URL('../public/images/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_WIDTH = 900;
const QUALITY = 82;

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error('Run fetch-images.mjs first.');
    process.exit(1);
  }

  const files = (await readdir(SRC_DIR)).filter(f => /\.(jpe?g|png|gif)$/i.test(f));
  console.log(`Optimising ${files.length} images…`);

  for (const file of files) {
    const stem = basename(file, extname(file));
    const outPath = join(OUT_DIR, `${stem}.webp`);

    if (existsSync(outPath)) {
      console.log(`  skip: ${stem}.webp`);
      continue;
    }

    try {
      const meta = await sharp(join(SRC_DIR, file)).metadata();
      await sharp(join(SRC_DIR, file))
        .resize({ width: Math.min(MAX_WIDTH, meta.width ?? MAX_WIDTH), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      console.log(`  ✓ ${stem}.webp`);
    } catch (e) {
      console.error(`  FAIL ${file}: ${e.message}`);
    }
  }

  console.log('\nDone. Reference images as /images/<stem>.webp in Astro pages.');
}

main().catch(console.error);
