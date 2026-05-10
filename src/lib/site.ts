export const SITE = {
  name: 'The Best Mowers',
  url: 'https://thebestmowers.co.uk',
  shortName: 'TheBestMowers',
  description: 'Independent UK lawn mower reviews, buying guides and maintenance advice. Tested in real gardens by real gardeners.',
  locale: 'en_GB',
  twitter: '',
  publisher: 'The Best Mowers UK',
  logo: '/logo.svg',
  founded: '2015',
} as const;

export const POWER_TYPE_HUBS = [
  { slug: 'cordless-lawn-mowers', label: 'Cordless', icon: 'battery' },
  { slug: 'electric-lawn-mowers', label: 'Electric', icon: 'plug' },
  { slug: 'petrol-lawn-mowers', label: 'Petrol', icon: 'fuel' },
  { slug: 'robot-lawn-mowers', label: 'Robot', icon: 'robot' },
  { slug: 'ride-on-lawn-mowers', label: 'Ride-On', icon: 'tractor' },
  { slug: 'hover-lawn-mowers', label: 'Hover', icon: 'wind' },
] as const;

export const BRAND_HUBS = [
  'ryobi','bosch','gtech','husqvarna','flymo','stihl','makita','dewalt',
  'worx','einhell','mountfield','stiga','cobra','hyundai','mac-allister','qualcast'
] as const;
