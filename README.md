# thebestmowers.co.uk

Astro 5 + Tailwind 4 rebuild of thebestmowers.co.uk. Hub-and-spoke SEO architecture targeting head-term lawn mower keywords (lawn mower, cordless, robot, electric, petrol, ride-on) and brand-head terms (Ryobi, Bosch, Husqvarna, Gtech, etc.) that the legacy WordPress site does not currently rank for.

## Architecture

```
TIER 1  Power-type hubs   /cordless-lawn-mowers/  /electric-lawn-mowers/
                          /petrol-lawn-mowers/    /robot-lawn-mowers/
                          /ride-on-lawn-mowers/   /hover-lawn-mowers/

TIER 1  Brand hubs        /brands/{ryobi|bosch|gtech|husqvarna|flymo|stihl|
                                    makita|dewalt|worx|einhell|mountfield|
                                    stiga|cobra|hyundai|mac-allister|qualcast}/

TIER 1  Editorial         /best-lawn-mowers/   /lawn-mower-deals/   /buying-guides/

TIER 1  Advice            /advice/{maintenance|troubleshooting|lawn-care|
                                    safety-legal|garden-size}/

TIER 2  Sub-hubs          /cordless-lawn-mowers/{best|under-200|large-gardens|
                                                 small-gardens|with-roller}/
                          /robot-lawn-mowers/{best|no-perimeter-wire|...}/
                          /brands/{brand}/{cordless|petrol|robot}/

TIER 3  Spokes            /reviews/{model-slug}/
                          /compare/{a}-vs-{b}/
                          /advice/{category}/{topic-slug}/
```

## Build phases

| Phase | Status | Scope |
|-------|--------|-------|
| 0 | Pending | CTR triage on legacy WP — `/lightweight-for-elderly/`, `/what-time-legally-mow-lawn/`, `/whats-mulching/`, `/best-battery-powered-lawn-mower-reviews-uk/` |
| 1 | **In progress** | 6 power-type hubs + homepage. Cordless hub = canonical template. |
| 2 | Pending | 16 brand hubs |
| 3 | Pending | 20–30 sub-hubs |
| 4 | Pending | Comparison pages |
| 5 | Pending | Top 30 review pages migrated to `/reviews/` from legacy URLs |
| 6 | Pending | Advice cluster consolidation |
| 7 | Pending | Ongoing: 10–15 new reviews/quarter |

## Deploy

GitHub repo → Cloudflare Pages.
- Build: `npm run build` · Output: `dist` · Node: 22

## Migration

All legacy WordPress URLs need 301 redirects to new equivalents — see `redirects.json` (pending).
- Tier 1: keep slug, content rewrite to template (top 30 review pages)
- Tier 2: consolidate thin/vague slugs into nearest hub
- Tier 3: 410 zero-traffic dead pages
