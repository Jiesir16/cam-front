<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">活动管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="handleApply" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        申请活动
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
  </n-flex>

  <n-modal :show="auditModalShowRef">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>活动审核</template>
      <n-form ref="editForm" label-align="left">
        <n-input-number v-model:value="auditInfo.id" v-show="false" />
        <!-- 表单内容，例如： -->
        <n-form-item label="审核意见:">
          <n-input
            v-model:value="auditInfo.auditComment"
            placeholder="请输入审核意见"
          />
        </n-form-item>
        <n-form-item label="审核结果:">
          <n-radio-group
            v-model:value="auditInfo.auditStatus"
            name="auditStatusGroup"
          >
            <n-flex>
              <n-radio value="1"> 通过</n-radio>
              <n-radio value="2"> 拒绝</n-radio>
            </n-flex>
          </n-radio-group>
        </n-form-item>

        <!-- 其他表单项 -->
      </n-form>
      <template #action>
        <n-flex justify="end">
          <n-button @click="handleClose">取消</n-button>
          <n-button @click="handleSubmit" type="primary">提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./activityTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import activityApi, { PermissionSearchParams } from "./activityApi";
import { useMessage } from "naive-ui";
import router from "@/router";
import { restfulApi } from "@/axios";

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

function handleApply() {
  router.push({ name: "activity:apply" });
}

const tableData = ref([]);
const loading = ref(false);
const auditInfo = ref({ id: null, auditComment: null, auditStatus: null });
const auditModalShowRef = ref(false);

function handleClose() {
  auditModalShowRef.value = false;
  auditInfo.value = { id: null, auditComment: null, auditStatus: null };
}

function handleSubmit() {
  auditModalShowRef.value = false;

  restfulApi.post("/activity/audit", { ...auditInfo.value }).then((res) => {
    message.success("审批成功");
    auditInfo.value = { id: null, auditComment: null, auditStatus: null };
  });
}


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

const openAuditModal = (row) => {
  auditInfo.value = {
    id: row.id,
    auditComment: null,
    auditStatus: null
  };
  auditModalShowRef.value = true;
};
const columns = getTableColumns(deleteItem,openAuditModal);

// 分页按钮
function handlePageChange(currentPage: number) {
  console.log("[currentPage]",currentPage);
  fetchActivities({
    current: currentPage,
    ...searchParams.value,
  });
}

function fetchActivities(param) {
  console.log("获取活动", param);
  activityApi.read(paginationRef, param, tableData, loading);
}

fetchActivities(searchParams.value);
</script>
