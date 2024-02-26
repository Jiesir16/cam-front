// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue';
import Layout from '@/views/layout/Layout.vue';
import Login from '@/views/login/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/dashboard/home'
      },
      {
        path: '/dashboard/home',
        name: 'home',
        component: Home,
      },
    ]
  },

  // 更多路由...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default router
