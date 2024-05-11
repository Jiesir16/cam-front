<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">用户管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新建用户
      </n-button>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
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

    <!-- 数据表格 -->
    <n-data-table
      remote
      :bordered="true"
      :single-line="false"
      :columns="columns"
      :data="tableData"
      :pagination="paginationRef"
      @update:page="handlePageChange"
      :loading="loading"
      resizable
    />
    <UserEditModal
      v-model:show="showEditModal"
      v-model:user-model-info="currentUser"
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
import UserEditModal, { User } from "./UserEditModal.vue";
import userApi, { UserSearchParam } from "./userApi";
import { message } from "@/plugins/naive-ui-discrete-api";

// 搜索表单 start
const searchParams = ref<UserSearchParam>({ username: null, email: null });

function onSearch() {
  fetchUsers(searchParams.value);
}

function onReset() {
  searchParams.value = { username: null, email: null };
  fetchUsers(searchParams.value);
}

// 搜索表单 end

// 模态框 start
const showEditModal = ref(false);

const currentUser = ref<User>({
  id: null,
  username: null,
  email: null,
  avatarUrl: null,
  phone: null,
  account: null,
  name: null,
  sex: null,
  grade: null,
  department: null,
  profession: null,
  userClass: null,
  userType: null,
});

function editUser(user) {
  console.log("[用户列表父组件] 收到Modal发送的edit事件", user);
  user.roles = user.roleIds.map((id) => {
    return { id: id };
  });
  console.log("------------------user", user);
  userApi
    .update(user)
    .then(() => {
      message.success("修改成功");
      fetchUsers({});
    })
    .catch(() => {
      message.error("修改失败");
    });
  showEditModal.value = true;
}

function createUser(user) {
  console.log("[用户列表父组件] 收到Modal发送的create事件", user);
  console.log("------------------", currentUser);

  userApi
    .create(user)
    .then(() => {
      message.success("创建成功");
      fetchUsers({});
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

const loading = ref<Boolean>(false);

const tableData = ref([]);

// 删除用户
const deleteItem = (id: number) => {
  userApi.delete(id).then((_) => {
    fetchUsers({});
  });
};

// 更新状态
const updateActivationStatus = (id: number, activated: boolean) => {
  userApi.update({ id, activated }).then(() => {
    // 刷新列表
    fetchUsers({
      current: paginationRef.page,
      ...searchParams.value,
    });
  });
};

const openEditModal = (row: User) => {
  showEditModal.value = true;
  currentUser.value = {
    id: row.id,
    username: row.username,
    email: row.email,
    roleIds: row.roles?.map((role) => role.id),
    avatarUrl: row.avatarUrl,
    phone: row.phone,
    account: row.account,
    name: row.name,
    sex: row.sex,
    grade: row.grade,
    department: row.department,
    profession: row.profession,
    userClass: row.userClass,
    userType: row.userType,
  };
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
  fetchUsers({
    current: currentPage,
    ...searchParams.value,
  });
}

// 获取用户列表
function fetchUsers(params: any) {
  userApi.read(paginationRef, params, tableData, loading);
}

fetchUsers({});
</script>

<style></style>
