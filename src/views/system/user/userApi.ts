import { restfulApi } from "@/axios";
import {Role} from "@/views/system/role/roleApi.ts";

export interface UserSearchParam {
  username: String | null;
  email: String | null;
}

interface UserData {
  id: number;
  activated: boolean;
  roles?: Array<Role>;
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
      });
  },
  update: (data: UserData) => restfulApi.patch(`/user/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/user/${id}`),
  resetPwd: (id: number, data: UserData) =>
    restfulApi.patch(`/user/password/reset/${id}`, data),
};
