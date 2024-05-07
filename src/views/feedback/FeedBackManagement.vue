<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success"
        >留言与反馈管理
      </n-gradient-text>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi label="问题类型" :span="4">
          <n-select
            v-model:value="searchParams.feedbackType"
            :options="feedbackTypeOptions"
            placeholder="请选择"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="1">
          <n-button type="primary" attr-type="submit">搜索</n-button>
        </n-form-item-gi>
        <n-form-item-gi :span="1">
          <n-button @click="onReset">重置</n-button>
        </n-form-item-gi>
      </n-grid>
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
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./feedbackTableColumns";
import { useMessage } from "naive-ui";
import feedbackApi, {
  FeedbackSearchParams,
} from "@/views/feedback/feedbackApi.ts";

const message = useMessage();

const feedbackTypeOptions = ref([
  { label: "功能欠缺/不好用", value: "1" },
  { label: "页面效果", value: "2" },
  { label: "一点建议", value: "3" },
  { label: "其他方面", value: "4" },
]);

const searchParams = ref<FeedbackSearchParams>({
  feedbackType: null,
});

function onSearch() {
  fetchVenues(searchParams.value);
}

function onReset() {
  searchParams.value = { feedbackType: null };
  fetchVenues(searchParams.value);
}

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

const deleteItem = (id: number) => {
  feedbackApi
    .delete(id)
    .then(() => {
      message.success("删除成功");
      fetchVenues({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("删除失败");
    });
};

const columns = getTableColumns(deleteItem);

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchVenues({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchVenues(param) {
  console.log("获取场地", param);
  feedbackApi.read(paginationRef, param, tableData, loading);
}

fetchVenues(searchParams.value);
</script>
