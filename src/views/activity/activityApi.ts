import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

export interface Activity {
  id?: number | null;
  activityName: String | null;
  activityAddress: String | null;
  activityType: String | null;
  activityAddition?: String | null;
  beginDatetime?: String | null;
  endDatetime?: String | null;
  enrollDeadline?: String | null;
  activityBrief?: String | null;
  enrollment?: number | null;
  dateTimeRange?: Array<number| null> | null;
}

export interface PermissionSearchParams {
  permCode: String | null;
  permName: String | null;
}

export default {
  create: (data: Activity) => restfulApi.post("/activity", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: PermissionSearchParams,
    tableDataRef,
    loading,
  ) => {
    let params = {
      current: pagination.page,
      size: 10,
      ...searchParams,
    };
    loading.value = true;
    restfulApi
      .get("/activity/page", { ...params })
      .then((response) => {
        setTimeout(() => {
          pagination.itemCount = response.data.total;
          pagination.pageCount = response.data.page;
          pagination.page = params.current ? params.current : 1;
          tableDataRef.value = response.data.records;
          loading.value = false;
        }, 300);
        // 假设响应数据的结构如下：{ data: { total: number, page: number, records: Array }}
      })
      .catch((error) => {
        console.error(error);
        tableDataRef.value = [];
        pagination.itemCount = 0;
        loading.value = false;
        message.error("系统异常,请联系管理员");
      });
  },
  update: (data: Activity) => restfulApi.patch(`/activity/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/activity/${id}`),
};
