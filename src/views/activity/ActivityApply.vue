<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动申请</n-gradient-text>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 24px">
    <n-form
      ref="activityApplyFormRef"
      label-placement="top"
      :model="activityInfo"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="活动名称">
          <n-input
            v-model:value="activityInfo.activityName"
            placeholder="请输入活动名称"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="活动地址">
          <n-input
            type="textarea"
            v-model:value="activityInfo.activityAddress"
            placeholder="请输入活动地址"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Activity } from "@/views/activity/activityApi.ts";

const activityInfo = ref<Activity>({
  activityName: null,
  activityAddress: null,
  activityType: null,
});
</script>
