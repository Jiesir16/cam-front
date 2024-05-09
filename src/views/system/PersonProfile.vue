<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">个人资料</n-gradient-text>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form
      ref="profileInfoFormRef"
      label-placement="top"
      label-align="left"
      :model="profileInfo"
      :rules="profileInfoRules"
    >
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="12" label="ID" v-show="false">
          <n-input-number v-model:value="profileInfo.id" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="24" path="fileList" label="头像:">
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

        <n-form-item-gi :span="12" path="username" label="用户名:">
          <n-input v-model:value="profileInfo.username" disabled />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="name" label="姓名:">
          <n-input v-model:value="profileInfo.name" placeholder="请输入姓名" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="account" label="学号:">
          <n-input
            :disabled="Boolean(usersStore.loginUserInfo.account)"
            placeholder="请输入学号"
            v-model:value="profileInfo.account"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="email" label="邮箱:">
          <n-input v-model:value="profileInfo.email" placeholder="请输入邮箱" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="phone" label="手机号:">
          <n-input
            v-model:value="profileInfo.phone"
            placeholder="请输入手机号"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="12" path="sex" label="性别:">
          <n-radio-group v-model:value="profileInfo.sex" name="sexGroup">
            <n-flex>
              <n-radio value="1"> 男</n-radio>
              <n-radio value="0"> 女</n-radio>
            </n-flex>
          </n-radio-group>
        </n-form-item-gi>

        <n-form-item-gi :span="12" path="department" label="学院:">
          <n-input
            v-model:value="profileInfo.department"
            placeholder="请输入学院"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="profession" label="专业:">
          <n-input
            v-model:value="profileInfo.profession"
            placeholder="请输入专业"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="grade" label="年级:">
          <n-input-number
            v-model:value="profileInfo.grade"
            placeholder="请输入年级"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="userClass" label="班级:">
          <n-input-number
            v-model:value="profileInfo.userClass"
            placeholder="请输入班级"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <n-modal
      v-model:show="showModalRef"
      :mask-closable="false"
      preset="dialog"
      title="确认"
      content="确定提交吗"
      positive-text="确认"
      negative-text="算了"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    />
    <n-flex justify="end" align="right">
      <n-button type="primary" @click="handleClick">提交</n-button>
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
const profileInfo = ref();
const fileList = ref<Array<UploadFileInfo>>([]);

const profileInfoFormRef = ref();

const profileInfoRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: ["blur", "input"] },
  ],
  account: [
    { required: true, message: "请输入学号", trigger: ["blur", "input"] },
  ],
  name: [{ required: true, message: "请输入姓名", trigger: ["blur", "input"] }],
  email: [
    { required: true, message: "请输入邮箱", trigger: ["blur", "input"] },
  ],
};

const showModalRef = ref(false);

function onNegativeClick() {
  showModalRef.value = false;
}

async function onPositiveClick() {
  showModalRef.value = false;
  profileInfoFormRef.value.validate(async (error) => {
    if (!error) {
      let data = {
        ...profileInfo.value,
      };
      await restfulApi.put("/user", data).then(() => {
        message.success("更新成功");
        let avatarUrlTmp = fileList.value.map((item) => item.url).pop();
        console.log("asd", avatarUrlTmp);
        usersStore.setLoginUserInfo({
          id: data.id,
          avatarUrl: String(avatarUrlTmp),
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
  });
}

async function fetchProfile() {
  profileInfo.value = {
    ...usersStore.loginUserInfo,
    sex: String(usersStore.loginUserInfo.sex),
  };
  fileList.value.push({
    id: "123",
    name: "123",
    batchId: "123",
    percentage: 100,
    status: "finished",
    url: usersStore.loginUserInfo.avatarUrl,
  });

  console.log(profileInfo.value);
}

fetchProfile();

function handleClick() {
  showModalRef.value = true;
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
