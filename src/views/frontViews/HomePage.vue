<template>
  <n-flex style="height: 300px; width: 90%">
    <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      :show-dots="true"
    >
      <n-carousel-item
        :style="{ width: '60%' }"
        v-for="(item, index) in carouselsRef"
      >
        <img
          alt=""
          class="carousel-img"
          @click="handleClick(index)"
          :src="item.imgUrl"
        />
      </n-carousel-item>
    </n-carousel>
  </n-flex>

  <n-flex style="margin: 12px; width: 80%" justify="center" align="center">
    <n-tabs type="line" animated :tabs-padding="12">
      <n-tab-pane
        name="onLineEvent"
        tab="线上活动"
        display-directive="show:lazy"
      >
        <n-grid x-gap="12" y-gap="8" :cols="3">
          <n-gi v-for="(item, index) in onlineEnevtRefs">
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
      <n-tab-pane name="offLineEvent" tab="线下活动">
        <n-grid x-gap="12" y-gap="8" :cols="3">
          <n-gi v-for="(item, index) in offlineEnevtRefs">
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
  <n-flex justify="center" align="center">
    <a href="/discover">查看更多...</a>
  </n-flex>
</template>

<script setup lang="ts">
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import { ref } from "vue";

interface GridItem {
  title?: string | undefined;
  desc?: string | null | undefined;
  imgUrl?: string | undefined;
}

const onlineEnevtRefs = ref<Array<GridItem>>([
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
  {
    title: "我们为什么要读书",
    desc: "读书那么好",
    imgUrl: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
  },
  {
    title: "防震减灾",
    desc: "防震减灾安全演练",
    imgUrl: "https://i.loli.net/2019/03/17/5c8db80696ca5.png",
  },
]);
const offlineEnevtRefs = ref<Array<GridItem>>([
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

const carouselsRef = ref<Array<GridItem>>([
  {
    title: "1111",
    desc: "1111",
    imgUrl:
      "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
  },
  {
    title: "2222",
    desc: "2222",
    imgUrl:
      "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
  },
  {
    title: "3333",
    desc: "3333",
    imgUrl:
      "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
  },
  {
    title: "4444",
    desc: "4444",
    imgUrl:
      "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
  },
]);

function handleClick(index: any) {
  message.info(`${index}点击了`);
}
</script>

<style lang="scss">
/* 可以在这里添加一些额外的全局或局部样式 */
// class引用是 .xxx声明属性,id引用是#xxx
.light-green {
  height: 308px;
  background-color: rgba(0, 128, 0, 0.12);
  cursor: pointer; /* 添加手型光标，表示可点击 */
}

.green {
  height: 308px;
  background-color: rgba(0, 128, 0, 0.24);
  cursor: pointer; /* 添加手型光标，表示可点击 */
}

.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>
