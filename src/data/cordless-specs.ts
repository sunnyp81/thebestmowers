// Manufacturer-stated specs for UK cordless mowers. Every figure read from the maker's own product page on the checked date.
export const CORDLESS_CHECKED = '2026-09-28';

export interface CordlessSpec {
  brand: string;
  model: string;
  widthCm: number;
  /** Maker's recommended / maximum lawn area. When the maker gives a range, areaLow..areaHigh. */
  areaHigh: number;
  areaLow?: number;
  /** Battery the maker's area figure assumes, as the maker describes it. */
  battery: string;
  grassboxL: number;
  runtimeMin?: number;
  reviewUrl?: string;
  source: string;
}

export const CORDLESS_SPECS: CordlessSpec[] = [
  { brand: 'WORX', model: 'WG730E', widthCm: 30, areaHigh: 200, battery: '1 x 20V 4.0Ah', grassboxL: 30, source: 'https://eu.worx.com/en/30-cm-cordless-lawn-mower-20v-with-battery-and-charger-wg730e/' },
  { brand: 'Bosch', model: 'ROTAK18V-32', widthCm: 32, areaHigh: 150, battery: '1 x 18V, 4.0Ah or larger recommended', grassboxL: 35, source: 'https://www.bosch-diy.com/gb/en/p/rotak18v-32-06008b9p70' },
  { brand: 'Bosch', model: 'CityMower 18V-32-300', widthCm: 32, areaHigh: 300, battery: '1 x 18V 4.0Ah', grassboxL: 31, source: 'https://www.bosch-diy.com/za/en/p/citymower-18v-32-300-06008b9a08' },
  { brand: 'Bosch', model: 'ROTAK18V-34', widthCm: 34, areaHigh: 200, battery: '1 x 18V, 4.0Ah or larger recommended', grassboxL: 35, source: 'https://www.bosch-diy.com/gb/en/p/rotak18v-34-06008b9n70' },
  { brand: 'Mountfield', model: 'Princess 34 Li kit', widthCm: 34, areaHigh: 250, battery: '1 x 48V 2.0Ah', grassboxL: 35, runtimeMin: 15, reviewUrl: '/reviews/mountfield-princess-34/', source: 'https://www.mountfieldlawnmowers.co.uk/294346063-m21-princess-34-li-kit.html' },
  { brand: 'WORX', model: 'WG779E.1', widthCm: 34, areaLow: 250, areaHigh: 400, battery: '2 x 20V 4.0Ah', grassboxL: 30, source: 'https://eu.worx.com/en/34-cm-cordless-lawn-mower-40v-with-4-ah-batteries-and-charger-wg779e-1/' },
  { brand: 'Einhell', model: 'GE-CM 36/36 Li kit', widthCm: 36, areaHigh: 400, battery: '2 x 18V 4.0Ah', grassboxL: 40, source: 'https://www.einhell.co.uk/p/3413230-ge-cm-36-36-li-2x4-0ah/' },
  { brand: 'Bosch', model: 'ROTAK18V2-38', widthCm: 38, areaHigh: 500, battery: '2 x 18V, 4.0Ah or larger recommended', grassboxL: 40, source: 'https://www.bosch-diy.com/gb/en/p/rotak18v2-38-06008b9m02' },
  { brand: 'Makita', model: 'DLM382', widthCm: 38, areaHigh: 560, battery: '2 x 18V 6.0Ah', grassboxL: 40, reviewUrl: '/reviews/makita-dlm382/', source: 'https://www.makitauk.com/product/dlm382.html' },
  { brand: 'Greenworks', model: 'G40LM41 (4Ah kit)', widthCm: 41, areaHigh: 500, battery: '1 x 40V 4.0Ah', grassboxL: 50, source: 'https://www.greenworkstools.co.uk/products/40v-lawn-mower-41cm-with-4ah-battery' },
  { brand: 'Gtech', model: 'CLM50', widthCm: 42, areaHigh: 0, battery: '1 x 48V (Gtech states up to 40 min runtime)', grassboxL: 50, runtimeMin: 40, source: 'https://www.gtech.co.uk/garden-tools/lawnmowers/clm5-battery-lawnmower.html' },
  { brand: 'Bosch', model: 'ROTAK18V2-43', widthCm: 43, areaHigh: 600, battery: '2 x 18V, 4.0Ah or larger recommended', grassboxL: 50, source: 'https://www.bosch-diy.com/gb/en/p/rotak18v2-43-06008b9l01' },
  { brand: 'Bosch', model: 'AdvancedRotak 36V-44-750', widthCm: 44, areaHigh: 750, battery: '1 x 36V, 4.0Ah or larger recommended', grassboxL: 50, source: 'https://www.bosch-diy.com/gb/en/p/advancedrotak-36v-44-750-06008b9g00' },
  { brand: 'Stihl', model: 'RMA 248', widthCm: 46, areaHigh: 220, battery: '1 x Stihl AK 20', grassboxL: 52, source: 'https://www.stihl.co.uk/en/p/lawn-mowers-rma-248-ak-system-185020' },
  { brand: 'Makita', model: 'DLM480', widthCm: 48, areaLow: 650, areaHigh: 800, battery: '2 x 18V 6.0Ah', grassboxL: 62, source: 'https://www.makitauk.com/product/dlm480.html' },
];

/** Models with a published lawn-area figure (Gtech publishes runtime instead). */
export const CORDLESS_RATED = CORDLESS_SPECS.filter((s) => s.areaHigh > 0);

export const cordlessLabel = (s: CordlessSpec) => `${s.brand} ${s.model}`;
export const areaDisplay = (s: CordlessSpec) => (s.areaLow ? `${s.areaLow}-${s.areaHigh} m²` : `${s.areaHigh} m²`);

/** Width bands used on the site, with min/max of maker ratings (upper figures) inside each band. */
export function widthBands() {
  const bands = [
    { label: '30-34 cm', lo: 30, hi: 34 },
    { label: '36-40 cm', lo: 35, hi: 40 },
    { label: '41-44 cm', lo: 41, hi: 44 },
    { label: '46-48 cm', lo: 45, hi: 48 },
  ];
  return bands.map((b) => {
    const rows = CORDLESS_RATED.filter((s) => s.widthCm >= b.lo && s.widthCm <= b.hi);
    const vals = rows.map((r) => r.areaHigh).sort((a, c) => a - c);
    return { ...b, n: rows.length, min: vals[0], max: vals[vals.length - 1] };
  });
}
