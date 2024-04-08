import { defineStore } from "pinia";
import { restfulApi } from "@/axios";
import router from "@/router";
import { useUsersStore } from "@/stores/modules/users.ts";
import { renderIcon } from "@/utils";

function convertToMenuItems(data: any[], perms: any[]) {
  return data.map((item) => ({
    label: item.permName,
    key: item.permCode,
    show: perms.includes(item.permCode), // 默认为 true，可以根据需要进行修改
    children: item.children ? convertToMenuItems(item.children, perms) : null,
    icon: renderIcon(item.iconName),
  }));
}

export const usePermsStore = defineStore("perms", {
  state: () => ({
    perms: [],
    currentPerms: [],
    menus: [],
    routers: [],
  }),
  actions: {
    async fetchAllPerms() {
      try {
        this.perms = (await restfulApi.get("/perm/listAll")).data;
      } catch (error) {
        console.error("Failed to fetch perms:", error);
      }
      return this.perms;
    },
    fetchAllMenus() {
      usePermsStore().getCurrentPerms();
    },
    async getCurrentPerms() {
      await restfulApi
        .get("/perm/getCurrentPerms")
        .then((res) => {
          this.currentPerms = res.data;
          restfulApi.get("/perm/listAll").then((res) => {
            this.menus = convertToMenuItems(res.data, this.currentPerms);
          });
        })
        .catch(() => {
          console.log("[perm store] 获取权限失败，跳转登录页面");
          useUsersStore().$reset();
          this.$reset();
          router.push({ name: "Login" });
        });
    },
    setCurrentPerms(perms) {
      this.currentPerms = perms;
    },
    getPerms() {
      return this.perms;
    },
    resetCurrentPerms() {
      this.$reset();
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
  persist: {
    storage: sessionStorage,
    paths: ["currentPerms", "menus"],
  },
});
