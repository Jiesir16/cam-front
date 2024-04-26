import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

export interface CategoryInfo {
  id?: number | null;
  categoryCode?: number | null;
  categoryName?: String | null;
}

export interface CategorySearchParams {
  categoryCode: String | null;
  categoryName: String | null;
}

export default {
  create: (data: CategoryInfo) => restfulApi.post("/activity/category", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: CategorySearchParams,
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
      .get("/activity/category", { ...params })
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
  update: (data: CategoryInfo) => restfulApi.patch(`/activity/category/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/activity/category/${id}`),
};
