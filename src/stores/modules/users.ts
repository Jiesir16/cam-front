import { defineStore } from "pinia";
import { restfulApi } from "@/axios";

export interface LoginUserInfo {
  id: number;
  token: string;
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
      console.log("user store userInfo", userInfo);
      this.loginUserInfo = userInfo;
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
  persist: {
    storage: localStorage,
    paths: ["loginUserInfo"],
  },
});
