<template>
  <n-card
    vertical
    style="
      max-width: 80%;
      background-color: #ffffff;
      height: 100%;
      padding: 20px;
      min-height: 85dvh;
      min-width: 100dvh;
    "
  >
    <n-flex vertical>
      <n-text>活动类型:</n-text>
      <n-radio-group
        v-model:value="activityTypeRef"
        name="radiobuttongroup1"
        size="medium"
        @update-value="handleRadioClick"
      >
        <n-radio-button value=""> 全部</n-radio-button>
        <n-radio-button value="online"> 线上活动</n-radio-button>
        <n-radio-button value="offline"> 线下活动</n-radio-button>
      </n-radio-group>
      <n-text>活动状态:</n-text>
      <n-radio-group
        v-model:value="activityStatusRef"
        name="radiobuttongroup2"
        @update-value="handleRadioClick2"
        size="medium"
      >
        <n-radio-button value=""> 全部</n-radio-button>
        <n-radio-button value="unstart"> 未开始</n-radio-button>
        <n-radio-button value="starting"> 进行中</n-radio-button>
        <n-radio-button value="ended"> 已结束</n-radio-button>
      </n-radio-group>

      <n-divider />
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
    </n-flex>
    <template #footer>
      <n-flex justify="center">
        <n-pagination
          :page="page"
          :page-count="pages"
          @update:page="handleUpdatePage"
          simple
        />
      </n-flex>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { restfulApi } from "@/axios";

const activityTypeRef = ref<"" | "online" | "offline">("");
const activityStatusRef = ref<"" | "unstart" | "starting" | "ended">("");
const activitiesRef = ref();
const page = ref(1);
const pages = ref(1);

function fetchActivities(pageNo, activityType: String, activityStatus: String) {
  restfulApi
    .get("/activity/page", {
      current: pageNo,
      size: 6,
      activityType: activityType,
      activityStatus: activityStatus,
      auditStatus: 1,
    })
    .then((res) => {
      page.value = res.data.current;
      pages.value = res.data.pages;
      activitiesRef.value = res.data.records.map((item) => ({
        id: item.id,
        title: item.activityName,
        desc: item.activityBrief,
        imgUrl: item.activityImg,
      }));
    });
}

fetchActivities(1, "", "");

function handleClick(id: any) {
  router.push({ path: `/activity/detail/${id}` });
}

function handleRadioClick(type) {
  fetchActivities(1, type, activityStatusRef.value);
}

function handleUpdatePage(pageNo) {
  fetchActivities(pageNo, activityTypeRef.value, activityStatusRef.value);
}

function handleRadioClick2(status) {
  fetchActivities(1, activityTypeRef.value, status);
}
</script>
<style scoped>
.n-text {
  font-size: 14px;
}
</style>
