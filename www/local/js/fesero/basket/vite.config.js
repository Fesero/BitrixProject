import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
  },
  build: {
    watch: {},
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'FeseroBasket',
      fileName: (format) => `fesero-basket.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'fesero-basket.css';
          return assetInfo.name;
        },
        format: 'es',
      }
    },
    outDir: './dist',
    emptyOutDir: false,
  }
})