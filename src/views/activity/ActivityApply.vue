<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动申请</n-gradient-text>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 24px">
    <n-form
      ref="activityApplyFormRef"
      :rules="activityApplyFormRules"
      label-placement="left"
      :model="activityInfo"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi path="activityName" :span="12" label="活动名称">
          <n-input
            v-model:value="activityInfo.activityName"
            placeholder="请输入活动名称"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="活动封面">
          <n-upload
            action="/api/v1/media/upload"
            @finish="handleFinish"
            :headers="{ Authorization: useUsersStore().token }"
            v-model:file-list="fileList"
            list-type="image-card"
          >
            点击上传
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi path="activityBrief" :span="12" label="活动简介">
          <n-input
            type="textarea"
            v-model:value="activityInfo.activityBrief"
            placeholder="请输入活动简介"
          />
        </n-form-item-gi>
        <n-form-item-gi path="activityType" :span="12" label="活动类型">
          <n-radio-group
            v-model:value="activityInfo.activityType"
            name="sexGroup"
          >
            <n-flex>
              <n-radio value="online"> 线上活动</n-radio>
              <n-radio value="onffline"> 线下活动</n-radio>
            </n-flex>
          </n-radio-group>
        </n-form-item-gi>
        <n-form-item-gi path="activityAddition" :span="12" label="附加信息">
          <n-input
            type="textarea"
            v-model:value="activityInfo.activityAddition"
            placeholder="请输入活动简介"
          />
        </n-form-item-gi>
        <n-form-item-gi path="dateTimeRange" :span="12" label="活动时间">
          <n-date-picker type="datetimerange" v-model:value="activityInfo.dateTimeRange" clearable />
        </n-form-item-gi>
        <n-form-item-gi path="enrollDeadline" :span="12" label="报名截止时间">
          <n-date-picker
            v-model:value="activityInfo.enrollDeadline"
            type="datetime"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi path="enrollment" :span="12" label="可报名人数">
          <n-input-number
            v-model:value="activityInfo.enrollment"
            placeholder="请输入可报名人数"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <n-flex justify="end">
      <n-button type="primary" @click="handleSubmit">提交申请</n-button>
    </n-flex>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Activity } from "@/views/activity/activityApi.ts";
import { useUsersStore } from "@/stores/modules/users.ts";
import { UploadFileInfo } from "naive-ui";
import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import router from "@/router";

const fileList = ref<Array<UploadFileInfo>>([]);

const activityInfo = ref<Activity>({
  activityName: null,
  activityAddress: null,
  activityType: null,
  activityBrief: null,
  activityAddition: null,
  enrollment: null,
  dateTimeRange: null,
});

const activityApplyFormRules = {
  activityName: { required: true, message: "请输入活动名称", trigger: "blur" },
  activityType: [
    {
      required: true,
      message: "请选择活动类型",
      trigger: "blur",
    },
  ],
  dateTimeRange: [
    {
      type: "array",
      required: true,
      trigger: ["blur", "change"],
      message: "请输入 datetimeValue",
    },
  ],
};

function handleFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent<XMLHttpRequest>;
}) {
  console.log("[handleFinish]", file, event);
  if (event && event.target && event.target) {
    file.url = event.target.response;
  }
}

const activityApplyFormRef = ref();

function handleSubmit() {
  activityApplyFormRef.value.validate(async (error) => {
    if (!error) {
      let urls = fileList.value.map((item) => item.url);
      let param = {
        ...activityInfo.value,
        urls,
      };
      console.log(param);
      restfulApi.post("/activity", param).then((res) => {
        message.success("申请成功");
        router.push({ name: "activity:info" });
      });
    }
  });
}
</script>
