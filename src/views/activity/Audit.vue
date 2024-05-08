<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动审核</n-gradient-text>
    </n-flex>
  </n-flex>

  <n-flex style="margin: 24px">
    <n-card>
      <n-form
        ref="activityApplyFormRef"
        label-placement="left"
        :model="activityInfo"
      >
        <n-grid :cols="24" :x-gap="12">
          <n-input-number
            v-model:value="activityIdRef"
            v-show="false"
          ></n-input-number>
          <n-form-item-gi path="activityName" :span="12" label="活动名称:">
            <n-text>{{ activityInfo.activityName }}</n-text>
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
          <n-form-item-gi path="venueName" :span="12" label="活动场地:">
            <n-text>{{ activityInfo.venueName }}</n-text>
          </n-form-item-gi>
          <n-form-item-gi path="categoryName" :span="12" label="活动种类:">
            <n-text>{{ activityInfo.categoryName }}</n-text>
          </n-form-item-gi>
          <n-form-item-gi path="enrollment" :span="12" label="可报名人数:">
            <n-text>{{ activityInfo.enrollment }} 人</n-text>
          </n-form-item-gi>
          <n-form-item-gi
            path="enrollDeadline"
            :span="12"
            label="报名截止时间:"
          >
            <n-text>{{ activityInfo.enrollDeadline }}</n-text>
          </n-form-item-gi>

          <n-form-item-gi path="dateTimeRange" :span="12" label="活动起止时间:">
            <n-text
              >{{ activityInfo.beginDatetime }} ～
              {{ activityInfo.endDatetime }}
            </n-text>
          </n-form-item-gi>

          <n-form-item-gi path="contactPerson" :span="6" label="活动联系人:">
            <n-text>{{ activityInfo.contactPerson }}</n-text>
          </n-form-item-gi>

          <n-form-item-gi path="contactPhone" :span="6" label="联系方式:">
            <n-text>{{ activityInfo.contactPhone }}</n-text>
          </n-form-item-gi>

          <n-form-item-gi path="activityBrief" :span="12" label="活动简介:">
            <n-text>{{ activityInfo.activityBrief }}</n-text>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="活动封面:">
            <n-image width="200px" :src="activityInfo.imgUrl" />
          </n-form-item-gi>
          <n-form-item-gi path="activityAddition" :span="12" label="附加信息:">
            <n-text>{{ activityInfo.activityAddition }}</n-text>
          </n-form-item-gi>
          <n-form-item-gi path="comment" :span="24" label="审批意见:">
            <n-input
              v-model:value="auditComment"
              type="textarea"
              placeholder="请输入意见"
            ></n-input>
          </n-form-item-gi>
        </n-grid>
        <n-flex justify="end">
          <n-button type="primary" @click="handleSubmit('1')">通过</n-button>
          <n-button type="error" @click="handleSubmit('2')">拒绝</n-button>
          <n-button @click="router.go(-1)">取消</n-button>
        </n-flex>
      </n-form>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Activity } from "@/views/activity/activityApi.ts";
import { useRoute } from "vue-router";
import { restfulApi } from "@/axios";
import router from "@/router";
import { useMessage } from "naive-ui";

const activityIdRef = ref<Number>();
const message = useMessage();
const auditComment = ref();
const activityInfo = ref<Activity>({
  id: null,
  activityName: null,
  activityAddress: null,
  venueName: null,
  categoryName: null,
  activityType: null,
  activityBrief: null,
  activityAddition: null,
  enrollment: null,
  beginDatetime: null,
  endDatetime: null,
  enrollDeadline: null,
  imgUrl: null,
});

function fetchActivityInfo() {
  let activityId = useRoute().params.id;
  activityIdRef.value = Number(activityId);
  restfulApi.get(`/activity/detail/${activityId}`).then((res) => {
    let data = res.data;
    activityInfo.value = {
      id: data.id,
      activityName: data.activityName,
      activityAddress: data.activityAddress,
      activityType: data.activityType,
      activityBrief: data.activityBrief,
      activityAddition: data.activityAddition,
      enrollment: data.enrollment,
      beginDatetime: data.beginDatetime,
      endDatetime: data.endDatetime,
      enrollDeadline: data.enrollDeadline,
      venueName: data.venueName,
      categoryName: data.categoryName,
      imgUrl: data.activityImg,
    };
  });
}

function handleSubmit(status: String) {
  restfulApi
    .post("/activity/audit", {
      id: activityIdRef.value,
      auditComment: auditComment.value,
      auditStatus: status,
    })
    .then(() => {
      message.success("审批成功");
      router.push({ name: "activity:info" });
    })
    .catch(() => {
      router.push({ name: "activity:info" });
    });
}

fetchActivityInfo();
</script>
