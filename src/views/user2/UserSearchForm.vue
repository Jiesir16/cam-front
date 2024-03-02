<template>
  <n-form @submit.prevent="onSearch" ref="searchForm">
    <n-form-item label="用户名">
      <n-input
        v-model:value="searchParams.username"
        placeholder="请输入用户名"
      />
    </n-form-item>
    <n-form-item label="邮箱">
      <n-input v-model:value="searchParams.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-button type="primary" attr-type="submit">搜索</n-button>
    <n-button @click="onReset">重置</n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";

const searchParams = ref({
  username: "",
  email: "",
});

const emit = defineEmits(["search", "reset"]);

function onSearch() {
  console.log("搜索表单提交组件,触发 提交 按钮");
  emit("search", searchParams.value);
}

function onReset() {
  console.log("搜索表单提交组件,触发 重置 按钮");
  searchParams.value = { username: "", email: "" };
  emit("reset");
}
</script>
