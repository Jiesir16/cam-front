import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  openEditModal: Function,
  deleteItem: Function,
) => [
  {
    title: "活动名称",
    key: "activityName",
    align: "center",
  },
  {
    title: "活动类型",
    key: "activityType",
    align: "center",
  },
  {
    title: "活动开始时间",
    key: "beginDatetime",
    align: "center",
  },
  {
    title: "活动结束时间",
    key: "endDatetime",
    align: "center",
  },
  {
    title: "报名截止时间",
    key: "enrollDeadline",
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
