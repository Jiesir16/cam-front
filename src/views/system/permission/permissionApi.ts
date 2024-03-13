import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

export interface Permission {
  id?: number | null;
  parentId: number | null;
  permCode: String | null;
  permName: String | null;
  description?: String | null;
}

export interface PermissionSearchParams {
  permCode: String | null;
  permName: String | null;
}

export default {
  create: (data: Permission) => restfulApi.post("/perm", data),
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
      .get("/perm", { ...params })
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
  update: (data: Permission) => restfulApi.patch(`/perm/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/perm/${id}`),
};
