import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => { return {
  plugins: [react()],
  base: mode === 'production' ? '/Panopticom-ANS/' : '/', // Ensure this is the correct base path
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    historyApiFallback: true, // This ensures the dev server handles routing correctly
  },
}});
