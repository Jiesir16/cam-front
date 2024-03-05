<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="24" type="success">权限管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新建权限
      </n-button>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm" inline>
      <n-form-item label="权限编码">
        <n-input
          v-model:value="searchParams.permCode"
          placeholder="请输入权限编码"
        />
      </n-form-item>
      <n-form-item label="权限名称">
        <n-input
          v-model:value="searchParams.permName"
          placeholder="请输入权限名称"
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
      :data="tableData"
      :pagination="paginationRef"
      @update:page="handlePageChange"
      :loading="loading"
      resizable
    />
    <PermissionEditModal
      v-model:show="showEditModal"
      v-model:permission-info="currentPermission"
      @edit="editPermission"
      @create="createPermission"
      @update:show="handleShow"
    />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./permissionTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import permissionApi, {
  Permission,
  PermissionSearchParams,
} from "@/views/system/permission/permissionApi";
import PermissionEditModal from "./PermissionEditModal.vue";
import { useMessage } from "naive-ui";

const message = useMessage();
const searchParams = ref<PermissionSearchParams>({
  permCode: null,
  permName: null,
});

function onSearch() {
  fetchPermissions(searchParams.value);
}

function onReset() {
  searchParams.value = { permCode: null, permName: null };
  fetchPermissions(searchParams.value);
}

// modal start

const showEditModal = ref<Boolean>(false);
const currentPermission = ref<Permission>();

function handleShow(value) {
  showEditModal.value = value;
}

function editPermission(perm: Permission) {
  permissionApi
    .update(perm)
    .then(() => {
      message.success("更新成功");
      fetchPermissions({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("更新失败");
    });
  showEditModal.value = false;
}

function createPermission(perm: Permission) {
  permissionApi
    .create(perm)
    .then(() => {
      message.success("新增成功");
      fetchPermissions({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("新增失败");
    });
  showEditModal.value = false;
}

function openCreateModal() {
  currentPermission.value = {
    permCode: null,
    parentId: null,
    permName: null,
    description: null,
  };
  showEditModal.value = true;
}

// modal end

const tableData = ref([]);
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
  currentPermission.value = { ...row };
  showEditModal.value = true;
};
const deleteItem = (id: number) => {
  permissionApi
    .delete(id)
    .then(() => {
      message.success("删除成功");
      fetchPermissions({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("删除失败");
    });
};

const columns = getTableColumns(openEditModal, deleteItem);

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchPermissions({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchPermissions(param) {
  console.log("获取权限", param);
  permissionApi.read(paginationRef, searchParams.value, tableData, loading);
}

fetchPermissions(searchParams.value);
</script>
