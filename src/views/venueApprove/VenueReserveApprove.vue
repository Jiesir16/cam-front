<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">场地审批预约</n-gradient-text>
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
  </n-flex>

  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>场地预定审批</template>
      <n-input-number v-model:value="approveInfo.id" v-show="false" />
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="审批意见">
          <n-input
            v-model:value="approveInfo.comments"
            type="textarea"
            placeholder="请输入审批意见"
          />
        </n-form-item>
        <n-form-item label="审批结果">
          <n-radio-group v-model:value="approveInfo.status">
            <n-space>
              <n-radio value="1"> 通过 </n-radio>
              <n-radio value="2"> 拒绝 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <!-- 其他表单项 -->
      </n-form>
      <template #action>
        <n-flex justify="end">
          <n-button @click="handleCancel">取消</n-button>
          <n-button @click="handleSubmit" type="primary">提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import venueApi, {VenueSearchParams} from "./venueReserveApproveApi.ts";
import { getTableColumns } from "./venueReserveApproveTableColumns.ts";
import {  restfulApi  } from "@/axios";
import {  message  } from "@/plugins/naive-ui-discrete-api.ts";


const tableData = ref([]);
const loading = ref(false);

interface PageParam {
  page: number;
  pageCount: number;
  pageSize: number;
  prefix: any;
}

const show = ref(false);
const approveInfo = ref({  id: null,  comments: null,  status: null  });

function handleCancel() {
  show.value = false;
  approveInfo.value = {  id: null,  comments: null,  status: null  };
}

function handleClose() {
  show.value = false;
  approveInfo.value = {  id: null,  comments: null,  status: null  };
}

function handleSubmit() {
  let data = {  processId: approveInfo.value.id,  status: approveInfo.value.status }
  restfulApi.post("/approve/process",  data).then(() => {
    message.success("审批成功")
  })
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

const openModal = (id: number) => {
  approveInfo.value = { id: id, comments:null,  status: null }
  show.value = true;
};
const columns = getTableColumns(openModal);

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
