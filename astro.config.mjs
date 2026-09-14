import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import rehypeSourceMarkers from './src/plugins/rehype-source-markers.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://datacenterupdate.com',
  markdown: {
    rehypePlugins: [rehypeSourceMarkers],
  },
});
