<template>
  <NFlex vertical>
    <!-- 查询条件表单 -->
    <n-form ref="searchForm">
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
          <n-button type="default" @click="loadUsers">查询</n-button>
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
import { NButton, NFlex, NIcon, NSwitch, useMessage } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";
import userApi from "./api";

// modal start
const editData = ref({
  username: null,
  email: null,
});

function handleSubmit() {
  console.log(editData);
}

const showModal = ref(false);

function handleClose() {
  editData.value = {
    username: null,
    email: null,
  };
  showModal.value = !showModal;
}

// modal end

// 参考https://www.naiveui.com/zh-CN/light/components/pagination#Pagination-Props
const paginationRef = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix: ({ itemCount }) => {
    return `Total is ${itemCount}.`;
  },
});
const tableData = ref([]);
const searchParams = ref({
  username: null,
  email: null,
  // 其他查询参数
});

async function updateActivationStatus(id: number, activated: boolean) {
  try {
    // 调用 API 更新状态，这里假设有一个名为 userApi 的模块
    await userApi.update({ id: id, activated: activated });
    // 显示成功消息
    message.success("激活状态已更新");
  } catch (error) {
    console.error(error);
    // 显示错误消息
    message.error("更新激活状态失败");
  }
}

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
    render(row) {
      return h(
        NSwitch,
        {
          value: row.activated,
          "onUpdate:value": (value) => {
            // 更新行的激活状态
            row.activated = value;
            // 可以在这里调用 API 更新服务器上的数据
            updateActivationStatus(row.id, value);
          },
        },
        {
          checked: () => "已激活",
          unchecked: () => "已禁用",
        },
      );
    },
  },
  {
    title: "创建时间",
    key: "createTime",
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
  editData.value = { ...row };
}

function deleteItem(row) {
  message.info(`Play ${JSON.stringify(row)}`);
}

// 分页按钮
function handlePageChange(currentPage: number) {
  userApi.read(
    paginationRef,
    {
      current: currentPage,
      size: 10,
      ...searchParams.value,
    },
    tableData,
  );
}

//重置表单
function resetSearchForm() {
  searchParams.value = {
    username: null,
    email: null,
    // 其他查询参数
  };
  paginationRef.page = 1;
  loadUsers();
}

// 重置分页查询参数
const initPageParam = () => {
  paginationRef.page = 1;
  paginationRef.pageCount = 1;
  paginationRef.pageSize = 10;
};

// 获取用户列表
function loadUsers() {
  initPageParam();
  userApi.read(paginationRef, searchParams.value, tableData);
}

loadUsers();
</script>
