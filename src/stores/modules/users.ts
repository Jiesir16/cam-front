import { defineStore } from "pinia";
import { restfulApi } from "@/axios/http";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers(params) {
      console.log(params);
      try {
        const response = await restfulApi.get("/user/list", params);
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
});
