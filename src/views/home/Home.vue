<template>
  <n-flex>
    <n-grid x-gap="12" :span="24">
      <n-gi :span="8">
        <n-card class="card-style">
          <n-flex justify="start">
            <n-avatar
              round
              style="height: 60px; width: 60px"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              size="large"
            ></n-avatar>
            <n-flex vertical justify="space-between" style="margin-left: 12px">
              <n-text>Hello, {{ useUsersStore().loginUserInfo.name }}</n-text>
              <n-text>当前角色: 超级管理员</n-text>
            </n-flex>
          </n-flex>
          <p class="mt-28 text-14 opacity-60">
            一个人几乎可以在任何他怀有无限热忱的事情上成功。
          </p>
          <p class="mt-12 text-right text-12 opacity-40">—— 查尔斯·史考伯</p>
        </n-card>
      </n-gi>
      <n-gi :span="16">
        <n-card class="card-style">
          <n-row>
            <n-col :span="12">
              <n-statistic label="统计数据" :value="99">
                <template #prefix>
                  <n-icon> </n-icon>
                </template>
                <template #suffix> / 100 </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="活跃用户"> 1,234,123 </n-statistic>
            </n-col>
          </n-row>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid :span="24" :x-gap="12">
          <n-gi :span="12">
            <n-card title="活动统计">

            </n-card>
          </n-gi>
          <n-gi :span="12">

          </n-gi>
          </n-grid>
  </n-flex>
</template>

<script setup lang="ts">
// 在这里导入其他组件或者使用 Composition API
import { useUsersStore } from "@/stores/modules/users.ts";
</script>

<style lang="scss" scoped>
.card-style {
  min-height: 200px;
}
</style>
