// src/store/auth.ts
import { defineStore } from 'pinia';
import axios from 'axios'; // 假设使用axios发送请求

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const { data } = await axios.post('/api/login', { username, password });
        this.user = data.user;
        // 登录成功后的逻辑，如跳转到首页
        console.log("success");
        
      } catch (error) {
        // 错误处理
        console.log("error");
      }
    },
  },
});
