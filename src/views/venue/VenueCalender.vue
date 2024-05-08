<template>
  <n-flex vertical justify="space-between" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success"
        >场地: {{ venueName }} 预订
      </n-gradient-text>
    </n-flex>
    <n-grid :cols="28" :x-gap="12" :y-gap="12">
      <n-input-number v-model:value="venueIdRef" v-show="false" />
      <n-gi class="grid-style" :span="7" v-for="item in calenderDataRef">
        <n-card class="grid-style" :title="item.dateStr">
          <n-flex vertical>
            <n-button @click="handleClick(item.dateStr, item.hours)"
            >预约
            </n-button>
            <span v-for="x in item.reserveList">
              <n-badge dot :color="x.color" style="margin-right: 5px"
                >{{ x.status ? `占用` : `空闲` }}
              </n-badge>
              <n-text>{{ x.startTime }} ~ {{ x.endTime }}</n-text>
            </span>
          </n-flex>
        </n-card>
      </n-gi>
    </n-grid>
  </n-flex>
  <n-modal :show="show">
    <n-card
      title="请选择预约时间"
      style="width: 500px"
      closable
      @close="handleClose"
    >
      <n-form ref="editForm">
        <n-grid :cols="24" :x-gap="12">
          <n-form-item-gi :span="12" label="开始时间">
            <n-input v-model:value="timeSelectBox.reserveDate" v-show="false" />
            <n-time-picker
              v-model:formatted-value="timeSelectBox.startTime"
              :hours="hoursRef"
              :minutes="[0, 30]"
              :seconds="[0]"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="结束时间">
            <n-time-picker
              v-model:formatted-value="timeSelectBox.endTime"
              :hours="hoursRef"
              :minutes="[0, 30]"
              :seconds="[0]"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #action>
        <n-flex justify="end">
          <n-button @click="handleCancel">取消</n-button>
          <n-button @click="handleSubmit" type="primary">提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import { restfulApi } from "@/axios";
import router from "@/router";

const message = useMessage();
const show = ref(false);

const timeSelectBox = ref({
  reserveDate: null,
  startTime: null,
  endTime: null,
});
const venueIdRef = ref();
const venueName = ref("图书馆");
const hoursRef = ref<Array<number>>();
const calenderDataRef = ref([
  {
    reserveList: [
      {
        startTime: "08:00:00",
        endTime: "10:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "10:00:00",
        endTime: "12:00:00",
        color: "#b22222",
        status: true,
      },
    ],
    dateStr: "2024-05-04",
    hours: [8, 18],
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-05",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-06",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-07",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-08",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-09",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-10",
  },
  {
    reserveList: [
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#b22222",
        status: true,
      },
      {
        startTime: "14:00:00",
        endTime: "18:00:00",
        color: "#32cd32",
        status: false,
      },
    ],
    options: [
      { label: "14:00:00", value: "14:00:00" },
      { label: "15:00:00", value: "15:00:00" },
      { label: "16:00:00", value: "16:00:00" },
      { label: "17:00:00", value: "17:00:00" },
      { label: "18:00:00", value: "18:00:00" },
    ],
    dateStr: "2024-05-11",
  },
]);

function handleClick(dateStr: String, hours: Array<number>) {
  console.log("dateStr", dateStr);
  hoursRef.value = hours;
  timeSelectBox.value = {
    startTime: null,
    endTime: null,
    reserveDate: dateStr,
  };
  show.value = true;
}

function handleCancel() {
  timeSelectBox.value = { startTime: null, endTime: null, reserveDate: null };
  show.value = false;
}

function handleSubmit() {
  restfulApi
    .post("/venue/reserve", {
      ...timeSelectBox.value,
      venueId: venueIdRef.value,
    })
    .then(() => {
      message.success("预约成功");
      router.go(-1);
    })
    .catch(() => {
      message.success("预约失败");
      router.go(-1);
    });
}

function handleClose() {
  show.value = false;
}

function fetchInitData() {
  let paramId = useRoute().params.id;
  venueIdRef.value = paramId;
  message.info(`${paramId}进来了`);
  restfulApi.get(`/venue/reserve/${paramId}`).then((res) => {
    calenderDataRef.value = res.data.map((item) => ({
      reserveList: item.reserveList,
      dateStr: item.reservationDate,
      hours: item.hourList,
    }));
  });
}

fetchInitData();
</script>
<style>
.grid-style {
  height: 208px;
}
</style>
