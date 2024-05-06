import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://sprachplattform.acdh-ch-dev.oeaw.ac.at',
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    host: true,
    strictPort: true,
    origin: 'http://0.0.0.0:8080',
  },
});
