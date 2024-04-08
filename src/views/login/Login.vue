<template>
  <n-flex style="height: 100dvh; width: 100dvw" align="center" justify="center">
    <n-card
      title="登录/注册"
      class="container"
      style="width: 500px; background-color: #ffffff"
    >
      <n-tabs
        default-value="signIn"
        size="large"
        justify-content="space-evenly"
      >
        <n-tab-pane name="signIn" tab="登录">
          <n-form ref="formRef" :rules="rules" :model="formInline">
            <n-form-item label="用户名" path="username">
              <n-input
                v-model:value="formInline.username"
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <n-button @click="handleSubmit" type="primary" block strong>
            登录
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signUp" tab="注册">
          <n-form ref="signUpRef" :rules="signUpRules" :model="signUpForm">
            <n-form-item label="用户名" path="username">
              <n-input
                v-model:value="signUpForm.username"
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                v-model:value="signUpForm.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
                @input="handlePasswordInput"
                @keydown.enter.prevent
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="重复密码" path="reenteredPassword">
              <n-input
                v-model:value="signUpForm.reenteredPassword"
                ref="rPasswordFormItemRef"
                type="password"
                showPasswordOn="click"
                placeholder="请输入重复密码"
                :disabled="!signUpForm.password"
                @keydown.enter.prevent
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <n-button type="primary" @click="handleSignUp" block strong>
            注册
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-flex>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedOutline, PersonOutline } from "@vicons/ionicons5";
import { restfulApi } from "@/axios";
import { useMessage } from "naive-ui";
import { useUsersStore } from "@/stores/modules/users.ts";
import { useRouter } from "vue-router";
import { usePermsStore } from "@/stores/modules/perms.ts";

const message = useMessage();

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};
const formRef = ref();
const formInline = reactive({
  username: null,
  password: null,
});

const signUpRef = ref();
const signUpRules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "两次密码输入不一致",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"],
    },
  ],
};

const rPasswordFormItemRef = ref();
const signUpForm = reactive({
  username: null,
  password: null,
  reenteredPassword: null,
});

function validatePasswordStartWith(rule: any, value: string): boolean {
  return (
    !!signUpForm.password &&
    signUpForm.password.startsWith(value) &&
    signUpForm.password.length >= value.length
  );
}

function validatePasswordSame(signUpForm, value: string): boolean {
  return value === signUpForm.value.password;
}

function handlePasswordInput() {
  if (signUpForm.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}

const usersStore = useUsersStore();
const router = useRouter();

function handleSubmit() {
  formRef.value.validate(async (error) => {
    if (!error) {
      await restfulApi.post("/auth/signIn", formInline).then((res) => {
        console.log("登录响应", res);

        let data = res.data;
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
        usersStore.setToken(res.headers["authorization"]);
        usePermsStore().fetchAllMenus();
        message.success("登录成功");
        router.push({ name: "home" });
      });
    }
  });
}

async function handleSignUp() {
  await restfulApi.post("/auth/signUp", signUpForm).then((res) => {
    console.log("注册响应", res);
    message.success("注册成功");
  });
}
</script>

<style>
.container {
  width: 80%; /* 容器宽度为 80% */
  margin: 0 auto; /* 水平居中 */
  padding: 20px; /* 内边距 */
  background-color: rgba(255, 255, 255, 0.5); /* 容器背景颜色，使用透明度 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 阴影效果 */
}
</style>
