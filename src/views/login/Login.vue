
<template>
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
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <div class="flex-initial order-last">
                <a href="javascript:">忘记密码</a>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';


const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };

const formRef = ref();

const autoLogin = ref(false);
const loading = ref(false);

const formInline = reactive({
    username: '',
    password: '',
    isCaptcha: false,
  });


const handleSubmit = (e) => {
        e.preventDefault();
  formRef.value.validate(async (error) =>{
    if (!error) {
      console.log('Received values of form: ', formInline);
    }
  })
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
