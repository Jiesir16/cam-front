<template>
  <n-flex
    vertical
    align="center"
    justify="center"
    style="gap: 0; height: 100%; width: 100%"
  >
    <!-- header -->
    <n-flex
      justify="space-between"
      align="center"
      style="
        height: 60px;
        width: 100%;
        background-color: #ffffff;
        border-bottom: solid 1px #eeeeee;
      "
    >
      <div style="margin: 0 24px">
        <n-gradient-text>CampusActivity</n-gradient-text>
      </div>
      <div>
        <n-menu
          mode="horizontal"
          v-model:value="selectedKey"
          :options="menusOptions"
          @update:value="handleSelected"
        />
      </div>
      <n-flex style="margin: 0 24px" align="center" justify="start">
        <n-dropdown :options="dropdownOptions" :on-select="handleDropClick">
          <n-avatar
            round
            size="large"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          >
          </n-avatar>
        </n-dropdown>
        <n-flex vertical align="center" justify="center" style="gap: 2px">
          <div>hi,{{ usersStore.loginUserInfo.username }}</div>
          <div>信息工程1班</div>
        </n-flex>
      </n-flex>
    </n-flex>
    <!-- content -->
    <n-flex
      vertical
      justify="center"
      align="center"
      style="flex-grow: 1; padding: 18px 0;width: 100%"
    >
      <router-view />
    </n-flex>
    <!-- footer -->
    <n-flex
      justify="center"
      align="center"
      wrap
      style="
        height: 40px;
        width: 100%;
        border-top: 1px solid #eee;
        background-color: #ffffff;
      "
    >
      © 2024 CAM
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { renderIcon } from "@/utils";
import router from "@/router";
import { ref } from "vue";
import { Key } from "naive-ui/lib/menu/src/interface";
import { useRoute } from "vue-router";
import { useUsersStore } from "@/stores/modules/users.ts";
import { DropdownOption } from "naive-ui";
import { usePermsStore } from "@/stores/modules/perms.ts";

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

const dropdownOptions = ref([
  {
    label: "后台管理",
    key: "dashboard",
    icon: renderIcon("i-PersonCircleOutline"),
  },
  {
    label: "退出登录",
    key: "signOut",
    icon: renderIcon("i-LogOutOutline"),
  },
]);

function handleDropClick(key: string | number, option: DropdownOption) {
  console.log("[Layout] key is ", key, "option is ", option);
  if ("signOut" === key) {
    handelSignOut();
  }
  if ("dashboard" === key) {
    router.push({ name: "home" });
  }
}

const usersStore = useUsersStore();
const permsStore = usePermsStore();

function handelSignOut() {
  usersStore.resetUserStore();
  permsStore.resetCurrentPerms();
  router.push({ name: "front:home" });
}

function handleSelected(key: string) {
  router.push({ name: key });
}

const route = useRoute();
const selectedKey = ref<Key>("front:home");

function handleSelectedMenu() {
  const routeName = String(route.name);
  selectedKey.value =
    routeName === "front:activity:detail" ? "front:discover" : routeName;
}

handleSelectedMenu();
</script>

<style scoped>
.n-gradient-text {
  font-size: 18px;
}
</style>
