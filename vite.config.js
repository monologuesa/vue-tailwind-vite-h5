import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';
import compressPlugin from 'vite-plugin-compression'

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  plugins:[
    vue(),
    compressPlugin({
      ext: '.gz',//gz br
      algorithm: 'gzip', //brotliCompress gzip
      deleteOriginFile: false
    })
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    }
  },
  optimizeDeps: {
    // include: ['axios'],
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser' // 混淆器
  },
  server: {
    cors: true,
    port: "4000",
    open: false,
    proxy: {
      '/dev-api': {
        target: 'http://192.168.0.7:8889',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      }
    }
  },
});
