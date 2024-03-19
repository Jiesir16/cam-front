import { defineStore } from "pinia";
import { restfulApi } from "@/axios";
import router from "@/router";

//const currentPerms_1 = ["system_manage", "user", "role", "permission"];

export const usePermsStore = defineStore("perms", {
  state: () => ({
    perms: [],
    currentPerms: [],
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
    async getCurrentPerms() {
      await restfulApi
        .get("/perm/getCurrentPerms")
        .then((res) => {
          this.currentPerms = res.data;
        })
        .catch(() => {
          console.log("[perm store] 获取权限失败，跳转登录页面");
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
    paths: ["currentPerms"],
  },
});
