<template>
  <n-flex vertical style="height: 100vh; width: 100vw; gap: 0">
    <n-layout has-sider>
      <!-- 侧边栏 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="center-align">
          <n-gradient-text :size="24" type="success">CAM</n-gradient-text>
        </div>

        <n-menu
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
            <n-flex style="font-size: large" align="center">
              <NButton
                text
                @click="linkToGithub"
                size="large"
                style="margin: 6px"
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
                  round
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                />
              </n-dropdown>
              <n-switch
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
              <!--<n-button text @click="changeTheme">切换主题</n-button>-->
            </n-flex>
          </n-flex>
        </n-layout-header>

        <!-- 内容区域：侧边栏和主内容 -->
        <n-flex item style="flex: 1">
          <!-- 主内容区 -->
          <n-layout>
            <n-layout-content>
              <router-view />
            </n-layout-content>
          </n-layout>
        </n-flex>
      </n-layout>
    </n-layout>
    <!-- 底部Footer -->
    <n-layout-footer style="text-align: center; padding: 8px">
      © 2024 Your Company Name
    </n-layout-footer>
  </n-flex>
</template>

<script setup lang="ts">
import {
  DropdownOption,
  NAvatar,
  NButton,
  NFlex,
  NIcon,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { LogoGithub, Moon, SunnyOutline } from "@vicons/ionicons5";
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
const dropdownOptions = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon("i-PersonCircleOutline"),
  },
  {
    label: "编辑用户资料",
    key: "editProfile",
    icon: renderIcon("i-Pencil"),
  },
  {
    label: "退出登录",
    key: "signOut",
    icon: renderIcon("i-LogOutOutline"),
  },
];
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
    handelSignOut();
  }
}

function handelSignOut() {
  usersStore.resetUserStore();
  permsStore.resetCurrentPerms();
  router.push({ name: "Login" });
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
    color: #18a058;
    font-size: 1.2rem;
  }
}
</style>
