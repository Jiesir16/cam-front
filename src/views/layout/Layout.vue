<template>
  <n-flex vertical style="height: 100vh">
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
          <h2>CAM</h2>
        </div>

        <n-menu
          :value="activeMenu"
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
            style="padding: 10px 24px"
          >
            <n-flex>仪表盘</n-flex>
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
                  <n-avatar size="large" round src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"></n-avatar>
                </template>
                <span>hi</span>
              </n-tooltip>
            </n-flex>
          </n-flex>
        </n-layout-header>
        <!-- 内容区域：侧边栏和主内容 -->
        <n-flex item style="flex: 1">
          <!-- 主内容区 -->
          <n-layout>
            <n-layout-content style="padding: 10px 24px">
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
  useMessage,
} from "naive-ui";
import {
  DocumentTextOutline,
  HomeOutline,
  LayersOutline,
  LogoGithub,
  PersonCircleOutline,
} from "@vicons/ionicons5";
import { Component, h, ref ,computed} from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const message = useMessage();

const route = useRoute();
// 使用计算属性来动态设置当前激活的菜单项
const activeMenu = computed(() => route.name);

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
    label: "用户管理",
    key: "user",
    icon: renderIcon(DocumentTextOutline), // 使用图标
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

function handleUpdateValue(key: string, item: MenuOption) {
  message.info("[onUpdate:value]: " + JSON.stringify(key));
  message.info("[onUpdate:value]: " + JSON.stringify(item));
  router.push({ name: key });
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

  h2 {
    // 如果您需要对 h2 元素进行一些特定的样式设置
    // 比如更改颜色、字体大小等
    color: #18a058;
    font-size: 1rem;
  }
}
</style>
