// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Layout from "@/views/layout/Layout.vue";
import Login from "@/views/login/Login.vue";
import UserView from "@/views/system/user/UserManagement.vue";
import RoleView from "@/views/system/role/RoleManagement.vue";
import PermissionView from "@/views/system/permission/PermissionManagement.vue";
import Forbidden from "@/views/403.vue";
import { loadingBar } from "@/plugins/naive-ui-discrete-api";
import { useUsersStore } from "@/stores/modules/users.ts";

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
        name: "home",
        component: Home,
      },
      {
        path: "/dashboard/user",
        name: "system:user:mng",
        component: UserView,
      },
      {
        path: "/dashboard/role",
        name: "system:role:mng",
        component: RoleView,
        meta: {
          requiresPermission: "ROLE_MNG", // 指定需要的权限名称
        },
      },
      {
        path: "/dashboard/permission",
        name: "system:perm:mng",
        component: PermissionView,
        meta: {
          requiresPermission: "PERM_MNG", // 指定需要的权限名称
        },
      },
    ],
  },
  {
    path: "/dashboard/forbidden",
    name: "403",
    component: Forbidden,
  },

  // 更多路由...
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // ...
  // 返回 false 以取消导航
  loadingBar.start();

  const usersStore = useUsersStore();

  const isAuthorization = Boolean(usersStore.loginUserInfo.token);
  // 未登录
  if (to.path !== "/login" && to.path !== "/" && !isAuthorization) {
    console.log("[router] 用户未登录,跳转登录页");
    next("/login");
    return;
  }
  // 登录了，去login页面禁止去login页面
  if (to.path === "/login" && isAuthorization) {
    console.log("[router] 用户登录了,禁止跳转登录页");
    next({
      path: from.path !== "/login" ? from.path : "/dashboard/home",
    });
    return;
  }
  next();
});
router.afterEach(() => {
  loadingBar.finish();
  return true;
});

export default router;
