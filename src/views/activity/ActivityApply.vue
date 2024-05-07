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
      :model="activityInfo"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi path="activityName" :span="12" label="活动名称">
          <n-input
            v-model:value="activityInfo.activityName"
            placeholder="请输入活动名称"
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

        <n-form-item-gi path="activityVenue" :span="6" label="活动场地">
          <n-select
            :options="venues"
            v-model:value="activityInfo.venueId"
            placeholder="请选择"
          />
        </n-form-item-gi>
        <n-form-item-gi path="activityCategory" :span="6" label="活动种类">
          <n-select :options="categories" placeholder="请选择" />
        </n-form-item-gi>

        <n-form-item-gi path="enrollment" :span="6" label="可报名人数">
          <n-input-number
            v-model:value="activityInfo.enrollment"
            placeholder="请输入可报名人数"
          />
        </n-form-item-gi>
        <n-form-item-gi path="enrollDeadline" :span="6" label="报名截止时间">
          <n-date-picker
            placeholder="报名截止时间"
            v-model:value-format="activityInfo.enrollDeadline"
            type="datetime"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi path="dateTimeRange" :span="12" label="活动起止时间">
          <n-date-picker
            type="datetimerange"
            start-placeholder="活动开始时间"
            end-placeholder="活动截止时间"
            v-model:value="activityInfo.dateTimeRange"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi path="contactPerson" :span="6" label="活动联系人">
          <n-input
            v-model:value="activityInfo.contactPerson"
            placeholder="活动联系人"
          />
        </n-form-item-gi>
        <n-form-item-gi path="contactPhone" :span="6" label="联系方式">
          <n-input
            v-model:value="activityInfo.contactPhone"
            placeholder="联系方式"
          />
        </n-form-item-gi>
        <n-form-item-gi path="activityBrief" :span="12" label="活动简介">
          <n-input
            type="textarea"
            v-model:value="activityInfo.activityBrief"
            placeholder="请输入活动简介"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="活动封面">
          <n-upload
            action="/api/v1/media/upload"
            @finish="handleFinish"
            :headers="{ Authorization: useUsersStore().token }"
            v-model:file-list="fileList"
            list-type="image-card"
            :max="Number(1)"
          >
            点击上传
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi :span="8">
          <n-alert title="温馨提示：" style="background-color: #ffffff">
            <template #icon>
              <n-icon>
                <AlertCircleOutline />
              </n-icon>
            </template>
            1. 尽量选用横向和分辨率高的海报,这样子显示的信息会更加清晰哦。<br />
            2. 活动海报越精致、信息越详细能吸引更多关注哦！<br />
          </n-alert>
        </n-form-item-gi>

        <n-form-item-gi path="activityAddition" :span="12" label="附加信息">
          <n-input
            type="textarea"
            v-model:value="activityInfo.activityAddition"
            placeholder="附加信息"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <n-flex justify="center">
      <n-button size="large" type="primary" @click="handleSubmit"
        >提交申请
      </n-button>
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
import { AlertCircleOutline } from "@vicons/ionicons5";

const fileList = ref<Array<UploadFileInfo>>([]);

const activityInfo = ref<Activity>({
  activityName: null,
  activityAddress: null,
  venueId: null,
  activityType: null,
  activityBrief: null,
  activityAddition: null,
  enrollment: null,
  dateTimeRange: null,
});

const venues = ref<Array<any>>([]);
const categories = ref<Array<any>>([]);

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

async function handleSubmit() {
  activityApplyFormRef.value.validate(async (error) => {
    if (!error) {
      let urls = fileList.value.map((item) => item.url);
      let param = {
        ...activityInfo.value,
        urls,
      };
      await restfulApi.post("/activity", param).then(() => {
        message.success("申请成功");
        router.push({ name: "activity:info" });
      }).catch(() => {
        router.push({ name: "activity:info" });
      });
    }
  });
}

async function fetchSelectBox() {
  await restfulApi.get("/venue/listAll").then((res) => {
    venues.value = res.data.map((item) => ({
      label: item.venueName,
      value: item.id,
    }));
  });
  await restfulApi.get("/activity/category/listAll").then((res) => {
    categories.value = res.data.map((item) => ({
      label: item.categoryName,
      value: item.categoryCode,
    }));
  });
}

fetchSelectBox();
</script>
