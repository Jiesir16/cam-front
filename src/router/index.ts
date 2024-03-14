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
import { computed } from "vue";

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
      {
        path: "/dashboard/role",
        name: "role",
        component: RoleView,
        meta: {
          requiresPermission: "view_role", // 指定需要的权限名称
        },
      },
      {
        path: "/dashboard/permission",
        name: "permission",
        component: PermissionView,
        meta: {
          requiresPermission: "view_perm", // 指定需要的权限名称
        },
      },
      {
        path: "/dashboard/forbidden",
        name: "403-forbidden",
        component: Forbidden,
      },
    ],
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

  // 使用usersStore
  const usersStore = useUsersStore();

  // 假设在用户登录后会将用户权限存储在全局变量或 Vuex 中
  const userPermissions = ["view_home", "view_profile", "view_role"]; // 假设用户有两个权限：查看首页和查看个人资料
  console.log("[router] login user info ", usersStore.loginUserInfo.username);
  const username = computed(() => usersStore.loginUserInfo.username);
  console.log("[router] login user info ",username);
  if (to.name == "Login" && usersStore.loginUserInfo.username != null) {
    next({ name: "dashboard" });
    return true;
  }
  // 根据路由名称检查用户是否有访问该路由的权限
  if (
    to.meta &&
    to.meta.requiresPermission &&
    !userPermissions.includes(to.meta.requiresPermission)
  ) {
    // 如果用户权限不足，则跳转到 403 页面
    next("/dashboard/forbidden");
  } else {
    next(); // 用户权限足够，继续访问页面
  }
  return true;
});
router.afterEach(() => {
  loadingBar.finish();
  return true;
});
export default router;
