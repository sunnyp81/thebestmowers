export const SITE = {
  name: 'The Best Mowers',
  url: 'https://thebestmowers.co.uk',
  shortName: 'TheBestMowers',
  description: 'Independent UK lawn mower buying guides and reviews. Research-led recommendations built from manufacturer specs, verified owner reviews and UK retail data.',
  locale: 'en_GB',
  twitter: '',
  publisher: 'The Best Mowers',
  editor: 'The Best Mowers editorial team',
  email: 'hello@thebestmowers.co.uk',
  logo: '/logo.svg',
  founded: '2024',
  // Real, verified entity profiles only (Trustpilot / Companies House / socials). Never fabricate.
  sameAs: [] as string[],
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
  'worx','einhell','mountfield','stiga','cobra','hyundai','mac-allister','qualcast',
  'greenworks','ego'
] as const;
