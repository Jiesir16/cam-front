<template>
  <UserSearchForm
    v-model:searchParams="searchParams"
    @search="handleSearch"
    @reset="resetSearch"
  />
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
  <EditUserModal
    v-model:show1="showEditModal"
    :user="currentUser"
    @edit="editUser"
    @update:show="handleShow"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "@/views/user/columns";
import UserSearchForm from "./UserSearchForm.vue";
import EditUserModal from "./EditUserModal.vue";
import userApi from "./api";

// 搜索表单 start
const searchParams = ref({ username: null, email: null });

function handleSearch(params) {
  console.log(
    "[用户列表父组件] 收到 [SearchForm子组件] 发送的 [search事件] ,父组件执行获取用户方法",
  );
  fetchUsers(params);
}

function resetSearch() {
  console.log(
    "[用户列表父组件] 收到 [SearchForm子组件] 发送的 [reset事件] ,父组件执行获取用户方法",
  );
  fetchUsers({});
}

// 搜索表单 end

// 模态框 start
const showEditModal = ref(false);
const currentUser = ref({});

function editUser(user) {
  console.log("[用户列表父组件] 收到Modal发送的edit事件", user);
  showEditModal.value = true;
}

function handleShow(show) {
  console.log(
    "[用户列表父组件] 收到 [Modal子组件] 发送的 [update:show] 事件,即将更新父组件的 [showEditModal] ",
    show,
  );
  showEditModal.value = show;
}

// 模态框 end

const tableData = ref([]);

// 删除用户
const deleteItem = (id: number) => {
  userApi.delete(id).then((reponse) => {
    console.log("删除响应", reponse);
  });
};

// 更新状态
const updateActivationStatus = (id: number, activated: boolean) => {
  userApi.update({ id, activated }).then((reponse) => {
    console.log("更新响应", reponse);
  });
};

const editItem = (row) => {
  showEditModal.value = true;
  currentUser.value = row;
  console.log("editItem", row);
};

const columns = getTableColumns(updateActivationStatus, editItem, deleteItem);

// 参考https://www.naiveui.com/zh-CN/light/components/pagination#Pagination-Props
const paginationRef = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix: ({ itemCount }) => {
    return `Total is ${itemCount}.`;
  },
});

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

// 获取用户列表
function fetchUsers(params) {
  userApi.read(paginationRef, params, tableData);
}

fetchUsers({});
</script>
