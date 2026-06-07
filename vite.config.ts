import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nexusVite } from '@bimo-dk/nexus-build/vite';

const remoteName = process.env['NEXUS_REMOTE_NAME'] ?? '__REMOTE_NAME__';

export default defineConfig({
  plugins: [
    vue(),
    nexusVite({
      name: remoteName,
      exposes: {
        RemoteEntry:  './src/entry.ts',
        ProductCard:  './src/entry-product-card.ts',
        CartWidget:   './src/entry-cart-widget.ts',
        ReviewStars:  './src/entry-review-stars.ts',
      },
      catalog: [
        {
          expose: './RemoteEntry',
          title: `${remoteName} entry`,
          description: 'Boilerplate demo component shipped with the Vue remote template.',
          category: 'demo',
          tags: ['demo', 'starter'],
        },
        {
          expose: './ProductCard',
          title: `${remoteName} ProductCard`,
          description: 'A Vue product card with a like toggle and price.',
          category: 'commerce',
          tags: ['vue', 'product', 'card'],
        },
        {
          expose: './CartWidget',
          title: `${remoteName} CartWidget`,
          description: 'A Vue cart widget that tracks added items.',
          category: 'commerce',
          tags: ['vue', 'cart', 'widget'],
        },
        {
          expose: './ReviewStars',
          title: `${remoteName} ReviewStars`,
          description: 'A Vue 5-star rating component.',
          category: 'feedback',
          tags: ['vue', 'rating', 'reviews'],
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index:        './index.html',
        RemoteEntry:  './src/entry.ts',
        ProductCard:  './src/entry-product-card.ts',
        CartWidget:   './src/entry-cart-widget.ts',
        ReviewStars:  './src/entry-review-stars.ts',
      },
      // Federation entries are loaded dynamically from the host — Rollup
      // can't see the importer and would tree-shake the chunk to a
      // 1-byte stub without this. 'strict' tells Rollup to preserve the
      // entry signature exactly. See B-26.
      preserveEntrySignatures: 'strict',
    },
  },
});
