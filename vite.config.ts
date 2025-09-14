import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: [
      '@headlessui/react',
      '@heroicons/react',
      'react',
      'react-dom',
      '@tanstack/react-query',
    ],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    'process.env': {},
  },
});
