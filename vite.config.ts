import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// 参考项目https://github.com/jekip/naive-ui-admin/blob/main/vite.config.ts

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 设置host
    host: '0.0.0.0',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
