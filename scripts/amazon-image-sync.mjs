#!/usr/bin/env node
// VENDORED from amazon-creators-sync (do not edit here - edit the source repo and re-copy).
// Build-time Amazon image sync: extracts ASINs from data files, fetches hotlink image URLs
// via Creators API, writes src/data/amazon-images.json (gitignored - TOS: URLs stale after 24h).
// No credentials in env => exits 0 with a warning so builds never break.
// Usage: node scripts/amazon-image-sync.mjs <tag> <dataFile...> [--out src/data/amazon-images.json]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const out = outIdx !== -1 ? args.splice(outIdx, 2)[1] : 'src/data/amazon-images.json';
const [tag, ...dataFiles] = args;
const ASIN_RE = /(?:asin|amazonAsin)\s*[:=]\s*['"`](B0[A-Z0-9]{8})['"`]|buildAmazonLink\(\s*['"`](B0[A-Z0-9]{8})['"`]/gi;

const asins = new Set();
for (const f of dataFiles) for (const m of readFileSync(f, 'utf8').matchAll(ASIN_RE)) asins.add((m[1] ?? m[2]).toUpperCase());
if (!asins.size) { console.error('[amazon-image-sync] no ASINs found, skipping'); process.exit(0); }

// Reuse existing output if fresh (<20h) - saves quota, lets keyless local builds keep images.
if (existsSync(out)) {
  try {
    const prev = JSON.parse(readFileSync(out, 'utf8'));
    const ageH = (Date.now() - Date.parse(prev.fetchedAt)) / 3.6e6;
    if (ageH < 20 && [...asins].every((a) => a in prev.items || (prev.missing ?? []).includes(a))) {
      console.error(`[amazon-image-sync] reusing ${out} (${ageH.toFixed(1)}h old)`);
      process.exit(0);
    }
  } catch {}
}

const id = process.env.CREATORS_CREDENTIAL_ID, secret = process.env.CREATORS_CREDENTIAL_SECRET;
if (!id || !secret) {
  console.error('[amazon-image-sync] WARN: no CREATORS_CREDENTIAL_ID/SECRET in env - building without images');
  if (!existsSync(out)) writeFileSync(out, JSON.stringify({ fetchedAt: null, items: {}, missing: [] }));
  process.exit(0);
}

const marketplace = process.env.CREATORS_MARKETPLACE ?? 'www.amazon.co.uk';
const tokenRes = await fetch(process.env.CREATORS_TOKEN_URL ?? 'https://api.amazon.co.uk/auth/o2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'client_credentials', scope: process.env.CREATORS_SCOPE ?? 'creatorsapi::default', client_id: id, client_secret: secret }),
});
const token = (await tokenRes.json()).access_token;
if (!token) { console.error('[amazon-image-sync] WARN: token exchange failed - building without images'); process.exit(0); }

const result = { fetchedAt: new Date().toISOString(), marketplace, staleAfterHours: 24, items: {}, missing: [] };
const list = [...asins];
for (let i = 0; i < list.length; i += 10) {
  const batch = list.slice(i, i + 10);
  if (i) await new Promise((r) => setTimeout(r, 1100));
  const res = await fetch(process.env.CREATORS_CATALOG_URL ?? 'https://creatorsapi.amazon/catalog/v1/getItems', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'x-marketplace': marketplace, 'Content-Type': 'application/json' },
    body: JSON.stringify({ marketplace, partnerTag: tag, itemIds: batch, resources: ['images.primary.large', 'images.primary.medium', 'itemInfo.title'] }),
  });
  let body;
  if (res.status === 400 && process.env.CREATORS_PARTNER_TAG && tag !== process.env.CREATORS_PARTNER_TAG) {
    // Site tag not yet mapped to the credential: refetch with the enrolled tag.
    // Only the API call attribution changes; on-page links keep the site tag.
    const retry = await fetch(process.env.CREATORS_CATALOG_URL ?? 'https://creatorsapi.amazon/catalog/v1/getItems', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'x-marketplace': marketplace, 'Content-Type': 'application/json' },
      body: JSON.stringify({ marketplace, partnerTag: process.env.CREATORS_PARTNER_TAG, itemIds: batch, resources: ['images.primary.large', 'images.primary.medium', 'itemInfo.title'] }),
    });
    if (retry.ok) body = await retry.json();
    else { console.error(`[amazon-image-sync] WARN: getItems ${res.status}, retry ${retry.status} - continuing`); continue; }
  } else if (!res.ok) { console.error(`[amazon-image-sync] WARN: getItems ${res.status} - continuing`); continue; }
  else body = await res.json();
  for (const item of body?.itemsResult?.items ?? []) {
    const pick = item.images?.primary?.large ?? item.images?.primary?.medium;
    if (item.asin && pick?.url) result.items[item.asin] = { title: item.itemInfo?.title?.displayValue ?? null, image: { url: pick.url, width: pick.width, height: pick.height } };
  }
  for (const a of batch) if (!(a in result.items)) result.missing.push(a);
}
writeFileSync(out, JSON.stringify(result, null, 2));
console.error(`[amazon-image-sync] wrote ${Object.keys(result.items).length}/${list.length} images to ${out}${result.missing.length ? ` (missing: ${result.missing.join(',')})` : ''}`);
