# How to add a "What we're watching" item

This guide is ignored by the site because its file name starts with an underscore.

Each item is one .md file in this folder, for example `arizona-acc-large-load.md`.
Start the file with a block like this (the lines of three dashes are required):

    ---
    title: "Short title of the development"
    summary: "Use the item's own wording. Keep every qualifier, scope limit and status."
    citation: "Primary source, e.g. docket or statute number"
    sourceType: G
    order: 1
    ---

- `citation` and `sourceType` are optional. `sourceType` is R, P, V, G, O or U.
- `order` sets the position in the panel: 1 is first.
- Anything written below the block is not shown on the homepage.

The panel only appears on the homepage when:

1. at least one item file exists in this folder, and
2. `showWhatWereWatching: true` is set in `src/site-settings.ts`.
