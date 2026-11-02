// Top pick per brand hub (first pick on each brand page). ASINs are the already-approved ones only.
export interface BrandTop { slug: string; name: string; bestFor: string; asin?: string; reviewUrl: string }
export const BRAND_TOP_PICKS: BrandTop[] = [
  { slug: 'ryobi', name: 'Ryobi RY18LMX40A-150', bestFor: 'mid-size lawns, ONE+ owners', reviewUrl: '/reviews/ryobi-cordless/' },
  { slug: 'bosch', name: 'Bosch Rotak 32 R', bestFor: 'small lawns under 200 m²', asin: 'B0G4DWK2J8', reviewUrl: '/reviews/bosch-rotak-32-review/' },
  { slug: 'gtech', name: 'Gtech CLM 2.0', bestFor: 'small UK gardens, first-time cordless buyers', reviewUrl: '/reviews/gtech-clm50/' },
  { slug: 'husqvarna', name: 'Husqvarna Automower 305', bestFor: 'reliable mid-sized robot mowing', reviewUrl: '/reviews/husqvarna-automower-305/' },
  { slug: 'flymo', name: 'Flymo Hovervac 250', bestFor: 'small lawns and steep banks', asin: 'B07KGXMFYP', reviewUrl: '/reviews/flymo-hovervac-250-review/' },
  { slug: 'stihl', name: 'Stihl RM 248', bestFor: 'premium petrol push', asin: 'B07RCX3D5S', reviewUrl: '/brands/stihl/' },
  { slug: 'makita', name: 'Makita DLM382Z (twin 18V LXT)', bestFor: 'LXT owners with medium lawns', asin: 'B08VWPGBTB', reviewUrl: '/brands/makita/' },
  { slug: 'dewalt', name: 'DeWalt DCMW564 (twin 18V XR)', bestFor: 'XR ecosystem owners', reviewUrl: '/brands/dewalt/' },
  { slug: 'worx', name: 'Worx Landroid Vision M800', bestFor: 'budget wire-free robot mower', asin: 'B0C4YPV9R7', reviewUrl: '/reviews/worx-landroid-vision-m800/' },
  { slug: 'einhell', name: 'Einhell GE-CM 36/37 Li', bestFor: 'value cordless on Power X-Change', asin: 'B07L1JJVZP', reviewUrl: '/brands/einhell/' },
  { slug: 'mountfield', name: 'Mountfield SP46', bestFor: 'best value self-propelled petrol', asin: 'B08J86J92W', reviewUrl: '/reviews/mountfield-sp46/' },
  { slug: 'stiga', name: 'Stiga A 1500', bestFor: 'large-garden robot mowing', asin: 'B0GMRG616G', reviewUrl: '/robot-lawn-mowers/' },
  { slug: 'cobra', name: 'Cobra MX46SPB', bestFor: 'mid-range Briggs-engined petrol', reviewUrl: '/reviews/cobra-mx46spb/' },
  { slug: 'hyundai', name: 'Hyundai HYM510SP', bestFor: 'cheapest self-propelled petrol', asin: 'B079YV5TDB', reviewUrl: '/brands/hyundai/' },
  { slug: 'mac-allister', name: 'Mac Allister MLMP1500S', bestFor: 'cheapest reliable corded electric', reviewUrl: '/brands/mac-allister/' },
  { slug: 'qualcast', name: 'Qualcast Hand Cylinder Mower', bestFor: 'tiny lawns and traditionalists', reviewUrl: '/brands/qualcast/' },
  { slug: 'mcgregor', name: 'McGregor 34cm Corded Rotary Mower', bestFor: 'the cheapest way to mow a small lawn', reviewUrl: '/electric-lawn-mowers/' },
  { slug: 'spear-jackson', name: 'Spear & Jackson 34cm Corded Rotary Mower', bestFor: 'small lawns on a tight budget', reviewUrl: '/electric-lawn-mowers/' },
  { slug: 'ego', name: 'EGO Power+ LM2122E-SP', bestFor: 'large gardens (500-800 m²)', reviewUrl: '/reviews/ego-lm2122e-sp/' },
  { slug: 'greenworks', name: 'Greenworks G40LM41', bestFor: 'medium to large gardens on a budget', asin: 'B06WGYYLP8', reviewUrl: '/brands/greenworks/' },
];
