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

const TZ = 'America/New_York';
const iso = (d: Date) => d.toISOString().slice(0, 10);

// Monday-Sunday week, in Eastern time, containing `now`. Returned as YYYY-MM-DD strings.
// The same rule runs in the browser (src/scripts/this-week.ts), so a page built earlier in
// the week still counts the week the reader is in.
export function easternWeek(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const day = new Date(`${today}T00:00:00Z`);
  const start = new Date(day);
  start.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start: iso(start), end: iso(end) };
}

export const weekLabel = ({ start, end }: { start: string; end: string }) => {
  const f = (s: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${s}T12:00:00Z`).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${f(start, { day: 'numeric' })}–${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`
    : `${f(start, { day: 'numeric', month: 'long' })} – ${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
};

export const changeDate = (c: Change) => iso(c.data.date);
export const inWeek = (c: Change, week: { start: string; end: string }) =>
  changeDate(c) >= week.start && changeDate(c) <= week.end;

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
