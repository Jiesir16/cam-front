import { defineStore } from "pinia";
import { restfulApi } from "@/axios";
import router from "@/router";
import { useUsersStore } from "@/stores/modules/users.ts";

//const currentPerms_1 = ["system_manage", "user", "role", "permission"];

function convertToMenuItems(data: any[]) {
  return data.map((item) => ({
    label: item.permName,
    key: item.permCode,
    show: true, // 默认为 true，可以根据需要进行修改
    children: item.children ? convertToMenuItems(item.children) : null,
  }));
}

export const usePermsStore = defineStore("perms", {
  state: () => ({
    perms: [],
    currentPerms: [],
    menus: [],
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
      restfulApi
        .get("/perm/listAll")
        .then((res) => {
          this.menus = convertToMenuItems(res.data);
        })
        .then(() => {
          usePermsStore().getCurrentPerms();
        });
    },
    async getCurrentPerms() {
      await restfulApi
        .get("/perm/getCurrentPerms")
        .then((res) => {
          this.currentPerms = res.data;
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
