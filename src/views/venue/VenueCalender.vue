<template>
  <n-flex vertical justify="space-between" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success"
        >场地: {{ venueName }} 预订
      </n-gradient-text>
    </n-flex>
    <n-grid :cols="28" :x-gap="12" :y-gap="12">
      <n-gi class="grid-style" :span="7" v-for="item in calenderDataRef">
        <n-card class="grid-style" :title="item.dateStr">
          <n-flex vertical>
            <span v-for="x in item.reserveList">
              <n-badge dot :color="x.color" style="margin-right: 5px"
                >{{ x.status ? `占用` : `空闲` }}
              </n-badge>
              <n-button
                text
                :disabled="x.status"
                @click="
                  handleClick(
                    item.dateStr,
                    x.startTime,
                    x.endTime,
                    item.options,
                  )
                "
              >
                {{ x.startTime }} ~ {{ x.endTime }}
              </n-button>
            </span>
          </n-flex>
        </n-card>
      </n-gi>
    </n-grid>
  </n-flex>
  <n-modal :show="show">
    <n-card title="请选择预约时间" style="width: 500px" closable @close="handleClose">
      <n-form ref="editForm">
        <n-form-item label="开始时间">
          <n-select
            v-model:value="timeSelectBox.startTime"
            :options="optionsRef"
          />
        </n-form-item>
        <n-form-item label="结束时间">
          <n-select
            v-model:value="timeSelectBox.endTime"
            :options="optionsRef"
          />
        </n-form-item>
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

const message = useMessage();
const show = ref(false);

const timeSelectBox = ref({
  startTime: null,
  endTime: null,
});

const venueName = ref("图书馆");

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
    dateStr: "2024-05-04",
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
const optionsRef = ref();

function handleClick(
  dateStr: String,
  startTime: String | null,
  endTime: String | null,
  options: Array<any>,
) {
  console.log("11111", dateStr, startTime, endTime);
  timeSelectBox.value = {
    startTime: startTime,
    endTime: endTime,
  };
  optionsRef.value = options;
  show.value = true;
}

function handleCancel() {
  timeSelectBox.value = { startTime: null, endTime: null };
  show.value = false;
}

function handleSubmit() {
  console.log("123");
}

function handleClose() {
  show.value = false;
}

function fetchInitData() {
  let paramId = useRoute().params.id;
  message.info(`${paramId}进来了`);
}

fetchInitData();
</script>
<style>
.grid-style {
  height: 208px;
}
</style>
