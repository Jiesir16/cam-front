<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success"
        >场地预订申请记录</n-gradient-text
      >
    </n-flex>
  </n-flex>
  <n-flex vertical style="margin: 12px; padding: 24px">
    <n-form @submit.prevent="onSearch" ref="searchForm">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi label="场地名称" :span="4">
          <n-input
            v-model:value="searchParams.venueName"
            placeholder="请输入场地名称"
          />
        </n-form-item-gi>
        <n-form-item-gi label="场地状态" :span="4">
          <n-select
            v-model:value="searchParams.venueStatus"
            :options="venueStatusOptions"
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
import { getTableColumns } from "./venueReserveColumns";
import venueApi, {
  VenueSearchParams,
} from "@/views/venue/venueReserveAuditApi.ts";
import router from "@/router";

const venueStatusOptions = ref([
  { label: "开放中", value: "open" },
  { label: "已关闭", value: "closed" },
]);

const searchParams = ref<VenueSearchParams>({
  venueName: null,
  venueStatus: null,
});

function onSearch() {
  fetchVenues(searchParams.value);
}

function onReset() {
  searchParams.value = { venueName: null, venueStatus: null };
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

function handleReserve(id: String) {
  router.push({ path: `/dashboard/venue/reserve/detail/${id}` });
}

const columns = getTableColumns(handleReserve);

// 分页按钮
function handlePageChange(currentPage: number) {
  fetchVenues({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchVenues(param) {
  console.log("获取场地", param);
  venueApi.read(paginationRef, param, tableData, loading);
}

fetchVenues(searchParams.value);
</script>
