<template>
  <n-flex>
    <n-grid x-gap="12" :span="24">
      <n-gi :span="8">
        <n-card class="card-style">
          <n-flex justify="start">
            <n-avatar
              round
              style="height: 60px; width: 60px"
              :src="useUsersStore().loginUserInfo.avatarUrl"
              size="large"
            ></n-avatar>
            <n-flex vertical justify="space-between" style="margin-left: 12px">
              <n-text>Hello, {{ useUsersStore().loginUserInfo.name }}</n-text>
              <!--<n-text>当前角色: 超级管理员</n-text>-->
            </n-flex>
          </n-flex>
          <n-flex vertical>
            <p class="mt-28 text-14 opacity-60">
              一个人几乎可以在任何他怀有无限热忱的事情上成功。
            </p>
            <p class="mt-12 text-right text-12 opacity-40">—— 查尔斯·史考伯</p>
          </n-flex>
        </n-card>
      </n-gi>
      <n-gi :span="16">
        <n-card class="card-style">
          <n-row>
            <n-col :span="12">
              <n-statistic label="活动数量" :value="activityCount">
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="活跃用户" :value="userCount"></n-statistic>
            </n-col>
          </n-row>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid :span="24" :x-gap="12" :y-gap="12">
      <n-gi :span="12">
        <n-card title="活动分类统计">
          <v-chart class="chart" :option="option" />
        </n-card>
      </n-gi>
      <n-gi :span="12">
        <n-card title="报名人数统计">
          <v-chart class="chart" :option="enrollOption" />
        </n-card>
      </n-gi>
      <n-gi :span="24">
        <n-card title="场地预订统计">
          <v-chart class="chart" :option="venueBookingOption" />
        </n-card>
      </n-gi>
    </n-grid>
  </n-flex>
</template>

<script setup lang="ts">
// 在这里导入其他组件或者使用 Composition API
import { useUsersStore } from "@/stores/modules/users.ts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide, ref } from "vue";
import { restfulApi } from "@/axios";

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  GridComponent,
]);

provide(THEME_KEY, "light");

const activityCount = ref<number>();
const userCount = ref<number>();

const a1 = ref<number>(0);
const a2 = ref<number>(0);
const a3 = ref<number>(0);
const a4 = ref<number>(0);
const a5 = ref<number>(0);
const a6 = ref<number>(0);

const option = ref({
  title: {
    text: "活动分类统计占比",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: [
      "文化艺术类",
      "体育健身类",
      "志愿服务类",
      "休闲娱乐类",
      "学术类",
      "其他",
    ],
  },
  series: [
    {
      name: "活动类型",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: a1, name: "文化艺术类" },
        { value: a2, name: "体育健身类" },
        { value: a3, name: "志愿服务类" },
        { value: a4, name: "休闲娱乐类" },
        { value: a5, name: "学术类" },
        { value: a6, name: "其他" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const enrollOption = ref({
  title: {
    text: "活动报名人数占比",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: [
      "文化艺术类",
      "体育健身类",
      "志愿服务类",
      "休闲娱乐类",
      "学术类",
      "其他",
    ],
  },
  series: [
    {
      name: "报名人数",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 35, name: "文化艺术类" },
        { value: 310, name: "体育健身类" },
        { value: 234, name: "志愿服务类" },
        { value: 135, name: "休闲娱乐类" },
        { value: 148, name: "学术类" },
        { value: 1148, name: "其他" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const venueBookingOption = ref({
  tooltip: {
    trigger: "item",
    formatter: "{b0}: {c0} 次",
  },
  xAxis: {
    type: "category",
    data: ["篮球场", "图书馆", "足球场", "会议室"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
});

function fetchInitData() {
  restfulApi.get("/activity/count").then((res) => {
    activityCount.value = res.data.activityCount;
    userCount.value = res.data.userCount;
    a1.value = res.data.activityCount1;
    a2.value = res.data.activityCount2;
    a3.value = res.data.activityCount3;
    a4.value = res.data.activityCount4;
    a5.value = res.data.activityCount5;
    a6.value = res.data.activityCount6;
  });
}

fetchInitData();
</script>

<style lang="scss" scoped>
.card-style {
  min-height: 200px;
}

.chart {
  height: 400px;
}
</style>
