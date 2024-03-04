import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

interface UserData {
  id: number;
  activated: boolean;
  // 其他字段...l
}

interface Params {
  current?: number;
  size?: number;

  [key: string]: any; // 允许 Params 包含任意额外属性
}

export default {
  create: (data: UserData) => restfulApi.post("/user", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: Params,
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
      .get("/user", { ...params })
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
        message.error("系统异常");
      });
  },
  update: (data: UserData) => restfulApi.patch(`/user/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/user/${id}`),
  resetPwd: (id: number, data: UserData) =>
    restfulApi.patch(`/user/password/reset/${id}`, data),
};
