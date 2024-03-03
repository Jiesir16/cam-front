<template>
  <n-modal :show="show1">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>用户信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="用户名">
          <n-input v-model:value="user1.username" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="user1.email" />
        </n-form-item>
        <!-- 其他表单项 -->
      </n-form>
      <template #action>
        <n-button @click="handleSubmit">提交</n-button>
        <n-button @click="handleCancel">取消</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  useMessage,
} from "naive-ui";

export interface User {
  username?: string;
  email?: string;
}

export interface Props {
  show1?: boolean;
  edit?: boolean;
  user1: User;
}

// 定义组件属性

const props = withDefaults(defineProps<Props>(), {
  show1: false,
  edit: true,
  user1: { username: "", email: "" },
});

const formValue = ref<User>({
  username: "",
  email: "",
});

// 定义发送事件
const emit = defineEmits(["update:show", "edit", "create"]);

function handleSubmit() {
  console.log(
    "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
  );
  console.log("userInfo", formValue);
  console.log("userInfo.value", formValue.value);
  emit("create", formValue.value);
  emit("update:show", false);
}

function handleCancel() {
  console.log(
    "[Modal子组件] 触发了 handleCancel ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}

function handleClose() {
  console.log(
    "[Modal子组件] 触发了 handleClose ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}

const message = useMessage();

function asd() {
  message.info("cccccccccccc");
}

asd();
</script>
