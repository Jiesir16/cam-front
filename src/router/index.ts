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
    component: () => import("@/views/frontViews/Layout.vue"),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "front:home",
        component: () => import("@/views/frontViews/HomePage.vue"),
        meta: {
          desc: "主页",
        },
      },
      {
        path: "/discover",
        name: "front:discover",
        component: () => import("@/views/frontViews/Discover.vue"),
        meta: {
          desc: "发现",
        },
      },
      {
        path: "/activity/detail",
        name: "front:activity:detail",
        component: () => import("@/views/frontViews/ActivityDetail.vue"),
        meta: {
          desc: "活动详情",
        },
      },
      {
        path: "/person",
        name: "front:person",
        component: () => import("@/views/frontViews/Person.vue"),
        meta: {
          desc: "个人主页",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Layout,
    meta: {
      desc: "仪表盘",
    },
    children: [
      {
        path: "",
        redirect: "/dashboard/home",
      },
      {
        path: "/dashboard/home",
        name: "home",
        component: Home,
        meta: {
          desc: "主页",
        },
      },
      {
        path: "/dashboard/system",
        name: "system",
        meta: {
          desc: "系统管理",
        },
        children: [
          {
            path: "/dashboard/profile",
            name: "system:profile",
            component: () => import("@/views/system/PersonProfile.vue"),
            meta: {
              desc: "个人资料",
            },
          },
          {
            path: "/dashboard/user",
            name: "system:user",
            component: UserView,
            meta: {
              desc: "用户管理",
            },
          },
          {
            path: "/dashboard/role",
            name: "system:role",
            component: RoleView,
            meta: {
              desc: "角色管理",
              requiresPermission: "ROLE_MNG", // 指定需要的权限名称
            },
          },
          {
            path: "/dashboard/permission",
            name: "system:perm",
            component: PermissionView,
            meta: {
              desc: "权限管理",
              requiresPermission: "PERM_MNG", // 指定需要的权限名称
            },
          },
        ],
      },
      {
        path: "/dashboard/activity",
        name: "activity",
        meta: {
          desc: "活动管理",
        },
        children: [
          {
            path: "/dashboard/activity/info",
            name: "activity:info",
            component: () => import("@/views/activity/ActivityManagement.vue"),
            meta: {
              desc: "活动信息",
            },
          },
          {
            path: "/dashboard/activity/apply",
            name: "activity:apply",
            component: () => import("@/views/activity/ActivityApply.vue"),
            meta: {
              desc: "活动申请",
            },
          },
        ],
      },
      {
        path: "/dashboard/forbidden",
        name: "403",
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
