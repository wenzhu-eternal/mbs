import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: { less: { javascriptEnabled: true } },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // server: {
  //   https: {
  //     key: './localhost+1-key.pem',
  //     cert: './localhost+1.pem'
  //   }
  // }
});
