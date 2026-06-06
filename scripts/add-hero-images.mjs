/**
 * One-off: insert a hero image into content pages that currently have none.
 * Uses the existing optimised WebP library already in public/images/.
 * Non-homepage pages: image is inserted immediately after the first </header>.
 * Homepage: a dedicated banner section is inserted after the hero <section>.
 */
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const PAGES = join(ROOT, 'src/pages');
const IMAGES = join(ROOT, 'public/images');

// page (relative to src/pages) -> [image stem, alt text]
const MAP = {
  'best-lawn-mowers/index.astro': ['top_lawn_mowers_reviewed', 'The best lawn mowers for UK gardens, tested and ranked'],
  'brands/index.astro': ['top_lawn_mowers_reviewed-1', 'Lawn mowers from the leading UK brands'],
  'brands/bosch/index.astro': ['electric_bosch_lawnmower_model', 'Bosch electric lawn mower on a UK lawn'],
  'brands/cobra/index.astro': ['powerful_and_efficient_lawnmower', 'Cobra petrol lawn mower cutting a UK lawn'],
  'brands/dewalt/index.astro': ['powerful_cordless_lawnmower_technology', 'DeWalt cordless lawn mower'],
  'brands/ego/index.astro': ['high_performance_eco_friendly_lawnmower', 'EGO Power+ cordless lawn mower'],
  'brands/einhell/index.astro': ['einhell_cordless_lawnmower_details', 'Einhell cordless lawn mower close-up'],
  'brands/flymo/index.astro': ['electric_flymo_lawnmower_with_wheels', 'Flymo wheeled electric lawn mower'],
  'brands/greenworks/index.astro': ['eco_friendly_battery_powered_lawnmower-1', 'Greenworks battery-powered lawn mower'],
  'brands/gtech/index.astro': ['efficient_lightweight_mower_choice', 'Gtech lightweight cordless lawn mower'],
  'brands/husqvarna/index.astro': ['top_gardeners_lawn_mower', 'Husqvarna lawn mower on a UK lawn'],
  'brands/hyundai/index.astro': ['electric_hyundai_lawnmower_model', 'Hyundai electric lawn mower'],
  'brands/mac-allister/index.astro': ['efficient_corded_lawnmower_model', 'Mac Allister corded electric lawn mower'],
  'brands/makita/index.astro': ['high_performance_electric_lawn_mower-1', 'Makita cordless lawn mower'],
  'brands/mountfield/index.astro': ['lawn_mower_for_gardens', 'Mountfield lawn mower on a striped UK lawn'],
  'brands/qualcast/index.astro': ['efficient_corded_lawnmower_option', 'Qualcast corded electric lawn mower'],
  'brands/ryobi/index.astro': ['eco_friendly_yard_care_tools', 'Ryobi ONE+ cordless garden tools'],
  'brands/stiga/index.astro': ['top_lawn_mowers_recommended-1', 'Stiga lawn mower on a large lawn'],
  'brands/stihl/index.astro': ['lawn_mower_brand_name', 'Stihl cordless lawn mower'],
  'brands/worx/index.astro': ['electric_lawn_mower_brand-3', 'Worx cordless lawn mower'],
  'compare/cordless-vs-petrol/index.astro': ['cutting_grass_with_ease-2', 'Comparing cordless and petrol lawn mowers'],
  'compare/robot-vs-cordless/index.astro': ['cordless_lawnmower_by_einhell-6', 'Comparing robot and cordless lawn mowers'],
  'advice/index.astro': ['all_in_one_lawn_care', 'Lawn mower care, maintenance and buying advice'],
  'advice/garden-size/index.astro': ['top_lawn_mowers_for_tall_grass', 'Matching a lawn mower to your garden size'],
  'advice/maintenance/index.astro': ['lawn_care_made_simple', 'Lawn mower maintenance made simple'],
  'advice/maintenance/battery-care/index.astro': ['lithium_ion_battery_brushless_motor', 'Lithium-ion lawn mower battery and brushless motor'],
  'advice/maintenance/mulching/index.astro': ['lawn_care_made_easy-1', 'Mulching mower returning fine clippings to the lawn'],
  'advice/maintenance/sharpen-blade/index.astro': ['electric_rotary_mower_details', 'Underside of a rotary lawn mower showing the blade'],
  'advice/mowing-wet-grass/index.astro': ['cut_grass_with_ease', 'Mowing damp grass with an electric lawn mower'],
  'advice/safety-legal/index.astro': ['lawn_mower_options_for_seniors', 'Safe, easy-to-use lawn mower options'],
  'advice/safety-legal/can-drive-riding-road/index.astro': ['top_rated_kobalt_lawn_mower', 'Ride-on lawn mower on a private driveway'],
  'advice/safety-legal/who-takes-trade-ins-on-lawn-mowers/index.astro': ['efficient_and_eco_friendly_lawnmower', 'Used lawn mowers traded in at a dealer'],
  'advice/troubleshooting/index.astro': ['electric_lawnmower_performance_review', 'Troubleshooting a lawn mower that will not start'],
  'cordless-lawn-mowers/best/index.astro': ['electric_lawn_mower_model-6', 'Best cordless lawn mowers for UK gardens'],
  'cordless-lawn-mowers/large-gardens/index.astro': ['top_lawn_mowers_reviewed-2', 'Cordless lawn mower cutting a large UK garden'],
  'cordless-lawn-mowers/under-200/index.astro': ['battery_powered_lawnmower_by_einhell-1', 'Affordable cordless lawn mower under £200'],
  'cordless-lawn-mowers/with-roller/index.astro': ['electric_lawn_mower_model-7', 'Cordless lawn mower with a rear roller for stripes'],
  'petrol-lawn-mowers/self-propelled/index.astro': ['powerful_corded_lawnmower_choice-1', 'Self-propelled lawn mower on a large lawn'],
  'petrol-lawn-mowers/with-roller/index.astro': ['electric_lawn_mower_model-8', 'Petrol lawn mower with rear roller producing stripes'],
  'ride-on-lawn-mowers/best/index.astro': ['top_rated_mowers_for_lawns', 'Best ride-on lawn mowers for large UK gardens'],
  'ride-on-lawn-mowers/cheap/index.astro': ['lawn_mower_by_murray', 'Affordable ride-on lawn mower'],
};

