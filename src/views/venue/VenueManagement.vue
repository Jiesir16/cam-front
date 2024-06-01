<template>
  <n-flex justify="space-between" align="center" style="padding: 0 24px">
    <n-flex style="height: 50px" align="center">
      <n-gradient-text :size="22" type="success">场地管理</n-gradient-text>
    </n-flex>

    <n-flex>
      <n-button @click="openCreateModal" ghost round type="primary">
        <n-icon>
          <PersonAddOutline />
        </n-icon>
        新增场地
      </n-button>
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
      :scroll-x="1800"
      :loading="loading"
      resizable
    />
    <VenueEditModal
      v-model:show="showEditModal"
      v-model:venueInfo="currentVenue"
      @edit="editVenue"
      @create="createVenue"
      @update:show="handleShow"
    />
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      title="删除"
      content="是否确认删除"
      positive-text="是"
      negative-text="否"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    />
  </n-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTableColumns } from "./venueTableColumns";
import { PersonAddOutline } from "@vicons/ionicons5";
import venueApi, { VenueInfo, VenueSearchParams } from "@/views/venue/venueApi";
import { useMessage } from "naive-ui";
import VenueEditModal from "@/views/venue/VenueEditModal.vue";
import router from "@/router";

const message = useMessage();

const showModal = ref(false);
const venueStatusOptions = ref([
  { label: "开放中", value: "open" },
  { label: "已关闭", value: "closed" },
]);

function handleReserve(id: String) {
  router.push({ path: `/dashboard/venue/reserve/detail/${id}` });
}

function onNegativeClick() {
  message.success("Cancel");
  showModal.value = false;
}

function onPositiveClick() {
  message.success("Submit");
  showModal.value = false;
}

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

// modal start

const showEditModal = ref<boolean>(false);

const currentVenue = ref<VenueInfo>({
  id: null,
  venueName: null,
  venueType: null,
  venueLocation: null,
  venueStatus: null,
  capacity: null,
  availableTimeStart: null,
  availableTimeEnd: null,
  contactPerson: null,
  contactEmail: null,
  contactPhone: null,
  venueDetail: null,
  venueImg: null,
});

function handleShow(value: boolean) {
  showEditModal.value = value;
}

function editVenue(venue: VenueInfo) {
  venueApi
    .update(venue)
    .then(() => {
      message.success("更新成功");
      fetchVenues({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("更新失败");
    });
  showEditModal.value = false;
}

function createVenue(venue: VenueInfo) {
  venueApi
    .create(venue)
    .then(() => {
      message.success("新增成功");
      fetchVenues({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("新增失败");
    });
  showEditModal.value = false;
}

function openCreateModal() {
  currentVenue.value = {
    id: null,
    venueName: null,
    venueType: null,
    venueLocation: null,
    venueStatus: null,
    capacity: null,
    venueDetail: null,
    venueImg: null,
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
  pageSize: 5,
  prefix: ({ itemCount }) => {
    return `Total is ${itemCount}.`;
  },
});

const openEditModal = (row: VenueInfo) => {
  currentVenue.value = {
    id: row.id,
    venueName: row.venueName,
    venueType: row.venueType,
    venueLocation: row.venueLocation,
    venueStatus: row.venueStatus,
    availableTimeStart: row.availableTimeStart,
    availableTimeEnd: row.availableTimeEnd,
    venueImg: row.venueImg,
    capacity: row.capacity,
    contactPerson: row.contactPerson,
    contactEmail: row.contactEmail,
    contactPhone: row.contactPhone,
    venueDetail: row.venueDetail,
    fileList:
      row.venueImg !== null
        ? [
            {
              id: "123",
              name: "123",
              batchId: "123",
              percentage: 100,
              status: "finished",
              url: row.venueImg,
            },
          ]
        : [],
  };
  showEditModal.value = true;
};
const deleteItem = (id: number) => {
  venueApi
    .delete(id)
    .then(() => {
      message.success("删除成功");
      fetchVenues({ permCode: null, permName: null });
    })
    .catch(() => {
      message.success("删除失败");
    });
};

const columns = getTableColumns(openEditModal, deleteItem, handleReserve);

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
