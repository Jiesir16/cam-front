<template>
  <n-message-provider>
    <n-config-provider :theme="getDarkTheme">
      <router-view />
    </n-config-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { darkTheme } from "naive-ui";
import { useDesignSettingStore } from "./store/modules/designSetting";

const designStore = useDesignSettingStore();

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
  /* 防止页面出现水平滚动条 */
}
</style>
