import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: { less: { javascriptEnabled: true } }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  // server: {
  //   https: {
  //     key: './localhost+1-key.pem',
  //     cert: './localhost+1.pem'
  //   }
  // }
})
