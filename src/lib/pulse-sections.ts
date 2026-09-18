// Reads a Procurement Pulse edition's markdown into sections, rows and DCU notes,
// so the homepage can show them without retyping anything.
//
//   ## Heading              -> a section
//   | Class | Lead time | Source |   rows with **R**/**P**/**V**/**G** source letters
//   **DCU note.** ...        -> note, kept word for word (runs until the next blank line)

import { smartQuotes } from './typography';

export type SourceLetter = 'R' | 'P' | 'V' | 'G';

export interface PulseRow {
  cls: string;
  figure: string;
  sourceType: SourceLetter;
  source: string;
}

export interface PulseSection {
  title: string;
  rows: PulseRow[];
  notesHtml: string[];
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Bold, italic and links only — enough for DCU notes. */
function inlineMarkdown(s: string) {
  return escapeHtml(smartQuotes(s))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export function parsePulseSections(markdown: string): PulseSection[] {
  const sections: PulseSection[] = [];
  let current: PulseSection | null = null;
  let note: string[] | null = null;
  let cols = { cls: 0, figure: 1, source: 2 };

  const flushNote = () => {
    if (current && note) current.notesHtml.push(inlineMarkdown(note.join(' ')));
    note = null;
  };

  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim();

    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      flushNote();
      current = { title: heading[1].trim(), rows: [], notesHtml: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;

    if (note) {
      if (line === '') flushNote();
      else note.push(line);
      continue;
    }

    if (/^\*\*DCU note\.?\*\*/i.test(line)) {
      note = [line];
      continue;
    }

    if (line.startsWith('|')) {
      const cells = line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
      const lower = cells.map((c) => c.toLowerCase());
      if (lower.includes('class') && lower.includes('source')) {
        cols = { cls: lower.indexOf('class'), figure: lower.findIndex((c) => c.includes('lead time')), source: lower.indexOf('source') };
        continue;
      }
      const source = cells[cols.source]?.match(/^\*\*([RPVG])\*\*\s+(.+)$/);
      if (!source) {
        throw new Error(`Procurement Pulse row "${cells[cols.cls]}" under "## ${current.title}" has no **R**, **P**, **V** or **G** source letter.`);
      }
      current.rows.push({ cls: cells[cols.cls], figure: cells[cols.figure], sourceType: source[1] as SourceLetter, source: source[2] });
    }
  }
  flushNote();
  return sections;
}

export interface PulseDisclosure {
  source: string;
  html: string;
}

/**
 * Source disclosures: a paragraph starting "**About the <Source> figures.**", kept word for word.
 * The homepage repeats it whenever it shows rows from that source.
 */
export function parsePulseDisclosures(markdown: string): PulseDisclosure[] {
  const out: PulseDisclosure[] = [];
  for (const para of markdown.split(/\r?\n\s*\r?\n/)) {
    const text = para.split(/\r?\n/).map((l) => l.trim()).join(' ').trim();
    const m = text.match(/^\*\*About the (.+?) figures\.\*\*/);
    if (m) out.push({ source: m[1], html: inlineMarkdown(text) });
  }
  return out;
}
