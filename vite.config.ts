import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

// 路径
const pathSrc = path.resolve(__dirname, 'src');
const pathPackage = path.resolve(__dirname, 'lib');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5174,
    host:'0.0.0.0',
    hmr: true,
  },
  resolve: {
    //设置别名
    alias: {
      'cun-ui': pathPackage,
      '@': pathSrc
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    AutoImport({
      imports: ['vue'],
      dts: path.resolve(pathPackage, 'auto-imports.d.ts')
    }),
    checker({
      typescript: true
    })
  ],
})
