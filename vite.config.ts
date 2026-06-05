import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nexusVite } from '@bimo-dk/nexus-build/vite';

export default defineConfig({
  plugins: [
    vue(),
    nexusVite({
      name: process.env['NEXUS_REMOTE_NAME'] ?? '__REMOTE_NAME__',
      exposes: { RemoteEntry: './src/entry.vue' },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        RemoteEntry: './src/entry.vue',
      },
    },
  },
});
