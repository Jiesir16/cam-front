<template>
  <n-result
    status="403"
    title="403 禁止访问"
    description="总有些门是对你关闭的"
  >
    <template #footer>
    <router-link to="/">
      <n-button>返回主页</n-button>
    </router-link>

    </template>
  </n-result>
</template>

<script setup lang="ts">
// 在这里导入其他组件或者使用 Composition API
</script>
