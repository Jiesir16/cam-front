<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="24" type="success">角色管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新建角色
      </n-button>
    </n-flex>
  </n-flex>

  

  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm" inline>
      <n-form-item label="角色编码">
        <n-input
          v-model:value="searchParams.roleCode"
          placeholder="请输入角色编码"
          />
      </n-form-item>
      <n-form-item label="角色名称">
        <n-input
          v-model:value="searchParams.roleName"
          placeholder="请输入角色名称"
          />
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
      :data="tableDataRef"
      :pagination="paginationRef"
      @update:page="handlePageChange"
      :loading="loading"
      resizable
    />
    <RoleEditModal
      v-model:show="showEditModal"
      v-model:roleInfo="currentRole"
      @edit="editRole"
      @create="createRole"
      @update:show="handleShow"
    />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./roleTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import RoleEditModal from "./RoleEditModal.vue";
import { useMessage } from "naive-ui";
import roleApi, { Role, RoleSearchParams } from "@/views/system/role/roleApi";

const message = useMessage();

// modal start

const showEditModal = ref<Boolean>(false);

const currentRole = ref<Role>({
  roleCode: null,
  roleName: null,
  description: null,
});

function editRole(role: Role) {
  // 更新一定要拷贝值
  roleApi
    .update(role)
    .then(() => {
      message.success("更新成功");
      fetchRoles({ roleCode: null, roleName: null });
    })
    .catch(() => {
      message.error("更新失败");
    });
  showEditModal.value = false;
  
}

function createRole(role: Role) {
  roleApi
    .create(role)
    .then(() => {
      message.success("新增成功");
      fetchRoles({ roleCode: null, roleName: null });
    })
    .catch(() => {
      message.error("新增失败");
    });
  showEditModal.value = false;
}

function openCreateModal() {
  currentRole.value = {
    id: null,
    roleCode: null,
    roleName: null,
    description: null,
  };
  showEditModal.value = true;
}

function handleShow(value: boolean) {
  showEditModal.value = value;
}

// modal end

const searchParams = ref<RoleSearchParams>({ roleCode: null, roleName: null });

const tableDataRef = ref([]);
const loading = ref(false);

interface PageParam {
  page: number;
  pageCount: number;
  pageSize: number;
  prefix: any;
}

const paginationRef = reactive<PageParam>({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix: ({ itemCount }) => {
    return `Total is ${itemCount}.`;
  },
});
const openEditModal = (row) => {
  currentRole.value = { ...row };
  showEditModal.value = true;
};
const deleteItem = (roleId: number) => {
  roleApi
    .delete(roleId)
    .then(() => {
      message.success("删除成功");
    })
    .catch(() => {
      message.error("删除失败");
    });
  fetchRoles({ roleCode: null, roleName: null });
};

const columns = getTableColumns(openEditModal, deleteItem);

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchRoles({
    current: currentPage,
    ...searchParams.value,
  });
}

function onSearch() {
  fetchRoles(searchParams.value);
}

function onReset() {
  searchParams.value = { roleCode: null, roleName: null };
  fetchRoles(searchParams.value);
}

function fetchRoles(param) {
  console.log("获取角色", param);
  roleApi.read(paginationRef, param, tableDataRef, loading);
}

fetchRoles({});
</script>
