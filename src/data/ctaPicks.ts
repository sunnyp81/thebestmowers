// Existing picks reused for CTA blocks. Facts copied from each hub's own pick data; ASINs are the already-approved ones only.
export interface CtaPick {
  name: string;
  brand: string;
  bestFor: string;
  pros: string[];
  reviewUrl: string;
  asin?: string;
  query?: string;
}

export const CTA_PICKS: Record<string, CtaPick> = {
  ego: { name: 'EGO Power+ LM2122E-SP', brand: 'EGO', bestFor: 'large gardens (500-800 m²)', pros: ['56 V delivers genuinely petrol-like power', 'Variable-speed self-propelled drive', 'IPX4 weather-resistant; folds flat for storage'], reviewUrl: '/reviews/ego-lm2122e-sp/' },
  bosch36: { name: 'Bosch UniversalRotak 36-550', brand: 'Bosch', bestFor: 'best value, medium gardens to 400 m²', pros: ['Quiet ProSilence motor', '36 V Power for All battery shared across Bosch garden tools', '50 L grass box is huge for the class'], reviewUrl: '/reviews/bosch-easyrotak-36-550-lawnmower/', asin: 'B0BTZWQD49' },
  gtech: { name: 'Gtech CLM 2.0', brand: 'Gtech', bestFor: 'small to medium gardens, ease of use', pros: ['Light enough to carry one-handed', 'Huge 50 L grass box for the class', 'Simple, foolproof to live with'], reviewUrl: '/reviews/gtech-clm50/' },
  honda: { name: 'Honda HRX 476 VK', brand: 'Honda', bestFor: 'reliability over a lifetime', pros: ['GCV170 engine - properly bulletproof', 'Variable-speed self-propelled', 'Roto-Stop blade brake (engine stays running)'], reviewUrl: '/reviews/honda-hrx-476-vk/' },
  mountfieldSp46: { name: 'Mountfield SP46', brand: 'Mountfield', bestFor: 'best value self-propelled', pros: ['ST 140 OHV Mountfield engine', 'Self-propelled at this price', '46 cm steel deck'], reviewUrl: '/reviews/mountfield-sp46/', asin: 'B08J86J92W' },
  rotak32r: { name: 'Bosch Rotak 32 R', brand: 'Bosch', bestFor: 'small lawns under 200 m²', pros: ['32 cm deck, very manoeuvrable', 'Built like German power tools'], reviewUrl: '/reviews/bosch-rotak-32-review/', asin: 'B0G4DWK2J8' },
  hovervac: { name: 'Flymo Hovervac 250', brand: 'Flymo', bestFor: 'small lawns and steep banks', pros: ['Light at 6.6 kg', 'Includes 20 L grass collection bag'], reviewUrl: '/reviews/flymo-hovervac-250-review/', asin: 'B07KGXMFYP' },
  husqvarna305: { name: 'Husqvarna Automower 305', brand: 'Husqvarna', bestFor: 'reliable mid-sized UK lawns (up to 600 m²)', pros: ['11+ years of refined Husqvarna firmware', 'Climbs slopes up to 40%', 'App control + GPS theft alarm'], reviewUrl: '/reviews/husqvarna-automower-305/' },
  mountfield1538: { name: 'Mountfield 1538M-SD', brand: 'Mountfield', bestFor: 'best value 1-acre lawns', pros: ['Mountfield ST 175 OHV engine', '98 cm side-discharge deck', '5-position cut height'], reviewUrl: '/reviews/mountfield-1538m-sd/', query: 'Mountfield 1538M-SD ride-on lawn mower' },
  greenworks: { name: 'Greenworks G40LM41', brand: 'Greenworks', bestFor: 'medium to large gardens on a budget', pros: ['2-in-1 mulch or collect, twin batteries included', '40 V platform shared across Greenworks garden range'], reviewUrl: '/brands/greenworks/', asin: 'B06WGYYLP8' },
};
