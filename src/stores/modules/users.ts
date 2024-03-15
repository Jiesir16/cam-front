import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

export interface LoginUserInfo {
  id: number;
  username: string;
  email: string;
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loginUserInfo: <LoginUserInfo>{},
  }),
  actions: {
    async fetchUsers(params) {
      try {
        this.users = (await restfulApi.get("/user/list", params)).data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    setLoginUserInfo(userInfo: LoginUserInfo) {
      this.loginUserInfo = userInfo;
      console.log("user store userInfo", this.loginUserInfo);
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
  persist: {
    storage: localStorage,
    paths: ["loginUserInfo"]
  }
});
