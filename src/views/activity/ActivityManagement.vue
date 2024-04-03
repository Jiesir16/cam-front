<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
      <n-flex style="height: 50px" align="center">
          <n-gradient-text :size="22" type="success">活动管理</n-gradient-text>
      </n-flex>

      <n-flex>
          <n-button @click="openCreateModal" ghost round type="primary">
              <n-icon>
                  <PersonAddOutline />
              </n-icon>
        新建活动
          </n-button>
      </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
      <n-form @submit.prevent="onSearch" ref="searchForm" inline>
          <n-form-item label="活动名称">
              <n-input
                  v-model:value="searchParams.permCode"
                  placeholder="请输入活动名称"
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
      <ActityEditModal
          v-model:show="showEditModal"
          v-model:permissionInfo="currentPermission"
          @edit="editActivity"
          @create="createActivity"
          @update:show="handleShow"
          />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./activityTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import activityApi, {
    Activity,
    PermissionSearchParams,
} from "./activityApi";
import ActityEditModal from "./ActityEditModal.vue";
import { useMessage } from "naive-ui";

const message = useMessage();
const searchParams = ref<PermissionSearchParams>({
    permCode: null,
    permName: null,
});

function onSearch() {
    fetchActivities(searchParams.value);
}

function onReset() {
    searchParams.value = { permCode: null, permName: null };
    fetchActivities(searchParams.value);
}

// modal start

const showEditModal = ref<boolean>(false);

const currentActivity = ref<Activity>({
    id: null,
    parentId: null,
    permCode: null,
    permName: null,
    description: null,
});

function handleShow(value: boolean) {
    showEditModal.value = value;
}

function editActivity(perm: Activity) {
    activityApi
    .update(perm)
    .then(() => {
        message.success("更新成功");
        fetchActivities({ permCode: null, permName: null });
    })
    .catch(() => {
        message.success("更新失败");
    });
    showEditModal.value = false;
}

function createActivity(perm: Activity) {
    activityApi
    .create(perm)
    .then(() => {
        message.success("新增成功");
        fetchActivities({ permCode: null, permName: null });
    })
    .catch(() => {
        message.success("新增失败");
    });
    showEditModal.value = false;
}

function openCreateModal() {
    currentActivity.value = {
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

const openEditModal = (row: Activity) => {
    showEditModal.value = true;
    currentActivity.value = {
        id: row.id,
        parentId: row.parentId,
        permCode: row.permCode,
        permName: row.permName,
        description: row.description,
    };
};
const deleteItem = (id: number) => {
    activityApi
    .delete(id)
    .then(() => {
        message.success("删除成功");
        fetchActivities({ permCode: null, permName: null });
    })
    .catch(() => {
        message.success("删除失败");
    });
};

const columns = getTableColumns(openEditModal, deleteItem);

// 分页按钮
function handlePageChange(currentPage: number) {
    fetchActivities({
        current: currentPage,
        ...searchParams.value,
    });
}

function fetchActivities(param) {
    console.log("获取权限", param);
    activityApi.read(paginationRef, searchParams.value, tableData, loading);
}

fetchActivities(searchParams.value);
</script>
