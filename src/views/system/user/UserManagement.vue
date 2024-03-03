<template>
  <n-flex
    justify="space-between"
    align="center"
    style="
      padding: 0 24px;
      border-left: none;
      border-bottom: 1px solid #eee;
      border-top: solid #eee;
    "
  >
    <n-flex style="height: 50px" align="center">
        <n-h2 prefix="bar" align-text style="margin: 0">
          <n-text type="success" strong tag="div">用户管理</n-text>
        </n-h2>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" tertiary round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新建用户
      </n-button>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <UserSearchForm
      v-model:searchParams="searchParams"
      @search="handleSearch"
      @reset="resetSearch"
    />

    <!-- 数据表格 -->
    <n-data-table
      remote
      :bordered="true"
      :single-line="false"
      :columns="columns"
      :data="tableData"
      :pagination="paginationRef"
      @update:page="handlePageChange"
      resizable
    />
    <UserEditModal
      v-model:show1="showEditModal"
      v-model:user1="currentUser"
      v-model:edit="isEdit"
      @edit="editUser"
      @create="createUser"
      @update:show="handleShow"
    />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./userTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import UserSearchForm from "./UserSearchForm.vue";
import UserEditModal from "./UserEditModal.vue";
import userApi from "./userApi";
import { message } from "@/plugins/naive-ui-discrete-api";

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
const currentUser = ref({ username: null, email: null });
const isEdit = ref(false);

function editUser(user) {
  console.log("[用户列表父组件] 收到Modal发送的edit事件", user);
  showEditModal.value = true;
}

function createUser(user) {
  console.log("[用户列表父组件] 收到Modal发送的create事件", user);

  userApi
    .create(user)
    .then(() => {
      message.success("创建成功");
    })
    .catch((error) => {
      console.log("创建用户失败", error);
      message.error("创建失败");
    });

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

const openEditModal = (row) => {
  isEdit.value = true;
  showEditModal.value = true;
  let param1 = { username: row.username, email: row.email };
  currentUser.value = param1;
  console.log("editItem", row);
};

const columns = getTableColumns(
  updateActivationStatus,
  openEditModal,
  deleteItem,
);

function openCreateModal() {
  showEditModal.value = true;
  currentUser.value = { username: null, email: null };
  isEdit.value = false;
}

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
function fetchUsers(params: any) {
  userApi.read(paginationRef, params, tableData);
}

fetchUsers({});
</script>

<style>
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}
</style>
