<template>
  <NFlex vertical>
    <!-- 查询条件表单 -->
    <n-form ref="searchForm" inline @submit.prevent="fetchUsers">
      <n-form-item label="用户名">
        <n-input
          v-model:value="searchParams.username"
          placeholder="请输入用户名"
        />
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
      remote
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="tableData"
      :pagination="paginationRef"
      @update:page="handlePageChange"
      resizable
    />
  </NFlex>
</template>

<script setup lang="ts">
import { h, reactive, ref } from "vue";
import { NButton, NFlex, NIcon, useMessage } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";
import userApi from "./api";

// 参考https://www.naiveui.com/zh-CN/light/components/pagination#Pagination-Props
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }) {
    return `Total is ${itemCount}.`;
  },
});
const paginationRef = paginationReactive;
const tableData = ref([]);
const searchParams = ref({
  username: null,
  email: null,
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
    title: "是否激活",
    key: "activated",
  },
  {
    title: "创建时间",
    key: "createTime",
    maxWidth: 10,
  },
  {
    title: "修改时间",
    key: "updateTime",
  },
  {
    title: "Actions",
    key: "actions",
    render(row) {
      return [
        h(
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => editItem(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(LayersOutline) }),
              " Edit",
            ],
          },
        ),
        h(
          NButton,
          {
            text: true,
            type: "error",
            onClick: () => deleteItem(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(TrashOutline) }),
              " Delete",
            ],
          },
        ),
      ];
    },
  },
];

const message = useMessage();

function editItem(row) {
  message.info(`Play ${JSON.stringify(row)}`);
}

function deleteItem(row) {
  message.info(`Play ${JSON.stringify(row)}`);
}

// 分页按钮
async function handlePageChange(currentPage) {
  let params = {
    current: currentPage,
    size: 10,
    ...searchParams.value,
  };
  const response = await userApi.read(params);
  paginationReactive.page = currentPage;
  paginationReactive.pageCount = response.data.page;
  paginationReactive["itemCount"] = response.data.total;
  // 假设响应数据在data字段中
  tableData.value = response.data.records;
}

// 读取用户列表
async function fetchUsers() {
  try {
    paginationReactive.page = 1;
    let params = {
      current: paginationReactive.page,
      size: 10,
      ...searchParams.value,
    };
    const response = await userApi.read(params);

    paginationReactive["itemCount"] = response.data.total;
    paginationReactive.pageCount = response.data.page;
    // 假设响应数据在data字段中
    tableData.value = response.data.records;
  } catch (error) {
    console.error(error);
  }
}

fetchUsers();
</script>
