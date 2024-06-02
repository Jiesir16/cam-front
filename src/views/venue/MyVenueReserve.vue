<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">我的申请</n-gradient-text>
    </n-flex>

    <n-flex></n-flex>
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
      :scroll-x="1800"
      :loading="loading"
      resizable
    />
    <!--<n-modal-->
    <!--  v-model:show="showModal"-->
    <!--  :mask-closable="false"-->
    <!--  preset="dialog"-->
    <!--  title="删除"-->
    <!--  content="是否确认删除"-->
    <!--  positive-text="是"-->
    <!--  negative-text="否"-->
    <!--  @positive-click="onPositiveClick"-->
    <!--  @negative-click="onNegativeClick"-->
    <!--/>-->
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import venueApi, { VenueInfo, VenueSearchParams } from "@/views/venue/myVenueReserveApi.ts";
import { getTableColumns } from "./myVenueReserveTableColumns.ts";
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
  pageSize: 5,
  prefix: ({ itemCount }) => {
    return `Total is ${itemCount}.`;
  },
});

const searchParams = ref<VenueSearchParams>({
  venueName: null,
  venueStatus: null,
  venueType: null,
});

function onSearch() {
  fetchVenues(searchParams.value);
}

function onReset() {
  searchParams.value = { venueName: null, venueStatus: null, venueType: null };
  fetchVenues(searchParams.value);
}

const deleteItem = (id: number) => {
  //  venueApi
  //    .delete(id)
  //    .then(() => {
  //      message.success("删除成功");
  //      fetchVenues({ permCode: null, permName: null });
  //    })
  //    .catch(() => {
  //      message.success("删除失败");
  //    });
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
  venueApi.read(paginationRef, param, tableData, loading);
}

fetchVenues(searchParams.value);

</script>
