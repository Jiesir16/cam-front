import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

export interface EnrollInfo {
  id?: number | null;
  userId?: number | null;
  activityId?: number | null;
  activityName?: String | null;
  name?: String | null;
  email?: String | null;
  createTime?: String | null;
}

export interface EnrollSearchParams {
  activityName: null;
  name: null;
  account: null;
}

export default {
  create: (data: EnrollInfo) => restfulApi.post("/enroll", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: EnrollSearchParams,
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
      .get("/enroll", { ...params })
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
  unEnroll: (data: EnrollInfo) => restfulApi.put(`/enroll`, data),
  update: (data: EnrollInfo) => restfulApi.patch(`/enroll/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/enroll/${id}`),
};
