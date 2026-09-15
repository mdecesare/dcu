import { getCollection } from 'astro:content';

/** All Regulatory Watch items, in list order (`order` field, 1 first). */
export async function getRegulationItems() {
  const items = await getCollection('regulation');
  return items.sort((a, b) => a.data.order - b.data.order);
}
