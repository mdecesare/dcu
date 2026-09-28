// Recounts "This week" in the reader's browser, so a page built earlier still shows the
// current Monday-Sunday week in Eastern time. Without JavaScript, the build-time state stays,
// and it is always one consistent state. The week rule is src/lib/weeks.ts, shared with the build.
import { easternWeek, weekLabel, weekView, within } from '../lib/weeks';

const now = new Date();
const week = easternWeek(now);

// Homepage strip: each count holds the dates of every entry in its section, and the link
// wording follows the count ("See updates" when there are any, "View section" when there are none).
document.querySelectorAll<HTMLElement>('[data-week-label]').forEach((el) => { el.textContent = weekLabel(week); });
document.querySelectorAll<HTMLElement>('[data-week-count]').forEach((el) => {
  const dates = (el.dataset.weekCount || '').split(' ').filter(Boolean);
  const count = dates.filter((d) => within(d, week)).length;
  el.textContent = String(count);
  const link = el.closest('a')?.querySelector<HTMLElement>('[data-week-link]');
  if (link) link.textContent = count > 0 ? 'See updates' : 'View section';
});

// Section pages: redraw the box for the reader's week, by the same rule the build used.
type Entry = { date: string; day: string; kind: string; kindClass: string; title: string; href: string };

document.querySelectorAll<HTMLElement>('[data-week-list]').forEach((box) => {
  const data = box.querySelector<HTMLScriptElement>('[data-week-entries]');
  const list = box.querySelector<HTMLElement>('[data-week-items]');
  const status = box.querySelector<HTMLElement>('[data-week-status]');
  if (!data || !status) return;

  const entries: Entry[] = JSON.parse(data.textContent || '[]');
  const view = weekView(entries.map((e) => e.date), now);

  status.textContent = view.mode === 'latest'
    ? `Nothing new yet this week (${weekLabel(view.current)}). Latest changes, ${weekLabel(view.week)}:`
    : `${weekLabel(view.week)} · Monday to Sunday, Eastern time`;

  // A section with no published entries has no list, only the empty message, which stays true.
  if (!list) return;
  list.replaceChildren(...entries.filter((e) => within(e.date, view.week)).map((e) => {
    const li = document.createElement('li');
    const time = document.createElement('time');
    time.dateTime = e.date;
    time.textContent = e.day;
    const kind = document.createElement('span');
    kind.className = `tw-k ${e.kindClass}`;
    kind.textContent = e.kind;
    const link = document.createElement('a');
    link.href = e.href;
    link.textContent = e.title;
    li.append(time, kind, link);
    return li;
  }));
});
