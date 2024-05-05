<template>
  <n-flex>
    <n-form ref="resetForm" label-align="left" :rules="resetFormRules">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi label="旧密码:" path="oldPassword" :span="6">
          <n-input v-model:value="resetInfo.oldPassword"></n-input>
        </n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi label="新密码:" path="newPassword" :span="6">
          <n-input v-model:value="resetInfo.newPassword"></n-input>
        </n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi label="重复新密码:" path="reNewPassword" :span="6">
          <n-input v-model:value="resetInfo.reNewPassword"></n-input>
        </n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
        <n-form-item-gi :span="6"></n-form-item-gi>
      </n-grid>
      <n-flex justify="start">
        <n-button type="primary" @click="handleReset">重置</n-button>
      </n-flex>
    </n-form>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { restfulApi } from "@/axios";

const message = useMessage();

const resetInfo = ref({
  oldPassword: null,
  newPassword: null,
  reNewPassword: null,
});
const resetFormRules = {
  oldPassword: [
    {
      required: true,
      message: "请输入旧密码",
      trigger: ["input", "blur"],
      validator(rule: FormItemRule, value: string) {
        console.log("3123123123", value,rule);
        if (value.length < 6) {
          return new Error("密码不应该小于6位");
        }
      },
    },
  ],
  newPassword: [
    {
      required: true,
      message: "请输入新密码",
      validator(value: string) {
        
        if (value.length < 6) {
          return new Error("密码不应该小于6位");
        }
      },
      trigger: ["input", "blur"],
    },
  ],
  reNewPassword: [
    {
      required: true,
      message: "请二次输入新密码",
      validator(value: string) {
        if (value.length < 6) {
          return new Error("密码不应该小于6位");
        }
      },
      trigger: ["input", "blur"],
    },
  ],
};
const resetForm = ref();

function handleReset() {
  let formData = resetInfo.value;
  if (formData.newPassword !== formData.reNewPassword) {
    message.error("新密码两次不一致");
  }
  resetForm.value.validate(async (error) => {
    if (!error) {
      restfulApi
        .put("/auth/password/reset", formData)
        .then(() => {
          message.success("重置密码成功,请退出重新登录");
        })
        .catch(() => {
          message.success("重置密码失败");
        });
    }
  });
}
</script>
