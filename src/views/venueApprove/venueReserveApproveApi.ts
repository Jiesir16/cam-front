import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api";
import {UploadFileInfo} from "naive-ui";

export interface VenueInfo {
  id?: number | null;
  venueName?: number | null;
  venueType?: String | null;
  venueLocation?: String | null;
  venueStatus?: String | null;
  availableTimeStart?: String | null;
  availableTimeEnd?: String | null;
  contactPerson?: String | null;
  contactEmail?: String | null;
  contactPhone?: String | null;
  venueDetail?: String | null;
  capacity?: number | null;
  venueImg: string | null | undefined;
  fileList?: Array<UploadFileInfo>;
}

export interface VenueSearchParams {
  venueName: String | null;
  venueType?: String | null;
  venueStatus: String | null;
}

export default {
  create: (data: VenueInfo) => restfulApi.post("/venue", data),
  read: async (
    pagination: {
      page: number;
      pageCount?: number;
      itemCount?: number;
    },
    searchParams: VenueSearchParams,
    tableDataRef,
    loading,
  ) => {
    let params = {
      current: pagination.page,
      size: 5,
      ...searchParams,
    };
    loading.value = true;
    restfulApi
      .get("/venue/reserve/approve", { ...params })
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
  update: (data: VenueInfo) => restfulApi.patch(`/venue/${data.id}`, data),
  delete: (id: number) => restfulApi.delete(`/venue/${id}`),
};