const HOMEPAGE = ['index.astro', ['top_lawn_mowers_recommended', 'The best lawn mowers for UK gardens, independently reviewed']];

function heroImg(stem, alt, { eager = true } = {}) {
  return `    <img
      src="/images/${stem}.webp"
      alt="${alt}"
      width="900" height="506"
      class="w-full rounded-xl mb-10 object-cover"
      loading="${eager ? 'eager' : 'lazy'}"
    />`;
}

// uniqueness + existence guards
const seen = new Map();
const all = [HOMEPAGE, ...Object.entries(MAP)];
let bad = false;
for (const [page, [stem]] of all) {
  if (!existsSync(join(IMAGES, `${stem}.webp`))) { console.error(`MISSING IMAGE: ${stem}.webp (for ${page})`); bad = true; }
  if (seen.has(stem)) { console.error(`DUPLICATE IMAGE: ${stem}.webp used by ${seen.get(stem)} and ${page}`); bad = true; }
  seen.set(stem, page);
}
if (bad) process.exit(1);

let count = 0;

// Non-homepage pages: insert after first </header>
for (const [page, [stem, alt]] of Object.entries(MAP)) {
  const fp = join(PAGES, page);
  let src = await readFile(fp, 'utf8');
  if (src.includes('<img')) { console.log(`skip (already has img): ${page}`); continue; }
  const marker = '    </header>\n';
  const idx = src.indexOf(marker);
  if (idx === -1) { console.error(`NO </header> in ${page}`); continue; }
  const at = idx + marker.length;
  src = src.slice(0, at) + '\n' + heroImg(stem, alt) + '\n' + src.slice(at);
  await writeFile(fp, src);
  count++;
  console.log(`✓ ${page} -> ${stem}.webp`);
}

// Homepage: dedicated banner section after the hero </section>
{
  const [page, [stem, alt]] = HOMEPAGE;
  const fp = join(PAGES, page);
  let src = await readFile(fp, 'utf8');
  if (src.includes('<img')) {
    console.log(`skip (already has img): ${page}`);
  } else {
    const marker = '  </section>\n'; // first section close == hero
    const idx = src.indexOf(marker);
    const at = idx + marker.length;
    const block = `
  <section class="max-w-6xl mx-auto px-4 pt-12 -mb-4">
    <img
      src="/images/${stem}.webp"
      alt="${alt}"
      width="900" height="506"
      class="w-full rounded-2xl object-cover shadow-sm"
      loading="eager" fetchpriority="high"
    />
  </section>
`;
    src = src.slice(0, at) + block + src.slice(at);
    await writeFile(fp, src);
    count++;
    console.log(`✓ ${page} -> ${stem}.webp (homepage banner)`);
  }
}

console.log(`\nDone. Inserted ${count} hero images.`);
