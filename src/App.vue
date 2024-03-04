<template>

  <n-config-provider v-model:theme="getDarkTheme">
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { darkTheme } from "naive-ui";
import { useDesignSettingStore } from "./stores/modules/designSetting";

const designStore = useDesignSettingStore();

const getDarkTheme = computed(() =>
  designStore.getDarkTheme ? darkTheme : undefined,
);
</script>
<style>
html,
body,
#app {
  height: 100vh;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  /* 防止页面出现水平滚动条 */
}
</style>
