<template>
  <div>
    <UserSearchForm @search="fetchUsers" @reset="resetSearch" />
    <n-data-table :columns="columns" :data="users" />
    <EditUserModal
      v-model:show1="showEditModal"
      :user="currentUser"
      @edit="editUser"
      @update:show="testFun"
    />
  </div>
  <!-- 点击按钮时打开模态框 -->
  <n-button @click="showEditModal = !showEditModal">编辑用户</n-button>
</template>

<script setup>
import { h, ref } from "vue";
import UserSearchForm from "./UserSearchForm.vue";
import EditUserModal from "./EditUserModal.vue";
import { NButton, NDataTable, NIcon } from "naive-ui";
import { editUserApi, fetchUsersApi } from "./api";
import { LayersOutline } from "@vicons/ionicons5";

function testFun(data) {
  console.log(
    "收到 [Modal子组件] 发送的 [update:show] 事件,即将更新父组件的 [showEditModal] ",
    data,
  );
  showEditModal.value = data;
}

const users = ref([]);
const showEditModal = ref(false);
const currentUser = ref({});
const columns = ref([
  { title: "用户名", key: "username" },
  { title: "邮箱", key: "email" },
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
            onClick: () => handleShow(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(LayersOutline) }),
              " Edit",
            ],
          },
        ),
      ];
    },
  },
  // 其他列
]);

const handleShow = (row) => {
  showEditModal.value = true;
  currentUser.value = row;
};

function fetchUsers(params) {
  console.log("fetchUsers 触发了");
  fetchUsersApi(params).then((data) => {
    users.value = data;
  });
}

function resetSearch() {
  console.log("父组件 收到 [SearchForm子组件] 发送的 [reset事件] ,父组件执行刷新用户方法");
  
  fetchUsers({});
}

function editUser(user) {
  console.log("收到Modal发送的edit事件", user);
  showEditModal.value = true;
  editUserApi(user).then(() => {
    fetchUsers({});
  });
}

// 假设 editUserApi 和 fetchUsersApi 是 API 调用函数
</script>
