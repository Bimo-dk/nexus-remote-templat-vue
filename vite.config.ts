import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nexusVite } from '@bimo-dk/nexus-build/vite';

export default defineConfig({
  plugins: [
    vue(),
    nexusVite({
      name: process.env['NEXUS_REMOTE_NAME'] ?? '__REMOTE_NAME__',
      exposes: { RemoteEntry: './src/entry.ts' },
      catalog: [
        {
          expose: './RemoteEntry',
          title: `${process.env['NEXUS_REMOTE_NAME'] ?? '__REMOTE_NAME__'} entry`,
          description: 'Boilerplate demo component shipped with the Vue remote template.',
          category: 'demo',
          tags: ['demo', 'starter'],
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        RemoteEntry: './src/entry.ts',
      },
      // Federation entries are loaded dynamically from the host — Rollup
      // can't see the importer and would tree-shake the chunk to a
      // 1-byte stub without this. 'strict' tells Rollup to preserve the
      // entry signature exactly. See B-26.
      preserveEntrySignatures: 'strict',
    },
  },
});
