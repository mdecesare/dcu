import { getCollection } from 'astro:content';
import { siteSettings } from '../site-settings';

/** A preview build (DCU_PREVIEW=1 npm run build) shows drafts. The live build never does. */
export const PREVIEW = process.env.DCU_PREVIEW === '1';

/** Reading time from the brief's own text, at about 220 words a minute. */
export function readMinutes(body: string) {
  const words = body.replace(/<[^>]+>/g, ' ').replace(/[#*_>|\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Briefs this build may show: published ones, plus drafts in a preview build. Newest first. */
export async function getBriefs() {
  const briefs = await getCollection('briefs', (b) => b.data.status === 'published' || PREVIEW);
  // Same-day briefs keep the homepage order, so /briefs and the homepage row agree at launch.
  const position = (slug: string) => {
    const i = siteSettings.featuredBriefs.indexOf(slug);
    return i === -1 ? siteSettings.featuredBriefs.length : i;
  };
  const day = (b: (typeof briefs)[number]) => (b.data.published ?? b.data.sourcesChecked).valueOf();
  return briefs.sort((a, b) => day(b) - day(a) || position(a.slug) - position(b.slug));
}

/**
 * The homepage row, in the order set in site-settings. Before launch the live site shows it
 * only when all four positions hold published briefs; after launch it shows whichever are
 * published. A preview shows whatever is ready.
 */
export async function getFeaturedBriefs() {
  const bySlug = new Map((await getBriefs()).map((b) => [b.slug, b]));
  const ready = siteSettings.featuredBriefs.map((slug) => bySlug.get(slug)).filter((b) => b !== undefined);
  if (!PREVIEW && !siteSettings.featuredBriefsLaunched && ready.length < 4) return [];
  return ready;
}
