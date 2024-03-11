import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [],
  }),
  actions: {
    async fetchAllRoles() {
      try {
        this.roles = (await restfulApi.get("/role/listAll")).data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      return this.roles;
    },
    getRoles() {
      return this.roles;
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
});
