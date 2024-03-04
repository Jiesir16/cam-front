<template>
  <n-form @submit.prevent="onSearch" ref="searchForm" inline>
    <n-form-item label="用户名">
      <n-input
        v-model:value="searchParams.username"
        placeholder="请输入用户名"
      />
    </n-form-item>
    <n-form-item label="邮箱">
      <n-input v-model:value="searchParams.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" attr-type="submit">搜索</n-button>
    </n-form-item>
    <n-form-item>
      <n-button @click="onReset">重置</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
interface SearchParam {
  username: String | null;
  email: String | null;
}

interface Props {
  searchParams: SearchParam;
}

// 定义组件属性
const props = defineProps<Props>();

const emit = defineEmits(["search", "reset"]);

function onSearch() {
  console.log("[SearchForm表单子组件] 触发 提交 按钮");
  emit("search");
}

function onReset() {
  console.log("[SearchForm表单子组件] 触发 重置 按钮");
  emit("reset");
}
</script>
