<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动审核</n-gradient-text>
    </n-flex>
  </n-flex>

  <n-flex style="margin: 24px">
    <n-form
      ref="activityApplyFormRef"
      label-placement="left"
      :model="activityInfo"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi path="activityName" :span="12" label="活动名称:">
          <n-text>{{ activityInfo.activityName }}</n-text>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="活动封面:">
          <n-image width="300px" :src="activityInfo.imgUrl" />
        </n-form-item-gi>
        <n-form-item-gi path="activityBrief" :span="12" label="活动简介:">
          {{ activityInfo.activityBrief }}
        </n-form-item-gi>
        <n-form-item-gi path="activityType" :span="12" label="活动类型:">
          <n-radio-group
            v-model:value="activityInfo.activityType"
            name="sexGroup"
            red
          >
            <n-flex>
              <n-radio value="online"> 线上活动</n-radio>
              <n-radio value="offline"> 线下活动</n-radio>
            </n-flex>
          </n-radio-group>
        </n-form-item-gi>
        <n-form-item-gi path="activityAddition" :span="12" label="活动场地:">
        {{ activityInfo.activityAddition }}
        </n-form-item-gi>
        <n-form-item-gi path="activityAddition" :span="12" label="附加信息:">
          {{ activityInfo.activityAddition }}
        </n-form-item-gi>
        <n-form-item-gi path="dateTimeRange" :span="12" label="活动时间:">
          {{ activityInfo.beginDatetime }} ~ {{ activityInfo.endDatetime }}
        </n-form-item-gi>
        <n-form-item-gi path="enrollDeadline" :span="12" label="报名截止时间:">
          {{ activityInfo.enrollDeadline }}
        </n-form-item-gi>
        <n-form-item-gi path="enrollment" :span="12" label="可报名人数:">
          {{ activityInfo.enrollment }} 人
        </n-form-item-gi>
        <n-form-item-gi path="comment" :span="24" label="审批意见:">
          <n-input type="textarea" placeholder="请输入意见"></n-input>
        </n-form-item-gi>
      </n-grid>
      <n-flex justify="end">
        <n-button type="primary">通过</n-button>
        <n-button type="error">拒绝</n-button>
        <n-button>取消</n-button>
      </n-flex>
    </n-form>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Activity } from "@/views/activity/activityApi.ts";

const activityInfo = ref<Activity>({
  activityName: "青春飞扬，活力四射--校园运动会",
  activityAddress: null,
  activityType: "offline",
  activityBrief:
    "青春飞扬，活力四射--校园运动会旨在弘扬体育精神，展现学生风采，增强学生体质，丰富校园文化生活，营造积极向上、团结奋进的校园氛围。本届运动会将以“更快、更高、更强”的奥林匹克格言为宗旨，激发学生们的运动热情，促进学生身心健康发展。",
  activityAddition: "弘扬体育精神，展现学生风采。",
  enrollment: 40,
  beginDatetime: "2024年05月21日 08:00:00",
  endDatetime: "2024年05月21日 15:00:00",
  enrollDeadline: "2024年05月18日 21:00:00",
  imgUrl:
    "https://cam-1252350342.cos.ap-beijing.myqcloud.com/campus/1712753498133.jpg",
});
</script>
