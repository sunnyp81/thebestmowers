// Amazon Associates UK: single source of truth for the tracking tag.
export const AMAZON_TAG = 'thebestmowers-21';

// Required rel set on every outbound affiliate link (ASA/FTC + SEO).
export const AFFILIATE_REL = 'nofollow sponsored noopener noreferrer';

// Build a tagged Amazon UK product link from an ASIN.
export const amazonLink = (asin: string) =>
  `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TAG}`;

// Build a tagged Amazon UK search link (used when no single ASIN is canonical).
export const amazonSearch = (query: string) =>
  `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
