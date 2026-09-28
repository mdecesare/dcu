// "What changed this week": editorial entries in src/content/changes, one YAML file each.
// See src/content/changes/_how-to-add-an-entry.yaml for what counts.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'procurement' | 'regulation' | 'power';
export type Change = CollectionEntry<'changes'>;

export const SECTION_LABELS: Record<Section, string> = {
  procurement: 'Procurement',
  regulation: 'Regulation',
  power: 'Power',
};

const iso = (d: Date) => d.toISOString().slice(0, 10);

// Week rules live in ./weeks, which the reader's browser also loads (src/scripts/this-week.ts).
export { easternWeek, weekLabel, weekView, within, type Week, type WeekView } from './weeks';
import { within, type Week } from './weeks';

export const changeDate = (c: Change) => iso(c.data.date);
export const inWeek = (c: Change, week: Week) => within(changeDate(c), week);

// The homepage counts and the section lists both come from this one function, so they are
// always the same items. The build stops if two entries describe the same item, so a count
// can never include a duplicate.
export async function getChanges(section?: Section) {
  const all = await getCollection('changes');
  const seen = new Map<string, string>();
  for (const c of all) {
    for (const key of [`${c.data.section}|${c.data.title.trim().toLowerCase()}`, `${c.data.section}|${changeDate(c)}|${c.data.href}`]) {
      const other = seen.get(key);
      if (other) {
        throw new Error(
          `src/content/changes: ${c.id} and ${other} look like the same item (same section and title, ` +
          `or same section, date and link). Each published item should have exactly one entry.`
        );
      }
      seen.set(key, c.id);
    }
  }
  return all
    .filter((c) => !section || c.data.section === section)
    // Newest first; items published the same day keep their file-name order (number the files to set it).
    .sort((a, b) => changeDate(b).localeCompare(changeDate(a)) || a.id.localeCompare(b.id));
}
