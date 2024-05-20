<template>
  <n-flex vertical style="height: 100vh; width: 100vw; gap: 0">
    <n-layout has-sider>
      <!-- 侧边栏 -->
      <n-layout-sider
        bordered
        inverted
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="center-align">
          <n-gradient-text :size="24" type="success">CAM</n-gradient-text>
        </div>

        <n-menu
          inverted
          v-model:value="selectedKey"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menusOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout>
        <!-- 顶部导航栏 -->
        <n-layout-header bordered>
          <n-flex
            justify="space-between"
            align="center"
            style="padding: 5px 24px"
          >
            <n-flex>
              <n-breadcrumb separator="/" class="breadcrumb-container">
                <n-breadcrumb-item
                  v-for="(item, index) in breadcrumbRefs"
                  :key="index"
                >
                  {{ item.label }}
                </n-breadcrumb-item>
              </n-breadcrumb>
            </n-flex>
            <n-flex align="center">
              <NButton
                text
                @click="linkToFrontHome"
                size="large"
                style="margin: 6px"
              >
                <template #icon>
                  <n-icon>
                    <HomeOutline />
                  </n-icon>
                </template>
                前台主页
              </NButton>
              <NButton
                text
                @click="linkToGithub"
                size="large"
                style="margin: 6px"
                v-show="false"
              >
                <template #icon>
                  <n-icon>
                    <LogoGithub />
                  </n-icon>
                </template>
                Github
              </NButton>
              <n-dropdown
                :options="dropdownOptions"
                :on-select="handleDropClick"
              >
                <n-avatar
                  size="large"
                  object-fit="contain"
                  round
                  :src="usersStore.loginUserInfo.avatarUrl"
                />
              </n-dropdown>
              <n-switch
                v-show="false"
                v-model:value="active"
                size="medium"
                @update:value="changeTheme"
              >
                <template #checked-icon>
                  <n-icon :component="Moon" />
                </template>
                <template #unchecked-icon>
                  <n-icon :component="SunnyOutline" />
                </template>
              </n-switch>
              <n-flex vertical align="center" justify="center" style="gap: 2px">
                <n-gradient-text type="info" style="font-size: 14px">
                  {{
                    useUsersStore().loginUserInfo.name
                      ? useUsersStore().loginUserInfo.name
                      : useUsersStore().loginUserInfo.username
                  }}
                </n-gradient-text>
                <n-text style="font-size: 12px">
                  [{{
                    useUsersStore().loginUserInfo.profession +
                    useUsersStore().loginUserInfo.userClass
                  }}班]
                </n-text>
              </n-flex>
              <!--<n-button text @click="changeTheme">切换主题</n-button>-->
            </n-flex>
          </n-flex>
        </n-layout-header>

        <!-- 内容区域：侧边栏和主内容 -->
        <n-flex
          item
          style="min-height: 92dvh; background-color: #eeeeee; padding: 12px"
        >
          <!-- 主内容区 -->
          <n-layout style="padding: 12px">
            <n-layout-content>
              <router-view />
            </n-layout-content>
          </n-layout>
        </n-flex>
      </n-layout>
    </n-layout>
  </n-flex>

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="退出登录"
    content="你确认退出登录吗?"
    positive-text="是"
    negative-text="否"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<script setup lang="ts">
import {
  DropdownOption,
  NAvatar,
  NButton,
  NFlex,
  NIcon,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { HomeOutline, LogoGithub, Moon, SunnyOutline } from "@vicons/ionicons5";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useDesignSettingStore } from "@/stores/modules/designSetting";
import { Key } from "naive-ui/lib/menu/src/interface";
import { useUsersStore } from "@/stores/modules/users";
import { usePermsStore } from "@/stores/modules/perms.ts";
import { renderIcon } from "@/utils";

const route = useRoute();

const usersStore = useUsersStore();
const permsStore = usePermsStore();
const designStore = useDesignSettingStore();

const menusOptions = computed(() => usePermsStore().menus);

const showModal = ref(false);

function onPositiveClick() {
  handelSignOut();
}

function onNegativeClick() {}

const dropdownOptions = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon("i-PersonCircleOutline"),
  },
  {
    label: "退出登录",
    key: "signOut",
    icon: renderIcon("i-LogOutOutline"),
  },
];
const linkToFrontHome = () => {
  router.push({ name: "front:home" });
};

const linkToGithub = () => {
  window.open("https://github.com/Jiesir16/cam-front", "_blank");
};

const selectedKey = ref<Key>("dashboard");

function handleRouteMenu() {
  selectedKey.value = String(route.name);
}

handleRouteMenu();
// 获取菜单
permsStore.fetchAllMenus();

function handleDropClick(key: string | number, option: DropdownOption) {
  console.log("[Layout] key is ", key, "option is ", option);
  if ("signOut" === key) {
    showModal.value = true;
  }
  if ("profile" === key) {
    window.location.href = "/dashboard/profile";
    //    router.push({ name: "system:profile" });
  }
}

function handelSignOut() {
  usersStore.resetUserStore();
  permsStore.resetCurrentPerms();
  router.push({ name: "login" });
}

const collapsed = ref(false);

//function handleUpdateValue(key: string, item: MenuOption) {
function handleUpdateValue(key: string) {
  router.push({ name: key });
}

const active = ref(designStore.darkTheme);

function changeTheme() {
  designStore.reserveTheme();
}

interface BreadcrumbItem {
  label?: any;
  path?: string | null;
}

const breadcrumbRefs = ref<Array<BreadcrumbItem>>([]);
// 监听路由变化
watchEffect(() => {
  updateBreadcrumbs();
});

function updateBreadcrumbs() {
  console.log("[Layout] 更新面包屑");
  const items: Array<BreadcrumbItem> = [];
  route.matched.forEach((route) => {
    const item: BreadcrumbItem = { label: route.meta.desc };
    items.push(item);
  });
  breadcrumbRefs.value = items;
}
</script>

<style lang="scss">
/* 可以在这里添加一些额外的全局或局部样式 */
// class引用是 .xxx声明属性,id引用是#xxx
.center-align {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; // 确保文本也居中，特别是对多行文本很有用
  height: 50px;

  p {
    // 如果您需要对 h2 元素进行一些特定的样式设置
    // 比如更改颜色、字体大小等
    color: salmon;
    font-size: 1.2rem;
  }
}
</style>
