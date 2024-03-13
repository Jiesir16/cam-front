import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

export const usePermsStore = defineStore("perms", {
  state: () => ({
    perms: [],
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
    getPerms() {
      return this.perms;
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
});
