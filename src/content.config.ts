import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoBase = z.object({
  title: z.string().max(70),
  description: z.string().min(70).max(170),
  slug: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default('The Best Mowers UK Editorial'),
  noindex: z.boolean().default(false),
});

const hubs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/hubs' }),
  schema: seoBase.extend({
    type: z.enum(['power-type', 'editorial', 'advice-root']),
    h1: z.string(),
    intro: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    relatedHubs: z.array(z.string()).default([]),
    relatedSubHubs: z.array(z.string()).default([]),
    featuredReviews: z.array(z.string()).default([]),
  }),
});

const subHubs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sub-hubs' }),
  schema: seoBase.extend({
    parentHub: z.string(),
    h1: z.string(),
    intro: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    featuredReviews: z.array(z.string()).default([]),
  }),
});

const brands = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/brands' }),
  schema: seoBase.extend({
    brandName: z.string(),
    h1: z.string(),
    intro: z.string(),
    foundedYear: z.number().optional(),
    countryOfOrigin: z.string().optional(),
    batteryPlatforms: z.array(z.string()).default([]),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: seoBase.extend({
    h1: z.string(),
    brand: z.string(),
    model: z.string(),
    powerType: z.enum(['cordless', 'electric', 'petrol', 'robot', 'ride-on', 'hover', 'manual']),
    rating: z.number().min(0).max(5),
    pros: z.array(z.string()).min(2),
    cons: z.array(z.string()).min(2),
    bestFor: z.string(),
    specs: z.object({
      deckWidth: z.string().optional(),
      voltage: z.string().optional(),
      runtime: z.string().optional(),
      weight: z.string().optional(),
      cutHeights: z.string().optional(),
      grassBox: z.string().optional(),
      mulching: z.boolean().default(false),
      selfPropelled: z.boolean().default(false),
      rearRoller: z.boolean().default(false),
    }),
    rrp: z.string().optional(),
    affiliateUrl: z.string().optional(),
    image: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const advice = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/advice' }),
  schema: seoBase.extend({
    h1: z.string(),
    category: z.enum(['maintenance', 'troubleshooting', 'lawn-care', 'safety-legal', 'garden-size']),
    primaryKeyword: z.string(),
    isHowTo: z.boolean().default(false),
    howToSteps: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { hubs, subHubs, brands, reviews, advice };
