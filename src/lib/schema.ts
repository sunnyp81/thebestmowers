import { SITE } from './site';

const abs = (path: string) => new URL(path, SITE.url).toString();

export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#org`,
  name: SITE.publisher,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: abs(SITE.logo) },
  foundingDate: SITE.founded,
  // Entity corroboration for AI engines: only emitted once real profiles exist.
  ...(SITE.sameAs.length ? { sameAs: [...SITE.sameAs] } : {}),
});

// Marks the H1 and FAQ answers as speakable so AI/voice engines extract them cleanly.
export const speakableSchema = (url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${url}#webpage`,
  url,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.faq-answer'],
  },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#org` },
  inLanguage: 'en-GB',
});

export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.url),
  })),
});

export const articleSchema = (args: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: args.headline,
  description: args.description,
  mainEntityOfPage: abs(args.url),
  datePublished: args.datePublished,
  dateModified: args.dateModified ?? args.datePublished,
  author: { '@type': 'Organization', name: args.author ?? SITE.publisher },
  publisher: { '@id': `${SITE.url}/#org` },
  ...(args.image ? { image: abs(args.image) } : {}),
  inLanguage: 'en-GB',
});

export const faqSchema = (faqs: { q: string; a: string }[]) =>
  faqs.length === 0 ? null : ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

export const itemListSchema = (args: {
  name: string;
  url: string;
  items: { name: string; url: string; position: number }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: args.name,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: args.items.length,
  itemListElement: args.items.map((it) => ({
    '@type': 'ListItem',
    position: it.position,
    url: abs(it.url),
    name: it.name,
  })),
});

export const productReviewSchema = (args: {
  name: string;
  brand: string;
  image?: string;
  description: string;
  rating: number;
  url: string;
  reviewBody?: string;
  datePublished: string;
  dateModified?: string;
  priceLow?: number;
  priceHigh?: number;
  // Only pass when a real, sourced owner-rating count exists.
  aggRating?: number;
  aggCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: args.name,
  brand: { '@type': 'Brand', name: args.brand },
  ...(args.image ? { image: abs(args.image) } : {}),
  description: args.description,
  ...(args.priceLow && args.priceHigh ? {
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: args.priceLow,
      highPrice: args.priceHigh,
      availability: 'https://schema.org/InStock',
    },
  } : {}),
  ...(args.aggRating && args.aggCount ? {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: args.aggRating,
      reviewCount: args.aggCount,
      bestRating: 5,
    },
  } : {}),
  review: {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: args.rating, bestRating: 5 },
    author: { '@type': 'Organization', name: SITE.publisher },
    datePublished: args.datePublished,
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    ...(args.reviewBody ? { reviewBody: args.reviewBody } : {}),
  },
});

export const howToSchema = (args: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: args.name,
  description: args.description,
  step: args.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});
