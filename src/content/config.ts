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

export const collections = { articles, pages, procurement };
