import { defineCollection, z } from 'astro:content';
import { regStatusNames } from '../lib/reg-status';

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

// Standalone text pages: Methodology, About, Privacy Policy, Terms of Use, DCU Backups.
// `updated` prints as "Last updated" on the policy pages. Set it to the date the page
// actually goes live. Pages without it, such as Methodology and About, show no date.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
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
    status: z.enum(regStatusNames),
    summary: z.string(),
    citation: z.string(),
    sourceType: z.enum(['R', 'P', 'V', 'G', 'O', 'U']).default('G'),
    order: z.number(),
  }),
});

// Short homepage items for "Power & resilience" and "What we're watching".
// One file per item. Shown only when switched on in src/site-settings.ts.
// See _how-to-add-an-item.md in each folder.
const briefItem = z.object({
  title: z.string(),
  summary: z.string(),
  citation: z.string().optional(),
  sourceType: z.enum(['R', 'P', 'V', 'G', 'O', 'U']).optional(),
  order: z.number(),
});
const power = defineCollection({ type: 'content', schema: briefItem });
const watching = defineCollection({ type: 'content', schema: briefItem });

// "What changed this week" entries: one YAML file per meaningful editorial item.
// Counted on the homepage strip and listed at the top of each section page.
// See _how-to-add-an-entry.yaml in the folder for what counts and what does not.
const changes = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.coerce.date(),
    section: z.enum(['procurement', 'regulation', 'power']),
    kind: z.enum(['new', 'update', 'correction']),
    title: z.string(),
    href: z.string().startsWith('/'),
  }),
});

// Briefs: the full page is the "brief"; its homepage picture is the "card".
// The file name is the address: next-1-5-mw.md -> /briefs/next-1-5-mw
//   status         draft until approved. Drafts are never built for the live site; they show only in
//                  a preview build (DCU_PREVIEW=1 npm run build).
//   published      the day it actually went live. Set it at publication and never change it
//                  afterwards; moving a card on or off the homepage does not change it.
//   sourcesChecked the day the sources were last checked. Shown on the brief.
//   nextReview     internal reminder to recheck sources and relevance. Never shown, never removes anything.
//   cardTitle      title on the card (60 characters at most, so it fits two lines)
//   dek            one line under the card title
//   sourceType     optional: a single source-type letter for the card, when one source carries the brief
//   image          square card image in public/images/briefs/, 800 x 800 WebP
// Which briefs are on the homepage, and in what order, is set in src/site-settings.ts (featuredBriefs).
const briefs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft', 'published']),
    cardTitle: z.string().max(60),
    section: z.enum(['Power', 'Cooling', 'Water', 'Resilience', 'Colocation', 'Procurement', 'Regulation', 'Standards']),
    published: z.coerce.date().optional(),
    sourcesChecked: z.coerce.date(),
    nextReview: z.coerce.date().optional(),
    dek: z.string(),
    description: z.string(),
    sourceType: z.enum(['R', 'P', 'V', 'G', 'O', 'U']).optional(),
    image: z.string().startsWith('/images/briefs/'),
    imageAlt: z.string(),
  }).refine((b) => b.status === 'draft' || b.published, {
    message: 'A published brief needs its `published` date.',
  }),
});

export const collections = { articles, pages, procurement, regulation, power, watching, changes, briefs };
