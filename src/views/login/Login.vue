<template>
  <div class="login-container">
    <n-form
      ref="formRef"
      label-placement="left"
      size="large"
      :model="formInline"
      :rules="rules"
    >
      <n-form-item path="username">
        <n-input v-model:value="formInline.username" placeholder="请输入用户名">
          <template #prefix>
            <n-icon size="18" color="#808695">
              <PersonOutline />
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
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
      <n-form-item>
        <n-button
          type="primary"
          @click="handleSubmit"
          size="large"
          :loading="loading"
          block
        >
          登录
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedOutline, PersonOutline } from "@vicons/ionicons5";
import { restfulApi } from "@/axios";
import { useMessage } from "naive-ui";
import { LoginUserInfo, useUsersStore } from "@/stores/modules/users.ts";
import { useRouter } from "vue-router";
import {usePermsStore} from "@/stores/modules/perms.ts";

const message = useMessage();

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const formRef = ref();

const loading = ref(false);

const formInline = reactive({
  username: "admin",
  password: "123456",
});

const usersStore = useUsersStore();
const router = useRouter();

const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value.validate(async (error) => {
    if (!error) {
      await restfulApi.post("/auth/signIn", formInline).then((res) => {
        console.log("登录响应", res);

        usersStore.setLoginUserInfo(<LoginUserInfo>{
          username: formInline.username,
          token: res.headers["authorization"],
        });
        usePermsStore().fetchAllMenus();
        message.success("登录成功");
        router.push({ name: "home" });
      });
    }
  });
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 调整间距 */
  width: 100%;
  max-width: 100%; /* 最大宽度，确保在大屏幕上也不会过宽 */
}

.login-button {
  margin-top: 20px; /* 登录按钮的上边距 */
}
</style>
