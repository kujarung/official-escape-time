import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'official-escape-time',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        404: '404.html',
      },
    },
  },
});
