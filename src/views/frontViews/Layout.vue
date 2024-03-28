<template>
  <div style="height: 100dvh">
    <n-flex vertical align="center" justify="center">
      <!-- header -->
      <n-flex
        justify="space-between"
        align="center"
        style="height: 60px; width: 100%; border-bottom: solid 1px #eeeeee"
      >
        <div style="margin: 0 24px">
          <n-gradient-text>CampusEvent</n-gradient-text>
        </div>
        <div>
          <n-menu
            mode="horizontal"
            v-model:value="selectedKey"
            :options="menusOptions"
            @update:value="handleSelected"
          />
        </div>
        <div style="margin: 0 24px">
          <n-avatar round size="large">未登录</n-avatar>
        </div>
      </n-flex>
      <!-- content -->
      <n-flex
        vertical
        justify="center"
        style="flex: 0.8; width: 80%"
        align="center"
      >
        <div style="height: 90%; width: 100%">
          <router-view />
        </div>
      </n-flex>
      <!-- footer -->
      <n-flex
        justify="center"
        align="center"
        style="height: 40px; width: 100%; border-top: solid 1px #eeeeee"
      >
        © 2024 CAM
      </n-flex>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { renderIcon } from "@/utils";
import router from "@/router";
import { ref } from "vue";
import { Key } from "naive-ui/lib/menu/src/interface";
import { useRoute } from "vue-router";

const menusOptions = [
  {
    label: "首页",
    key: "front:home",
    icon: renderIcon("i-HomeOutline"),
  },
  {
    label: "发现",
    key: "front:discover",
    icon: renderIcon("i-DataVis1"),
  },
  {
    label: "个人主页",
    key: "front:person",
    icon: renderIcon("i-Aperture"),
  },
];

function handleSelected(key: string) {
  router.push({ name: key });
}

const route = useRoute();
const selectedKey = ref<Key>("front:home");

function handleSelectedMenu() {
  selectedKey.value = String(route.name);
}

handleSelectedMenu();
</script>

<style scoped></style>
