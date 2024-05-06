import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";

export interface FeedbackInfo {
  id?: number | null;
  feedbackCreator?: number | null;
  feedbackContent?: String | null;
  feedbackType?: String | null;
}

export interface FeedbackSearchParams {
  feedbackType: String | null;
}

export default {
  create: (data: FeedbackInfo) => restfulApi.post("/feedback", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: FeedbackSearchParams,
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
      .get("/feedback", { ...params })
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
  update: (data: FeedbackInfo) =>
    restfulApi.patch(`/feedback/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/feedback/${id}`),
};
