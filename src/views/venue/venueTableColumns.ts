import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  openEditModal: Function,
  deleteItem: Function,
) => [
  {
    title: "场地名称",
    key: "venueName",
    align: "center",
  },
  {
    title: "场地类型",
    key: "venueType",
    align: "center",
  },
  {
    title: "场地位置",
    key: "venueLocation",
    align: "center",
  },
  {
    title: "场地状态",
    key: "venueStatus",
    align: "center",
  },
  {
    title: "开放时间",
    key: "openTime",
    align: "center",
  },
  {
    title: "场地图片",
    key: "venueIsmg",
    align: "center",
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
    title: "Actions",
    key: "actions",
    align: "center",
    render(row) {
      return [
        h(
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => openEditModal(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(LayersOutline) }),
              " Edit",
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
              " Delete",
            ],
          },
        ),
      ];
    },
  },
];
