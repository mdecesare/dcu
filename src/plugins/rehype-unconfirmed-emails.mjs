// Keeps email addresses as plain text until their inbox is confirmed.
//
// Markdown turns an address like corrections@datacenterupdate.com into a clickable
// mailto: link automatically. This undoes that for any address not listed in
// confirmedEmailAddresses in src/site-settings.ts. The address text stays as written.

import { siteSettings } from '../site-settings.ts';

const confirmed = new Set(siteSettings.confirmedEmailAddresses.map((a) => a.toLowerCase()));

function walk(node) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    const href = child.type === 'element' && child.tagName === 'a' ? String(child.properties?.href ?? '') : '';
    if (href.toLowerCase().startsWith('mailto:')) {
      const address = href.slice('mailto:'.length).split('?')[0].toLowerCase();
      if (!confirmed.has(address)) {
        walk(child);
        return child.children;
      }
    }
    walk(child);
    return [child];
  });
}

export default function rehypeUnconfirmedEmails() {
  return (tree) => walk(tree);
}
