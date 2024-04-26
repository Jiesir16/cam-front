<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动种类管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新增种类
      </n-button>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm" inline>
      <n-form-item label="活动种类名称">
        <n-input
          v-model:value="searchParams.categoryName"
          placeholder="请输入场地名称"
        />
      </n-form-item>
      <n-form-item label="活动种类编码">
        <n-input
          v-model:value="searchParams.categoryCode"
          placeholder="请输入场地名称"
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
    <CategoryEditModal
      v-model:show="showEditModal"
      v-model:category-info="currentCategory"
      @edit="editVenue"
      @create="createVenue"
      @update:show="handleShow"
    />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./categoryTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import venueApi, {
  CategoryInfo,
  CategorySearchParams,
} from "@/views/activityCategory/categoryApi";
import { useMessage } from "naive-ui";
import CategoryEditModal from "@/views/activityCategory/CategoryEditModal.vue";

const message = useMessage();
const searchParams = ref<CategorySearchParams>({
  categoryCode: null,
  categoryName: null,
});

function onSearch() {
  fetchCategories(searchParams.value);
}

function onReset() {
  searchParams.value = { categoryCode: null, categoryName: null };
  fetchCategories(searchParams.value);
}

// modal start

const showEditModal = ref<boolean>(false);

const currentCategory = ref<CategoryInfo>({
  id: null,
  categoryCode: null,
  categoryName: null,
});

function handleShow(value: boolean) {
  showEditModal.value = value;
}

function editVenue(perm: CategoryInfo) {
  venueApi
    .update(perm)
    .then(() => {
      message.success("更新成功");
      fetchCategories({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("更新失败");
    });
  showEditModal.value = false;
}

function createVenue(venue: CategoryInfo) {
  venueApi
    .create(venue)
    .then(() => {
      message.success("新增成功");
      fetchCategories({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("新增失败");
    });
  showEditModal.value = false;
}

function openCreateModal() {
  currentCategory.value = {
    id: null,
    categoryCode: null,
    categoryName: null,
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

const openEditModal = (row: CategoryInfo) => {
  showEditModal.value = true;
  currentCategory.value = {
    id: row.id,
    categoryCode: row.categoryCode,
    categoryName: row.categoryName,
  };
};
const deleteItem = (id: number) => {
  venueApi
    .delete(id)
    .then(() => {
      message.success("删除成功");
      fetchCategories({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("删除失败");
    });
};

const columns = getTableColumns(openEditModal, deleteItem);

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchCategories({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchCategories(param) {
  console.log("获取场地", param);
  venueApi.read(paginationRef, searchParams.value, tableData, loading);
}

fetchCategories(searchParams.value);
</script>
