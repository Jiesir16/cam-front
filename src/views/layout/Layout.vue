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
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout>
        <!-- 顶部导航栏 -->
        <n-layout-header>
          <n-flex
            justify="space-between"
            align="center"
            style="padding: 5px 24px"
          >
            <n-flex>
              <n-breadcrumb>
                <n-breadcrumb-item>主页</n-breadcrumb-item>
                <n-breadcrumb-item>系统管理</n-breadcrumb-item>
                <n-breadcrumb-item>用户管理</n-breadcrumb-item>
              </n-breadcrumb>
            </n-flex>
            <n-flex style="font-size: large">
              <NButton text size="large">操作1</NButton>
              <NButton text @click="linkToGithub" size="large">
                <template #icon>
                  <n-icon>
                    <LogoGithub />
                  </n-icon>
                </template>
              </NButton>
              <n-button text size="large">
                <template #icon>
                  <n-icon>
                    <PersonCircleOutline />
                  </n-icon>
                </template>
                个人设置
              </n-button>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-avatar
                    size="large"
                    round
                    src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                  ></n-avatar>
                </template>
                <span>hi</span>
              </n-tooltip>
              <n-button text @click="changeTheme">切换主题</n-button>
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
import type { MenuOption } from "naive-ui";
import {
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
import {
  DocumentTextOutline,
  HomeOutline,
  LayersOutline,
  LogoGithub,
  PeopleOutline,
  PersonCircleOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { Component, h, ref } from "vue";
import { useRouter } from "vue-router";
import { useDesignSettingStore } from "@/stores/modules/designSetting";

const designStore = useDesignSettingStore();
const router = useRouter();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const linkToGithub = () => {
  window.open("https://github.com/Jiesir16/cam-front", "_blank");
};

const collapsed = ref(false);
// 使用图标的菜单项定义
const menuOptions: MenuOption[] = [
  {
    label: "主页",
    key: "dashboard",
    icon: renderIcon(HomeOutline), // 使用图标
  },
  {
    label: "系统管理",
    key: "system_manage",
    icon: renderIcon(SettingsOutline), // 使用图标
    children: [
      {
        label: "用户管理",
        key: "user",
        icon: renderIcon(PeopleOutline),
      },
      {
        label: "角色管理",
        key: "role",
        icon: renderIcon(PeopleOutline),
      },
      {
        label: "权限管理",
        key: "permission",
        icon: renderIcon(PeopleOutline),
        show: true,
      },
    ],
  },
  {
    label: "项目",
    key: "projects",
    icon: renderIcon(LayersOutline), // 使用图标
    disabled: true,
  },
  {
    label: "报告",
    key: "reports",
    icon: renderIcon(DocumentTextOutline), // 使用图标
    disabled: true,
  },
  // 更多菜单项...
];

//function handleUpdateValue(key: string, item: MenuOption) {
function handleUpdateValue(key: string) {
  router.push({ name: key });
}

function changeTheme() {
  designStore.reserveTheme();
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
