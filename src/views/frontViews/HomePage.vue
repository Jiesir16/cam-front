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
          :alt="String(index)"
          class="carousel-img"
          @click="handleClick(item.id)"
          :src="item.imgUrl"
        />
      </n-carousel-item>
    </n-carousel>
  </n-flex>

  <n-flex
    vertical
    style="margin: 12px; width: 80%; min-height: 450px"
    justify="start"
    align="center"
  >
    <n-tabs
      type="line"
      animated
      :tabs-padding="12"
      default-value="online"
      @update:value="handleUpdateValue"
    >
      <n-tab-pane name="online" tab="线上活动" display-directive="show:lazy">
        <n-grid x-gap="12" y-gap="8" :cols="3">
          <n-gi v-for="(item, index) in activitiesRef">
            <n-card
              style="cursor: pointer"
              :title="item.title"
              @click="handleClick(item.id)"
            >
              <template #cover>
                <div style="height: 200px">
                  <img :src="item.imgUrl" :alt="String(index)" />
                </div>
              </template>
              {{ item.desc }}
            </n-card>
          </n-gi>
        </n-grid>
      </n-tab-pane>
      <n-tab-pane name="offline" tab="线下活动">
        <n-grid x-gap="12" y-gap="8" :cols="3">
          <n-gi v-for="(item, index) in activitiesRef">
            <n-card
              style="cursor: pointer"
              :title="item.title"
              @click="handleClick(item.id)"
            >
              <template #cover>
                <div style="height: 200px">
                  <img :src="item.imgUrl" :alt="String(index)" />
                </div>
              </template>
              {{ item.desc }}
            </n-card>
          </n-gi>
        </n-grid>
      </n-tab-pane>
    </n-tabs>
    <n-flex justify="center" align="center">
      <a href="/discover">查看更多...</a>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import { ref } from "vue";
import router from "@/router";
import { restfulApi } from "@/axios";

interface GridItem {
  id: number | null;
  title?: string | undefined;
  desc?: string | null | undefined;
  imgUrl?: string | undefined;
}

const activitiesRef = ref<Array<GridItem>>();

const carouselsRef = ref<Array<GridItem>>();

function handleClick(id: any) {
  message.info(`${id}点击了`);
  router.push({ path: `/activity/detail/${id}` });
}

async function fetchCarousels() {
  await restfulApi.get("/activity/carousels").then((res) => {
    carouselsRef.value = res.data.map((item) => ({
      id: item.id,
      title: item.activityName,
      desc: item.activityBrief,
      imgUrl: item.activityImg,
    }));
  });
  await restfulApi
    .get("/activity/page", {
      current: 1,
      size: 6,
      activityType: "online",
      auditStatus: 1,
    })
    .then((res) => {
      activitiesRef.value = res.data.records.map((item) => ({
        id: item.id,
        title: item.activityName,
        desc: item.activityBrief,
        imgUrl: item.activityImg,
      }));
    });
}

function handleUpdateValue(tableName: String) {
  restfulApi
    .get("/activity/page", {
      current: 1,
      size: 6,
      activityType: tableName,
      auditStatus: 1,
    })
    .then((res) => {
      activitiesRef.value = res.data.records.map((item) => ({
        id: item.id,
        title: item.activityName,
        desc: item.activityBrief,
        imgUrl: item.activityImg,
      }));
    });
}

fetchCarousels();
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
