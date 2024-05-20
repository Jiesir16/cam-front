import { defineStore } from "pinia";
import { restfulApi } from "@/axios";
import { Role } from "@/views/system/role/roleApi.ts";

export interface LoginUserInfo {
  id?: number;
  avatarUrl?: string;
  username: string;
  name?: string;
  account: string;
  sex: string;
  phone: string;
  grade: string;
  department: string;
  profession: string;
  userClass: string;
  userType: string;
  roleName?: string;
  roles?: Array<Role>;
  email?: string;
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loginUserInfo: <LoginUserInfo>{},
    token: null,
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
    resetUserStore() {
      this.$reset();
    },
    setToken(token) {
      this.token = token;
    },
    removeLoginUserInfo() {
      console.log("removeLoginUserInfo 用户信息");
      localStorage.removeItem("__persisted__users");
    },
    // 添加其他如 createUser、updateUser、deleteUser 等方法
  },
  persist: {
    storage: sessionStorage,
    paths: ["loginUserInfo", "token"],
  },
});
