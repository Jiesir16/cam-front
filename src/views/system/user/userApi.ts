import { restfulApi } from "@/axios";

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
  ) => {
    try {
      let params = {
        current: pagination.page,
        size: 10,
        ...searchParams,
      };
      const response = await restfulApi.get("/user", { ...params }); // 确保 URL 和参数传递正确

      // 假设响应数据的结构如下：{ data: { total: number, page: number, records: Array }}
      pagination.itemCount = response.data.total;
      pagination.pageCount = response.data.page;
      pagination.page = params.current ? params.current : 1;
      tableDataRef.value = response.data.records;
    } catch (error) {
      console.error(error);
      pagination.itemCount = 0;
    }
  },
  update: (data: UserData) => restfulApi.patch(`/user/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/user/${id}`),
  resetPwd: (id: number, data: UserData) =>
    restfulApi.patch(`/user/password/reset/${id}`, data),
};
