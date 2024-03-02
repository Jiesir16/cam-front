<template>
  <n-form @submit.prevent="onSearch" ref="searchForm">
    <n-form-item label="用户名">
      <n-input
        v-model:value="searchFormInfo.username"
        placeholder="请输入用户名"
      />
    </n-form-item>
    <n-form-item label="邮箱">
      <n-input v-model:value="searchFormInfo.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-button type="primary" attr-type="submit">搜索</n-button>
    <n-button @click="onReset">重置</n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";

// 定义组件属性
const props = defineProps({
  searchParams: {
    username: typeof String,
    email: typeof String,
  },
});

const searchFormInfo = ref({ ...props.searchParams });

const emit = defineEmits(["search", "reset"]);

function onSearch() {
  console.log("[SearchForm表单子组件] 触发 提交 按钮");
  emit("search", searchFormInfo.value);
}

function onReset() {
  console.log("[SearchForm表单子组件] 触发 重置 按钮");
  searchFormInfo.value = { username: null, email: null };
  emit("reset");
}
</script>
