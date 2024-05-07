<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">
        活动报名管理
      </n-gradient-text>
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi label="活动名称" :span="4">
          <n-input
            v-model:value="searchParams.activityName"
            placeholder="请输入活动名称"
          />
        </n-form-item-gi>
        <n-form-item-gi label="姓名" :span="4">
          <n-input v-model:value="searchParams.name" placeholder="请输入姓名" />
        </n-form-item-gi>
        <n-form-item-gi label="学号" :span="4">
          <n-input
            v-model:value="searchParams.account"
            placeholder="请输入学号"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="1">
          <n-button type="primary" attr-type="submit">搜索</n-button>
        </n-form-item-gi>
        <n-form-item-gi :span="1">
          <n-button @click="onReset">重置</n-button>
        </n-form-item-gi>
        <n-form-item-gi :span="8">
        </n-form-item-gi>
        <n-form-item-gi :span="1">
          <n-button @click="handleExport" type="info">导出报名名单</n-button>
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
import { getTableColumns } from "./enrollTableColumns";
import { useMessage } from "naive-ui";
import enrollApi, {
  EnrollInfo,
  EnrollSearchParams,
} from "@/views/enroll/enrollApi.ts";
import { restfulApi } from "@/axios";

const message = useMessage();

const searchParams = ref<EnrollSearchParams>({
  activityName: null,
  name: null,
  account: null,
});

function onSearch() {
  fetchEnrolls(searchParams.value);
}

function onReset() {
  searchParams.value = { activityName: null, name: null, account: null };
  fetchEnrolls(searchParams.value);
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

const handleUnEnroll = (row: EnrollInfo) => {
  enrollApi
    .unEnroll(row)
    .then(() => {
      message.success("取消成功");
      fetchEnrolls({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("取消失败");
    });
};

const columns = getTableColumns(handleUnEnroll);

function handleExport() {
  restfulApi.downloadExcel("/enroll/export", searchParams.value );
}

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchEnrolls({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchEnrolls(param) {
  console.log("获取场地", param);
  enrollApi.read(paginationRef, param, tableData, loading);
}

fetchEnrolls(searchParams.value);
</script>
