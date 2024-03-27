<template>
  <div style="height: 100vh">
    <n-flex vertical style="height: 100%">
      <n-flex
        justify="center"
        style="height: 10%; border-bottom: solid 1px #eeeeee"
        align="center"
      >
          <n-menu
            mode="horizontal"
            v-model:value="selectedKey"
            :options="menusOptions"
            @update:value="handleSelected"
          />
      </n-flex>
      <n-flex style="height: 82%">
        <n-button>123</n-button>
        <n-button>456</n-button>
      </n-flex>
      <n-flex
        justify="center"
        align="center"
        style="height: 6%; border-top: solid 1px #eeeeee"
      >
        <n-text>© 2024 CAM</n-text>
      </n-flex>
    </n-flex>
  </div>
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
