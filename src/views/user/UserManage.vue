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
        <slot name="fetchUserSlot">
          <n-button type="default" @click="fetchUsers">查询</n-button>
        </slot>
        <slot name="resetFormSlot">
          <n-button @click="resetSearchForm">重置</n-button>
        </slot>
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

  <n-modal v-model:show="showModal">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>用户信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="用户名">
          <n-input v-model:value="editData.username" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="editData.email" />
        </n-form-item>
        <!-- 其他表单项 -->
      </n-form>
      <template #action>
        <n-button @click="handleSubmit">提交</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { h, reactive, ref } from "vue";
import { NButton, NFlex, NIcon, useMessage } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";
import userApi from "./api";

// modal start
const initEditData = {
  username: null,
  email: null,
};
const editData = ref({ ...initEditData });

function handleSubmit() {
  console.log(editData);
}

const showModal = ref(false);

function handleClose() {
  console.log(initEditData);
  console.log(editData);
  editData.value = { ...initEditData };
  showModal.value = !showModal;
}

// modal end

const defaultPagination = {
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }) {
    return `Total is ${itemCount}.`;
  },
};

// 参考https://www.naiveui.com/zh-CN/light/components/pagination#Pagination-Props
const paginationReactive = reactive(defaultPagination);
const paginationRef = paginationReactive;
const tableData = ref([]);
const initSearchParams = {
  username: null,
  email: null,
  // 其他查询参数
};
const searchParams = ref({ ...initSearchParams });

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
  showModal.value = true;
  editData.value = {...row}
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

//重置表单
function resetSearchForm() {
  searchParams.value = { ...initSearchParams };
  fetchUsers();
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
