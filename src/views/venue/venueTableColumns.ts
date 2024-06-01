import { h } from "vue";
import { NButton, NIcon, NImage } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";
import { Edit } from "@vicons/carbon";
const formatStatus = (status) => {
  if (status === "open") {
    return "开放中";
  } else if (status === "closed") {
    return "已关闭";
  } else {
    return status;
  }
};
export const getTableColumns = (
  openEditModal: Function,
  deleteItem: Function,
  reserve: Function,
) => [
  {
    title: "场地名称",
    key: "venueName",
    align: "center",
    fixed: "left",
  },
  {
    title: "场地类型",
    key: "venueType",
    align: "center",
  },
  {
    title: "场地状态",
    key: "venueStatus",
    align: "center",
    render(row) {
      return formatStatus(row.venueStatus);
    },
  },
  {
    title: "场地位置",
    key: "venueLocation",
    align: "center",
  },
  {
    title: "开放开始时间",
    key: "availableTimeStart",
    align: "center",
  },
  {
    title: "开放截止时间",
    key: "availableTimeEnd",
    align: "center",
  },
  {
    title: "可容纳人数",
    key: "capacity",
    align: "center",
  },
  {
    title: "联系人",
    key: "contactPerson",
    align: "center",
  },
  {
    title: "联系人邮箱",
    key: "contactEmail",
    align: "center",
  },
  {
    title: "联系人手机",
    key: "contactPhone",
    align: "center",
  },
  {
    title: "场地图片",
    key: "venueImg",
    align: "center",
    render(row) {
      return [
        h(NImage, {
          text: true,
          src: row.venueImg,
          lazy: true,
          width: 100,
        }),
      ];
    },
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
  },
  {
    title: "修改时间",
    key: "updateTime",
    align: "center",
  },
  {
    title: "操作",
    key: "actions",
    align: "center",
    fixed: "right",
    render(row) {
      return [
        h(
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => reserve(row.id),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(LayersOutline) }),
              "预订记录",
            ],
          },
        ),
        h(
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => openEditModal(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(Edit) }),
              " 编辑",
            ],
          },
        ),
        h(
          NButton,
          {
            text: true,
            type: "error",
            onClick: () => deleteItem(row.id),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(TrashOutline) }),
              " 删除",
            ],
          },
        ),
      ];
    },
  },
];
