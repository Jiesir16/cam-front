<template>
  <n-flex
    vertical
    style="margin-left: 64px; margin-top: 64px; max-width: 1000px"
  >
    <n-form
      ref="activityApplyFormRef"
      label-placement="left"
      label-align="right"
      :model="activityInfo"
    >
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="12" label="ID" v-show="false">
          <n-input-number v-model:value="activityInfo.id" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="头像">
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

        <n-form-item-gi :span="12" label="用户名">
          <n-input v-model:value="activityInfo.username" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="学号">
          <n-input
            :disabled="Boolean(usersStore.loginUserInfo.account)"
            placeholder="请输入学号"
            v-model:value="activityInfo.account"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="邮箱">
          <n-input
            v-model:value="activityInfo.email"
            placeholder="请输入邮箱"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="姓名">
          <n-input v-model:value="activityInfo.name" placeholder="请输入姓名" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="性别">
          <n-radio-group v-model:value="activityInfo.sex" name="sexGroup">
            <n-flex>
              <n-radio value="1"> 男</n-radio>
              <n-radio value="0"> 女</n-radio>
            </n-flex>
          </n-radio-group>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="年级">
          <n-input-number
            v-model:value="activityInfo.grade"
            placeholder="请输入年级"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="学院">
          <n-input
            v-model:value="activityInfo.department"
            placeholder="请输入学院"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="专业">
          <n-input
            v-model:value="activityInfo.profession"
            placeholder="请输入专业"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="班级">
          <n-input-number
            v-model:value="activityInfo.userClass"
            placeholder="请输入班级"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <n-flex justify="end" align="right">
      <n-button type="primary" @click="handleSubmit">提交</n-button>
    </n-flex>
  </n-flex>
</template>
<script setup lang="ts">
import { useUsersStore } from "@/stores/modules/users.ts";
import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import { ref } from "vue";
import { UploadFileInfo } from "naive-ui";

const usersStore = useUsersStore();
const activityInfo = ref();
const fileList = ref();

function fetchProfile() {
  activityInfo.value = {
    ...usersStore.loginUserInfo,
    sex: String(usersStore.loginUserInfo.sex),
  };
  console.log(activityInfo.value);
}

fetchProfile();

function handleSubmit() {
  let data = {
    ...activityInfo.value,
  };
  restfulApi.put("/user", data).then((res) => {
    message.success("更新成功");
    usersStore.setLoginUserInfo({
      id: data.id,
      username: data.username,
      name: data.name,
      account: data.account,
      sex: data.sex,
      grade: data.grade,
      department: data.department,
      profession: data.profession,
      userClass: data.userClass,
      userType: data.userType,
      email: data.email,
    });
  });
}

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
</script>
