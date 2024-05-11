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
            <div v-for="x in item.reserveList">
              <n-flex>
                <n-badge dot :color="x.color" style="margin-right: 5px"
                  >{{ x.status ? `占用` : `空闲` }}
                </n-badge>
                <n-text>{{ x.startTime }} ~ {{ x.endTime }}</n-text>
                <template
                  v-if="useUsersStore().loginUserInfo.id === x.reserveUserId"
                >
                  <n-tooltip placement="bottom" trigger="hover">
                    <template #trigger>
                      <n-button
                        @click="handleUnReserve(x.reserveId)"
                        text
                        style="color: yellowgreen; font-size: 16px"
                      >
                        <template #icon>
                          <n-icon>
                            <StarFilled />
                          </n-icon>
                        </template>
                      </n-button>
                    </template>
                    <span> 点击取消预定 </span>
                  </n-tooltip>
                </template>
              </n-flex>
            </div>
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
  <n-input-number v-model:value="modalReserveId" v-show="false" />
  <n-modal
    v-model:show="ackModal"
    :mask-closable="false"
    preset="dialog"
    title="取消预定"
    content="是否取消预定吗?"
    positive-text="是"
    negative-text="否"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import { restfulApi } from "@/axios";
import { StarFilled } from "@vicons/carbon";
import { useUsersStore } from "@/stores/modules/users.ts";

const message = useMessage();
const show = ref(false);
const ackModal = ref(false);

const timeSelectBox = ref({
  reserveDate: null,
  startTime: null,
  endTime: null,
});
const venueIdRef = ref();
const venueName = ref("图书馆");
const hoursRef = ref<Array<number>>();
const calenderDataRef = ref([]);
const modalReserveId = ref();

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

async function handleSubmit() {
  await restfulApi
    .post("/venue/reserve", {
      ...timeSelectBox.value,
      venueId: venueIdRef.value,
    })
    .then(() => {
      message.success("预约成功");
      show.value = false;
      fetchReserveData();
    });
}

function handleClose() {
  show.value = false;
}

function fetchInitData() {
  const paramId = useRoute().params.id;
  venueIdRef.value = paramId;
  fetchReserveData();
}

function fetchReserveData() {
  let paramId = venueIdRef.value;
  restfulApi.get(`/venue/reserve/${paramId}`).then((res) => {
    calenderDataRef.value = res.data.map((item) => ({
      reserveList: item.reserveList,
      dateStr: item.reservationDate,
      hours: item.hourList,
    }));
  });
}

function onNegativeClick() {
  modalReserveId.value = null;
  ackModal.value = false;
}

function handleUnReserve(reserveId) {
  modalReserveId.value = reserveId;
  ackModal.value = true;
}

function onPositiveClick() {

  restfulApi.put("/venue/reserve", { id: modalReserveId.value }).then(() => {
    message.success("取消成功");
    fetchReserveData();
  });
}

fetchInitData();
</script>
<style>
.grid-style {
  height: 308px;
}
</style>
