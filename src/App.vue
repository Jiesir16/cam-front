<template>
  <n-config-provider
    v-model:theme="getDarkTheme"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { darkTheme, GlobalThemeOverrides } from "naive-ui";
import { useDesignSettingStore } from "./stores/modules/designSetting";

const designStore = useDesignSettingStore();

const themeOverrides: GlobalThemeOverrides = {
  common: {
//    primaryColor: "#FF0000",
//    primaryColorHover: "#FF0000",
  },
  Button: {
//    textColor: "#FF0000",
  },
};

const getDarkTheme = computed(() =>
  designStore.getDarkTheme ? darkTheme : undefined,
);
</script>
<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #f4f4f4;
  /* 防止页面出现水平滚动条 */
}
</style>
