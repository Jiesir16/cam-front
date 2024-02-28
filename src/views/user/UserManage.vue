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
      :data="tableData"
      :pagination="pagination"
    />
  </NFlex>
</template>

<script setup lang="ts">
import { ref,h } from "vue";
import { NFlex, NButton,useMessage } from "naive-ui";
import userApi from "./api";

const pagination = ref(true);
const tableData = ref([]);
const searchParams = ref({
  name: "",
  email: "",
  // 其他查询参数
});

const columns = [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => play(row),
        },
        { default: () => "Play" },
      );
    },
  },
];

const message = useMessage();
function play () {
  message.info(`Play ${row.title}`)
}

// 读取用户列表
async function fetchUsers() {
  try {
    const response = await userApi.read(searchParams.value);
    tableData.value = response.data; // 假设响应数据在data字段中
  } catch (error) {
    console.error(error);
  }
}

fetchUsers();
</script>
