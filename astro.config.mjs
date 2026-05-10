// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thebestmowers.co.uk',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      changefreq: 'weekly',
    }),
  ],
});
