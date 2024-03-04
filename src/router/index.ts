// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Layout from "@/views/layout/Layout.vue";
import Login from "@/views/login/Login.vue";
import UserView from "@/views/system/user/UserManagement.vue";
import { loadingBar } from "@/plugins/naive-ui-discrete-api";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "/dashboard/home",
      },
      {
        path: "/dashboard/home",
        name: "dashboard",
        component: Home,
      },
      {
        path: "/dashboard/user",
        name: "user",
        component: UserView,
      },
    ],
  },

  // 更多路由...
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  // ...
  // 返回 false 以取消导航
  loadingBar.start();
  return true;
});
router.afterEach(() => {
  loadingBar.finish();
  return true;
})
export default router;
