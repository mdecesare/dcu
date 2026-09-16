import { defineConfig } from 'astro/config';
import rehypeSourceMarkers from './src/plugins/rehype-source-markers.mjs';
import rehypeProcurementLayout from './src/plugins/rehype-procurement-layout.mjs';
import rehypeRegulationLayout from './src/plugins/rehype-regulation-layout.mjs';
import rehypeUnconfirmedEmails from './src/plugins/rehype-unconfirmed-emails.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://datacenterupdate.com',
  markdown: {
    rehypePlugins: [rehypeSourceMarkers, rehypeProcurementLayout, rehypeRegulationLayout, rehypeUnconfirmedEmails],
  },
});
