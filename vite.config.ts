import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// 参考项目https://github.com/jekip/naive-ui-admin/blob/main/vite.config.ts

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 设置host
    host: '0.0.0.0',
//    host: 'localhost',
    proxy: {
      // 代理配置
      '/api': {
        target: 'http://localhost:8888', // 后端服务地址
        changeOrigin: true, // 需要虚拟主机站点
        rewrite: (path) => path // 重写 API 请求
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
