import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers(params) {
      try {
        this.users = (await restfulApi.get("/user/list", params)).data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
});
