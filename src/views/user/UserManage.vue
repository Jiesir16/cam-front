<template>
  <NFlex vertical>
    <!-- 查询条件表单 -->
    <n-form ref="searchForm" inline @submit.prevent="fetchUsers">
      <n-form-item label="用户名">
        <n-input v-model:value="searchParams.name" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="邮箱">
        <n-input v-model:value="searchParams.email" placeholder="请输入邮箱" />
      </n-form-item>
      <!-- 可以根据需要添加更多查询条件 -->
      <n-form-item>
        <n-button type="default" @click="fetchUsers">查询</n-button>
      </n-form-item>
    </n-form>

    <!-- 数据表格 -->
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </NFlex>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import { NFlex ,useMessage} from "naive-ui";
import { useUsersStore } from '@/stores/modules/users'
const message = useMessage();


const searchParams = ref({
  name: "",
  email: "",
  // 其他查询参数
});

const columns = [
  {
    title: "用户名",
    key: "name"
  },
  {
    title: '邮箱',
    key: 'email'
  },
  // 添加更多列
]

const data = computed(() => [{"name":"123","email":"11@qq.com"}])

const userStore = useUsersStore();
function fetchUsers() {
  userStore.fetchUsers(searchParams.value);
}


const pagination = true;
</script>
