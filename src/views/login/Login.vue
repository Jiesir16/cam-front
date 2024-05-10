<template>
  <ul class="background">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <n-flex class="login-background" align="center" justify="center">
    <n-card title="登录/注册" class="container">
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
import { useMessage, useNotification } from "naive-ui";
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
  username: "admin",
  password: "123456",
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
const notification = useNotification();

function handleSubmit() {
  formRef.value.validate(async (error) => {
    if (!error) {
      await restfulApi.post("/auth/signIn", formInline).then((res) => {
        console.log("登录响应", res);

        let data = res.data;
        usersStore.setLoginUserInfo({
          id: data.id,
          avatarUrl: data.avatarUrl,
          username: data.username,
          name: data.name,
          account: data.account,
          sex: data.sex,
          phone: data.phone,
          grade: data.grade,
          department: data.department,
          profession: data.profession,
          userClass: data.userClass,
          userType: data.userType,
          email: data.email,
        });
        usersStore.setToken(res.headers["authorization"]);
        usePermsStore().fetchAllMenus();

        notification["success"]({
          content: "登录成功",
          meta: "欢迎回来",
          duration: 1500,
          keepAliveOnHover: true,
        });
        router.push({ name: "front:home" });
      });
    }
  });
}

async function handleSignUp() {
  await restfulApi.post("/auth/signUp", signUpForm).then((res) => {
    console.log("注册响应", res);
    message.success("注册成功");
    signUpForm.username = null;
    signUpForm.password = null;
    signUpForm.reenteredPassword = null;
  });
}
</script>

<style>
.container {
  width: 500px;
  margin: 0 auto; /* 水平居中 */
  padding: 20px; /* 内边距 */
  background-color: rgba(255, 255, 255, 0.9); /* 容器背景颜色，使用透明度 */
  border-radius: 17px; /* 圆角边框 */
  box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0; /* 阴影效果 */
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  -webkit-border-radius: 17px;
  color: rgba(255, 255, 255, 0.6);
}

.login-background {
  height: 100dvh;
  width: 100dvw;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #98cce2;
  overflow: hidden;
}

.background li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  animation: animate 16s linear infinite;
}

.background li:nth-child(0) {
  left: 1%;
  width: 105px;
  height: 105px;
  bottom: -105px;
  animation-delay: 1s;
}

.background li:nth-child(1) {
  left: 48%;
  width: 156px;
  height: 156px;
  bottom: -156px;
  animation-delay: 2s;
}

.background li:nth-child(2) {
  left: 21%;
  width: 191px;
  height: 191px;
  bottom: -191px;
  animation-delay: 3s;
}

.background li:nth-child(3) {
  left: 68%;
  width: 112px;
  height: 112px;
  bottom: -112px;
  animation-delay: 4s;
}

.background li:nth-child(4) {
  left: 86%;
  width: 101px;
  height: 101px;
  bottom: -101px;
  animation-delay: 7s;
}

.background li:nth-child(5) {
  left: 85%;
  width: 130px;
  height: 130px;
  bottom: -130px;
  animation-delay: 9s;
}

.background li:nth-child(6) {
  left: 45%;
  width: 123px;
  height: 123px;
  bottom: -123px;
  animation-delay: 11s;
}

.background li:nth-child(7) {
  left: 44%;
  width: 111px;
  height: 111px;
  bottom: -111px;
  animation-delay: 21s;
}

.background li:nth-child(8) {
  left: 42%;
  width: 143px;
  height: 143px;
  bottom: -143px;
  animation-delay: 17s;
}

.background li:nth-child(9) {
  left: 13%;
  width: 135px;
  height: 135px;
  bottom: -135px;
  animation-delay: 43s;
}
</style>
