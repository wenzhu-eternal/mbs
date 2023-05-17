import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: { less: { javascriptEnabled: true } },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
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
