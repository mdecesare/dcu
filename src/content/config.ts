import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topic: z.string(),
    type: z.string(),
    readtime: z.number(),
    featured: z.boolean().default(false),
    summary: z.string(),
  }),
});

// Standalone text pages: Methodology, About
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

// Procurement Pulse editions. The file name is the permanent address:
// q3-2026.md -> /procurement/q3-2026. The newest `published` date is shown at /procurement.
const procurement = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    edition: z.string(),
    published: z.coerce.date(),
    standfirst: z.string(),
    description: z.string(),
  }),
});

// Regulatory Watch items. The file name is the address:
// virginia-tier4.md -> /regulation/virginia-tier4
//   headline  short title used on lists (full `title` is used on the item's own page)
//   summary   one-paragraph summary used on lists
//   citation  primary source shown on lists, next to its source-type marker
//   order     position on the list: 1 is first
const regulation = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    jurisdiction: z.string(),
    jurisdictionType: z.enum(['state', 'federal']),
    status: z.string(),
    summary: z.string(),
    citation: z.string(),
    sourceType: z.enum(['R', 'P', 'V', 'G']).default('G'),
    order: z.number(),
  }),
});

export const collections = { articles, pages, procurement, regulation };
