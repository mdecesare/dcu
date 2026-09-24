// Turns source-type letters written in markdown into coloured markers.
//
//   **P** Terrapin · Q3 2026   ->  (P) Terrapin · Q3 2026   — circle links to its methodology definition
//   **R — Research**           ->  definition block with id "source-type-r" (used on the Methodology page)
//
// Legacy articles in src/content/articles are skipped so their rendering never changes.

import { SOURCE_TYPES, sourceTypeHref } from '../lib/source-types.mjs';

const text = (value) => ({ type: 'text', value });
const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });

function marker(letter, { link = true, announce = true } = {}) {
  const { name } = SOURCE_TYPES[letter];
  const className = ['cls', `c-${letter.toLowerCase()}`];
  const children = [el('span', { ariaHidden: 'true' }, [text(letter)])];
  if (announce) children.push(el('span', { className: ['sr-only'] }, [text(`${name} source. `)]));
  return link
    ? el('a', { className, href: sourceTypeHref(letter), title: `${name} source — what this means` }, children)
    : el('span', { className }, children);
}

function onlyText(node) {
  if (node.children?.length !== 1 || node.children[0].type !== 'text') return null;
  return node.children[0].value.trim();
}

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'strong') {
      const value = onlyText(child);

      if (value && SOURCE_TYPES[value] && value.length === 1) return marker(value);

      const def = value?.match(/^([RPVGO]) — (.+)$/);
      if (def && node.tagName === 'p') {
        const [, letter, name] = def;
        node.properties = { ...node.properties, id: `source-type-${letter.toLowerCase()}`, className: ['source-def'] };
        return el('span', { className: ['source-def-name'] }, [marker(letter, { link: false, announce: false }), text(name)]);
      }
    }
    walk(child);
    return child;
  });
}

export default function rehypeSourceMarkers() {
  return (tree, file) => {
    const path = String(file?.path ?? file?.history?.[0] ?? '').replace(/\\/g, '/');
    if (path.includes('/src/content/articles/')) return;
    walk(tree);
  };
}
