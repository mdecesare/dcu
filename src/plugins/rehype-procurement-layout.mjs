// Lays out a Procurement Pulse edition (files in src/content/procurement only).
//
// The markdown stays plain; this adds structure around it:
//   - text before the first `---`           -> intro block
//   - each `---` ... `## Heading` section    -> equipment card if it has a table,
//                                               otherwise findings or methodology/limits
//   - tables                                 -> rows that keep class, figure and source together
//   - paragraphs starting **DCU note.**      -> interpretation callout, below the sourced rows
//   - a paragraph that is entirely *italic*  -> small aside
//   - other plain paragraphs in a card       -> coverage note

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const isEl = (node, tag) => node?.type === 'element' && (!tag || node.tagName === tag);
const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));
const meaningful = (nodes) => nodes.filter((n) => !(n.type === 'text' && !n.value.trim()));

function columnRole(label, index) {
  const v = label.trim().toLowerCase();
  if (v.startsWith('class')) return 'class';
  if (v.includes('lead time')) return 'figure';
  if (v.startsWith('source')) return 'source';
  return ['class', 'figure', 'source'][index] ?? 'extra';
}

function layoutTable(table) {
  const thead = table.children.find((n) => isEl(n, 'thead'));
  const tbody = table.children.find((n) => isEl(n, 'tbody'));
  const headerRow = thead?.children.find((n) => isEl(n, 'tr'));
  const headers = headerRow ? headerRow.children.filter((n) => isEl(n, 'th')) : [];
  const roles = headers.map((th, i) => columnRole(textOf(th), i));

  // Rows are restyled with CSS grid, so table roles are set explicitly for screen readers.
  table.properties = { ...table.properties, className: ['pulse-table'], role: 'table' };
  if (thead) thead.properties = { ...thead.properties, role: 'rowgroup' };
  if (headerRow) headerRow.properties = { ...headerRow.properties, role: 'row' };
  headers.forEach((th) => (th.properties = { ...th.properties, role: 'columnheader' }));

  if (tbody) {
    tbody.properties = { ...tbody.properties, role: 'rowgroup' };
    for (const tr of tbody.children.filter((n) => isEl(n, 'tr'))) {
      tr.properties = { ...tr.properties, role: 'row' };
      tr.children
        .filter((n) => isEl(n, 'td'))
        .forEach((td, i) => (td.properties = { ...td.properties, role: 'cell', className: [`col-${roles[i] ?? 'extra'}`] }));
    }
  }
  return el('div', { className: ['pulse-table-wrap'] }, [table]);
}

function paragraphClass(p, inCard) {
  const parts = meaningful(p.children);
  if (isEl(parts[0], 'strong') && /^DCU note/i.test(textOf(parts[0]))) return 'dcu-note';
  if (parts.length === 1 && isEl(parts[0], 'em')) return 'pulse-aside';
  if (/^Source types:/i.test(textOf(p).trim())) return 'pulse-legend';
  return inCard ? 'pulse-coverage' : null;
}

function buildGroup(nodes) {
  const elements = nodes.filter((n) => n.type === 'element');
  const heading = isEl(elements[0], 'h2') ? elements[0] : null;
  const hasTable = elements.some((n) => isEl(n, 'table'));
  const kind = !heading ? 'pulse-intro'
    : hasTable ? 'pulse-equipment'
    : /methodology|limits/i.test(textOf(heading)) ? 'pulse-limits'
    : 'pulse-findings';

  for (const p of elements.filter((n) => isEl(n, 'p'))) {
    const className = paragraphClass(p, kind === 'pulse-equipment');
    if (className) p.properties = { ...p.properties, className: [className] };
  }

  const body = nodes.filter((n) => n !== heading).map((n) => (isEl(n, 'table') ? layoutTable(n) : n));
  if (!heading) return el('div', { className: [kind] }, body);
  return el('section', { className: ['pulse-section', kind] }, [heading, el('div', { className: ['pulse-body'] }, body)]);
}

export default function rehypeProcurementLayout() {
  return (tree, file) => {
    const path = String(file?.path ?? file?.history?.[0] ?? '').replace(/\\/g, '/');
    if (!path.includes('/src/content/procurement/')) return;

    const groups = [[]];
    for (const node of tree.children) {
      if (isEl(node, 'hr')) groups.push([]);
      else groups[groups.length - 1].push(node);
    }
    tree.children = groups.filter((g) => meaningful(g).length).map(buildGroup);
  };
}
