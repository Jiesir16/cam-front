<template>
  <n-modal :show="show1" title="编辑用户信息">
    <n-card closable @close="handleClose" style="width: 500px">
      <n-form>
        <n-form-item label="用户名">
          <n-input v-model:value="user.username" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="user.email" />
        </n-form-item>
        <n-button @click="submitEdit">提交</n-button>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from "vue";

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

const userInfo = ref({ ...props.user });

function submitEdit() {
  console.log("触发表单提交, 发送给父组件[edit事件、更新show属性的事件]");
  emit("edit", userInfo.value);
  emit("update:show", false);
}

function handleClose() {
  console.log("触发了 handleClose ，发送给父组件 更新show属性的事件");
  emit("update:show", false);
}
</script>
