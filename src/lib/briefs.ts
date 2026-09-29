import { getCollection } from 'astro:content';

/** All briefs, newest first. Warns at build time about any brief past its review date. */
export async function getBriefs() {
  const briefs = (await getCollection('briefs')).sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  const today = new Date();
  for (const b of briefs) {
    if (b.data.reviewBy < today) {
      console.warn(`[briefs] "${b.slug}" passed its review date (${b.data.reviewBy.toISOString().slice(0, 10)}): update it, mark it a dated record, or take it off the homepage.`);
    }
  }
  return briefs;
}

/** The homepage row: briefs with a `feature` number, in that order. Never padded with filler. */
export async function getFeaturedBriefs() {
  return (await getBriefs()).filter((b) => b.data.feature).sort((a, b) => a.data.feature! - b.data.feature!);
}
