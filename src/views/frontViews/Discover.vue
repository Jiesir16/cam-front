<template>
  <n-flex
    vertical
    style="
      max-width: 80%;
      background-color: #ffffff;
      height: 100%;
      padding: 20px;
    "
  >
    <n-text>活动类型:</n-text>
    <n-radio-group
      v-model:value="eventTypeRef"
      name="radiobuttongroup1"
      size="medium"
    >
      <n-radio-button value="all"> 全部</n-radio-button>
      <n-radio-button value="onlineEnvent"> 线上活动</n-radio-button>
      <n-radio-button value="offlineEnvent"> 线下活动</n-radio-button>
    </n-radio-group>
    <n-text>活动状态:</n-text>
    <n-radio-group
      v-model:value="eventStatusRef"
      name="radiobuttongroup2"
      size="medium"
    >
      <n-radio-button value="all"> 全部</n-radio-button>
      <n-radio-button value="unstart"> 未开始</n-radio-button>
      <n-radio-button value="starting"> 进行中</n-radio-button>
      <n-radio-button value="end"> 已结束</n-radio-button>
    </n-radio-group>
    <n-divider />
    <n-grid x-gap="12" y-gap="8" :cols="3">
      <n-gi v-for="(item, index) in eventsRef">
        <n-card
          style="cursor: pointer"
          :title="item.title"
          @click="handleClick(index)"
        >
          <template #cover>
            <div style="height: 200px">
              <img :src="item.imgUrl" :alt="item.title" />
            </div>
          </template>
          {{ item.desc }}
          {{ index }}
        </n-card>
      </n-gi>
    </n-grid>
    <n-flex justify="center">
      <n-pagination v-model:page="page" :page-count="100" simple />
    </n-flex>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import router from "@/router";

const eventTypeRef = ref<"all" | "onlineEnvent" | "offlineEnvent">("all");
const eventStatusRef = ref<"all" | "onlineEnvent" | "offlineEnvent">("all");
const eventsRef = ref([
  {
    title: "我们为什么要读书1",
    desc: "我哪知道读书长知识",
    imgUrl: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
  },
  {
    title: "防震减灾1",
    desc: "防震减灾安全演练",
    imgUrl: "https://i.loli.net/2019/03/17/5c8db80696ca5.png",
  },
  {
    title: "我们为什么要读书1",
    desc: "读书长知识",
    imgUrl: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
  },
  {
    title: "防震减灾1",
    desc: "防震减灾安全演练",
    imgUrl: "https://i.loli.net/2019/03/17/5c8db80696ca5.png",
  },
  {
    title: "我们为什么要读书1",
    desc: "读书那么好",
    imgUrl: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
  },
  {
    title: "防震减灾1",
    desc: "防震减灾安全演练",
    imgUrl: "https://i.loli.net/2019/03/17/5c8db80696ca5.png",
  },
]);

function handleClick(index: any) {
  message.info(`${index}点击了`);
  router.push({ path: `/event/detail` });
}
</script>
<style scoped>
.n-text {
  font-size: 14px;
}
</style>
