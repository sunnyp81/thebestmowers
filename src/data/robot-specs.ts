// Manufacturer-stated robot mower specs. Every figure read from the maker's own product or support page on the checked date.
export const ROBOT_CHECKED = '2026-10-02';

export type SlopeBasis = 'inside' | 'edge' | 'stated';

export interface RobotSpec {
  brand: string;
  model: string;
  areaM2: number;
  areaNote?: string;
  /** Maximum slope in %, as the maker states it (Mammotion calls it maximum climbing ability). */
  slopePct: number;
  slopeBasis: SlopeBasis;
  /** Boundary/edge slope where the maker gives it separately. */
  edgeSlopePct?: number;
  wireFree: boolean;
  reviewUrl?: string;
  source: string;
}

export const ROBOT_SPECS: RobotSpec[] = [
  { brand: 'Gardena', model: 'Sileno minimo 250', areaM2: 250, slopePct: 25, slopeBasis: 'inside', edgeSlopePct: 10, wireFree: false, source: 'https://www.gardena.com/int/products/lawn-care/robotic-lawnmowers/robotic-mower-sileno-minimo-250-m/970462803.html' },
  { brand: 'Segway', model: 'Navimow i105E', areaM2: 500, areaNote: 'recommended; Segway allows up to 600 m² on simple layouts', slopePct: 30, slopeBasis: 'inside', edgeSlopePct: 10, wireFree: true, source: 'https://uk.navimow.com/products/navimow-i1-robot-lawn-mower' },
  { brand: 'Husqvarna', model: 'Automower 305', areaM2: 600, slopePct: 40, slopeBasis: 'inside', edgeSlopePct: 15, wireFree: false, reviewUrl: '/reviews/husqvarna-automower-305/', source: 'https://www.husqvarna.com/uk/robotic-lawn-mowers/automower-305/' },
  { brand: 'Worx', model: 'Landroid Vision M600', areaM2: 600, slopePct: 30, slopeBasis: 'stated', wireFree: true, source: 'https://eu.worx.com/en/worx-landroid-vision-m600-wr206e/' },
  { brand: 'Worx', model: 'Landroid Vision M800', areaM2: 800, slopePct: 30, slopeBasis: 'stated', wireFree: true, reviewUrl: '/reviews/worx-landroid-vision-m800/', source: 'https://eu.worx.com/en/worx-landroid-vision-m800-wr208e/' },
  { brand: 'Husqvarna', model: 'Automower 410XE NERA', areaM2: 1000, slopePct: 30, slopeBasis: 'inside', edgeSlopePct: 20, wireFree: false, source: 'https://www.husqvarna.com/uk/robotic-lawn-mowers/automower-410xe-nera/' },
  { brand: 'Mammotion', model: 'Luba 2 AWD 1000', areaM2: 1000, slopePct: 80, slopeBasis: 'inside', edgeSlopePct: 45, wireFree: true, reviewUrl: '/reviews/mammotion-luba-2-awd-1000/', source: 'https://support.mammotion.com/portal/en/kb/articles/luba-2-awd-series-specifications' },
  { brand: 'Husqvarna', model: 'Automower 310E NERA', areaM2: 1500, areaNote: 'systematic pattern; Husqvarna gives 1,000 m² for irregular mowing', slopePct: 30, slopeBasis: 'inside', edgeSlopePct: 20, wireFree: true, source: 'https://www.husqvarna.com/uk/robotic-lawn-mowers/automower-310e-nera/' },
  { brand: 'Stiga', model: 'A 1500', areaM2: 2500, slopePct: 45, slopeBasis: 'stated', wireFree: true, source: 'https://www.stiga.com/uk/2r7102028-uks-stiga-a-1500.html' },
  { brand: 'Mammotion', model: 'Luba 2 AWD 3000', areaM2: 3000, slopePct: 80, slopeBasis: 'inside', edgeSlopePct: 45, wireFree: true, source: 'https://support.mammotion.com/portal/en/kb/articles/luba-2-awd-series-specifications' },
  { brand: 'Husqvarna', model: 'Automower 450X', areaM2: 5000, slopePct: 45, slopeBasis: 'inside', edgeSlopePct: 15, wireFree: false, source: 'https://www.husqvarna.com/uk/robotic-lawn-mowers/automower-450x/' },
];

export const robotLabel = (s: RobotSpec) => `${s.brand} ${s.model}`;
export const SLOPE_BASIS_LABEL: Record<SlopeBasis, string> = {
  inside: 'inside the lawn',
  edge: 'at the lawn edge',
  stated: 'single figure',
};
/** Slope % to degrees, rounded to the nearest degree. */
export const pctToDeg = (p: number) => Math.round((Math.atan(p / 100) * 180) / Math.PI);
