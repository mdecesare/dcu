// Lays out a Regulatory Watch item (files in src/content/regulation only).
//   - paragraph starting **Status:**   -> key facts line
//   - "## Primary source" section      -> source box

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const isEl = (node, tag) => node?.type === 'element' && (!tag || node.tagName === tag);
const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));

export default function rehypeRegulationLayout() {
  return (tree, file) => {
    const path = String(file?.path ?? file?.history?.[0] ?? '').replace(/\\/g, '/');
    if (!path.includes('/src/content/regulation/')) return;

    const out = [];
    let sourceBox = null;
    for (const node of tree.children) {
      if (isEl(node, 'h2')) {
        sourceBox = null;
        if (/^primary source/i.test(textOf(node).trim())) {
          sourceBox = el('section', { className: ['reg-source'] }, [node]);
          out.push(sourceBox);
          continue;
        }
      }
      if (sourceBox) {
        sourceBox.children.push(node);
        continue;
      }
      if (isEl(node, 'p')) {
        const first = node.children.find((n) => !(n.type === 'text' && !n.value.trim()));
        if (isEl(first, 'strong') && /^Status:/i.test(textOf(first))) {
          node.properties = { ...node.properties, className: ['reg-facts'] };
        }
      }
      out.push(node);
    }
    tree.children = out;
  };
}
