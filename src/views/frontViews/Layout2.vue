<template>
  <n-layout style="height: 100vh; width: 100vw">
    <n-layout-header>
      <n-menu
        mode="horizontal"
        v-model:value="selectedKey"
        :options="menusOptions"
        @update:value="handleSelected"
      />
    </n-layout-header>
    <n-layout-content style="flex: 1"> 这是内容</n-layout-content>
    <n-layout-footer>© 2024 CAM</n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { message } from "@/plugins/naive-ui-discrete-api.ts";

const menusOptions = [
  {
    label: "首页",
    key: "123",
  },
  {
    label: "发现",
    key: "1234",
  },
  {
    label: "发现",
    key: "1234",
  },
];

function handleSelected(key: string) {
  message.info(key);
}
</script>

<style scoped></style>
