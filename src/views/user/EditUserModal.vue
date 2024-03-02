<template>
  <n-modal :show="show1" title="编辑用户信息">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>用户信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="用户名">
          <n-input v-model:value="user.username" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="user.email" />
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

<script setup>
import { ref } from "vue";
import { NButton, NForm, NFormItem, NInput, NModal } from "naive-ui";

// 定义组件属性
const props = defineProps({
  show1: typeof Boolean,
  user: {
    id: typeof Number,
    username: typeof String,
    email: typeof String,
  },
});

// 定义发送事件
const emit = defineEmits(["update:show", "edit"]);

const userInfo = ref({ ...props.userInfo });

function handleSubmit() {
  console.log(
    "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
  );
  emit("edit", userInfo.value);
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
</script>
