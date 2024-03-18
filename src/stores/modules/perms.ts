import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

const currentPerms_1 = ["system_manage", "user", "role", "permission"];

export const usePermsStore = defineStore("perms", {
  state: () => ({
    perms: [],
    currentPerms: currentPerms_1,
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
    setCurrentPerms(perms) {
      this.currentPerms = perms;
    },
    getCurrentPerms() {
      return this.currentPerms;
    },
    getPerms() {
      return this.perms;
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
});
