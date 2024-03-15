import { defineStore } from "pinia";
import { store } from "..";

export const useDesignSettingStore = defineStore({
  id: "app-design-setting",
  state: () => ({
    darkTheme: false,
  }),
  persist: true,
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme;
    },
  },
  actions: {
    reserveTheme() {
      this.darkTheme = !this.darkTheme;
    },
  },
});

// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store);
}
