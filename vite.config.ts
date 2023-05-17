import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import config from './config';

export default defineConfig({
  define: {
    __CONFIG__: JSON.parse(config),
  },
  plugins: [react()],
  css: {
    preprocessorOptions: { less: { javascriptEnabled: true } },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    // https: {
    //   key: './localhost+1-key.pem',
    //   cert: './localhost+1.pem',
    // },
  },
});
