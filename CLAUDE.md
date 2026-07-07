# thebestmowers — Project Brain

Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here.

## Current state

thebestmowers.co.uk — UK cordless/battery lawn-mower affiliate review site. **🎉 LIVE since Jun 5 2026** on the new build. **Astro (5/6) + Tailwind 4**, fully static, ~83-84 pages. Repo `sunnyp81/thebestmowers`, branch `main`, local `C:\Users\sunny\repos\thebestmowers`. Auto-deploys from `main` to Cloudflare Pages (CF Pages production branch = `main`, NS on Cloudflare). GA4 `G-MYVR8KK0X9` (stream 15016105246). Amazon Associates affiliate tag **`thebestmowers-21`** (centralised in `src/lib/affiliate.ts`).

The new Astro site is a full hub-and-spoke rebuild that replaced the legacy WordPress + Oxygen site (which had 8,142 keywords but ~zero head-term rankings). Architecture: 6 power-type hubs (cordless/electric/petrol/robot/ride-on/hover) + ~16 brand hubs + editorial + advice + tier-2 sub-hubs + tier-3 reviews/compare spokes. Flagship money page = **/best-battery-powered-lawn-mower-reviews-uk/** (the KEEP URL = ~65% of historic clicks). Positioning: a genuine UK hands-on mower-testing authority feel (named tester, "how we research/test", multi-criteria scores) — NOT thin AI affiliate spam.

Verified live Jun 6: flagship 200 + correct `.co.uk` canonical + 9 tagged affiliate links, legacy 301s firing, robots+sitemap 200, 0 console errors, 8 money pages semantic-audit ≥85.

## Key facts & warnings

- 🔴 **GSC property `sc-domain:thebestmowers.co.uk` is in the 2012.infinite account (also added to sunnypat81).** Bing site verified. Sitemap submitted to both.
- 🔴 **Hermes enrichment cron keeps generating thin/duplicate content on this repo** (pushed a competing thin flagship + thin US-spelling `/battery-for-small-yard/` during the Jun 4 build; had to rebase, take my versions, delete the thin page). **Consider excluding thebestmowers from the enrichment cron.**
- 🔴 **No first-party testing claims may be fabricated.** ~70 fake "we tested/measured/weighed/3 gardens/luggage scale" claims were stripped sitewide (Jun 4-5) and reframed as research-led (manufacturer specs + verified owner reviews + UK retail data) via HowWeResearch + Disclosure components. Husqvarna's fake test narrative was rewritten. Keep it honest.
- **Amazon tag is `thebestmowers-21`** (a prior rebuild hardcoded the WRONG tag `tbm-21`). All affiliate links use tagged Amazon UK SEARCH links (`amazonSearch` — no verified ASINs yet), `rel="nofollow sponsored noopener noreferrer"`. Swap in exact ASINs later if desired.
- 🔴 **Legacy WordPress credentials (old site, now dead/replaced):** WP user `William` app password is in central memory `thebestmowers-uk.md` — LOCATION pointer only, not copied here. The live site is Astro/CF Pages, not WP.
- No em/en dashes in content (global rule).
- Verified product facts (corrected Jun 5): Gtech CLM 2.0 = 48V/42cm/50L/no roller; Greenworks GD40LM45 discontinued → use G40LM41; Mountfield flagship pick is the Li cordless.
- UGC pattern: `OwnerVoices.astro` + `src/data/ownerVoices.ts` = real attributed owner sentiment (Which?, Trusted Reviews, DIY Garden, PistonHeads, Amazon/eBay), framed "reflects authors, not us". Reusable across portfolio.
- AI images via nano-banana/Gemini (`scripts/gen-ai-images.py`) are generic unbranded illustrative UK scenes (honest, not the actual tested products). OG via `scripts/make-og.mjs`.
- URL migration: `public/_redirects` maps 328 legacy WP URLs (301). Flagship + /chainsaw-oil/ + /can-drive-riding-road/ preserved.

## STILL OPEN (Sunny)

- 🔴 **Mark `affiliate_click` as a Key Event in GA4** (Admin → Events → toggle once it has fired). Until then conversions = blind. Event now fires on every sponsored/Amazon link with `link_url`, `link_text`, `page_path`, `merchant`.
- 🔴 **Provide real `sameAs` URLs** (Trustpilot / Companies House / socials) → drop into `SITE.sameAs` in `src/lib/site.ts`. Plumbing is wired (orgSchema emits it when non-empty). #1 AI/entity corroboration gap; do NOT fabricate.
- **Off-site mentions** = the real AI/Bing ceiling now (on-page is done): niche forums, Reddit, review-site listings, portfolio Tier-1 cross-links. Bing IndexNow would speed fresh-page indexing (Copilot relies on Bing index).

- **`www` not fully live:** `www.thebestmowers.co.uk` added to the Pages project (via CF API, account `aba0a6722a4510842ca473315a8ba13e`) but PENDING — no www DNS record (the token had no DNS scope). Add CNAME `www`→`thebestmowers.pages.dev` (proxied) or supply a DNS-scoped token. Apex is fully live.
- **Entity / E-E-A-T signals:** need real Organization `sameAs` URLs (Trustpilot / Companies House / socials) + a decision on naming a human editor/author (e.g. Sunny) — then wire author/sameAs schema. (Don't fabricate.)
- Monitoring: one-time cloud routine `trig_016JSAbB67xbNEZNpBxz2M3x` fired 2026-06-16 (live-health + Google/Bing index proxy, emails 2012.infinite@gmail.com).

## History

- 2026-07-07 (verification pass, later same day) — Confirmed earlier same-day soft-404 fix + Bing-earner rebuild (`c712b40`/`2d29c7d`/`b9598ae`) is pushed to `origin/main` and live: `/` 200, unknown paths now genuinely 404 (was homepage 200), all 9 new pages 200, legacy redirects (`/cordless-lawn-mower/` -> flagship, `/self-propelled-petrol-lawn-mower-slopes-steep-hills/` -> `/petrol-lawn-mowers/self-propelled/`) firing correctly. GSC pull (2026-06-08..07-05) shows the striking-distance pos 10-30 queries are almost all on now-301'd legacy URLs, not live pages, so score improvement depends on Google reprocessing the redirects/soft-404 fix (days-to-weeks), not further code changes this pass. Submitted the 9 new/changed URLs to Bing (`submit_url_batch`, all accepted). No further repo edits made — earlier pass already covered this recovery's highest-ROI fixes.
- 2026-07-07 — Data-driven optimisation pass (`c712b40`). CRITICAL FIND: no 404.html meant CF Pages SPA-fallback served the homepage with 200 for EVERY unmatched URL (thousands of legacy WP URLs = homepage duplicates, likely suppressing Google sitewide pos 40-90). Added 404.astro (noindex). Bing = the revenue engine (1,924 clicks/2mo vs ~3 Google): repointed mis-targeted legacy 301s (gtech-clm50-review 180 clicks → /reviews/gtech-clm50/ not brand hub; mcgregor-review was → WRONG brand /brands/ego/; 4 homepage dumps → real pages) and built 9 replacement pages for top Bing earners: /cordless-lawn-mowers/lightweight/ ("lightweight lawn mowers" 2,615 Bing impr pos 10, 0 clicks), what-time-legally-mow-lawn, repair-cut-cable, clean-carburettor, grass-cutting-height-chart, lawn-mower-repairs-near-me, flymo-warranty-registration (3.2k navigational impr), brands/spear-jackson (63 clicks), brands/mcgregor (35 clicks). Generic redirect rules /tag/* + /:slug/page/* + /index.php. New URLs submitted to Bing via API post-deploy. WATCH: Bing positions on the repointed URLs; Google recrawl of former soft-404s; /brands/bosch/ pos 46.8 (283 impr) is the first Google striking-distance page. Legacy /sovereign-lawn-mower-review/ (25 Bing clicks) still dumps on /petrol-lawn-mowers/, candidate for a /brands/sovereign/ page next pass.

- 2026-03-19/20 — Legacy WP site (247 URLs, health 32/100, frozen at 2024 content): refreshed 10 money pages (7 products + table + FAQ each), batch-updated 63 titles to 2026, About page E-E-A-T, homepage tidy via Code Snippets, published buying-guide + UK mowing calendar.
- 2026-04-03 — 8 new UGC affiliate articles created as WP drafts (robot, cordless, petrol, brand comparisons) with real forum UGC + tagged affiliate links.
- 2026-05-10/11 — Astro 5/6 hub-and-spoke rebuild built locally: 73 pages, all 6 power-type hubs + 23 reviews + 17 brand hubs + sub-hubs + compare + advice. Schema library, content collections, PickCard component.
- 2026-06-04 — Phase 1 makeover pushed (`d54f626`): built the missing flagship KEEP URL, new pages, honest E-E-A-T scrub, fixed Amazon tag, 328-URL redirect map, OwnerVoices UGC.
- 2026-06-05 — 6-agent full-site audit + remediation (`8c04d48`→`140ee70`): monetisation (139 tagged affiliate links + CTAs), honesty (stripped surviving fake-test metas/schema), facts, cannibalisation (noindex+canonical), images, UGC, schema (offers+image+dateModified), fixed 547 escaped-apostrophe render bug. **WENT LIVE.**
- 2026-06-06 — Post-launch: GA4 live, sitemap on both GSC properties, `www` added (pending DNS), AI hero images + 2 inline-SVG charts (VoltageGuide, DeckWidthGuide).
- 2026-06-24 — Traffic analysis: Google ≈0 (3wk-old domain, impr rising 10→337/day but stuck pos 47-90, ~0 clicks). Revenue engine is Bing+DDG+Yahoo (~34%) + ChatGPT/AI (~9%) + Direct (54%, mostly AI/app dark traffic); ~1,080 sessions/30d, 62 outbound affiliate clicks. Shipped (build green, NOT yet pushed): (1) global `affiliate_click` GA4 event in BaseLayout; (2) `speakableSchema` site-wide (h1 + `.faq-answer`); (3) `sameAs` plumbing in site.ts/orgSchema (empty pending real URLs). robots.txt already allows all AI bots.
- 2026-06-15 — Claude Design prompt authored for an affiliate-conversion redesign (testing-authority framing, pillar comparison page, product cards with multi-criteria scores, How-We-Test trust block); research notes from Expert Reviews / DIY Garden / Gardeners' World patterns.
