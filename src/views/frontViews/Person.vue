<template>
  <n-flex vertical align="center" justify="start">
    <n-card style="max-width: 90%; background-color: #ffffff">
      <n-flex vertical>
        <n-flex vertical align="center">
          <img
            alt="11"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            style="border-radius: 50%"
          />
          <n-text>Jiesir</n-text>
          <n-text>信息工程学院</n-text>
          <n-text>2015信息工程03班</n-text>
        </n-flex>

        <n-flex style="min-height: 61dvh">
          <n-tabs type="line" animated :tabs-padding="12">
            <n-tab-pane
              name="collectedActivity"
              :tab="renderTab('i-HomeOutline', '收藏的活动')"
              display-directive="show:lazy"
            >
              <n-grid x-gap="12" y-gap="8" :cols="3">
                <n-gi v-for="(item, index) in collectedActivitiesRef">
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
            </n-tab-pane>
            <n-tab-pane
              name="participatedEvent"
              :tab="renderTab('i-HomeOutline', '参与过的活动')"
              display-directive="show:lazy"
            >
              <n-grid x-gap="12" y-gap="8" :cols="3">
                <n-gi v-for="(item, index) in participatedActivitiesRef">
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
            </n-tab-pane>
            <n-tab-pane
              name="publishedActivity"
              :tab="renderTab('i-HomeOutline', '发布过的活动')"
              display-directive="show:lazy"
            >
              <n-grid x-gap="12" y-gap="8" :cols="3">
                <n-gi v-for="(item, index) in publishedActivitiesRef">
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
            </n-tab-pane>
          </n-tabs>
        </n-flex>
      </n-flex>
    </n-card>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import { renderTab } from "@/utils";

interface GridItem {
  title?: string | undefined;
  desc?: string | null | undefined;
  imgUrl?: string | undefined;
}

const collectedActivitiesRef = ref<Array<GridItem>>([
  {
    title: "我们为什么要读书",
    desc: "读书长知识",
    imgUrl: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
  },
  {
    title: "防震减灾",
    desc: "防震减灾安全演练",
    imgUrl: "https://i.loli.net/2019/03/17/5c8db80696ca5.png",
  },
]);
const participatedActivitiesRef = ref<Array<GridItem>>([
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
const publishedActivitiesRef = ref<Array<GridItem>>([
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
}
</script>
