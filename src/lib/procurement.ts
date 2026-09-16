import { getCollection } from 'astro:content';

/** All Procurement Pulse editions, newest first (by `published` date). */
export async function getEditions() {
  const editions = await getCollection('procurement');
  if (!editions.length) throw new Error('No Procurement Pulse editions found in src/content/procurement');
  return editions.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}
