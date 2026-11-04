import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { renderPage } from './build/render.js';

const root = fileURLToPath(new URL('.', import.meta.url));

const pages = {
  home: 'index.html',
  story: 'story.html',
  gallery: 'gallery.html',
  menu: 'menu.html',
};

// Fills the shared header, footer, bottom bar and each page body from src/content.js
// so there is one source of truth and the pages still work without JavaScript.
function chaiHtml() {
  return {
    name: 'chai-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = (ctx.path || '/').split('?')[0].replace(/^\//, '');
        const page = !file || file === 'index.html' ? 'home' : file.replace(/\.html$/, '');
        return renderPage(html, page);
      },
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [chaiHtml()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, resolve(root, v)])),
    },
  },
  server: { host: true },
  preview: { host: true },
});
