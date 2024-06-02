import { h } from "vue";
import { NButton, NIcon, NImage, NPopconfirm, NTag } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";
import { Edit } from "@vicons/carbon";

const formatAuditStatus = (auditStatus) => {
  switch (auditStatus) {
    case "0": {
      return h(
        NTag,
        {
          style: {
            marginRight: "6px",
          },
          type: "info",
          bordered: false,
        },
        {
          default: () => "待审核",
        },
      );
    }
    case "1": {
      return h(
        NTag,
        {
          style: {
            marginRight: "6px",
          },
          type: "success",
          bordered: false,
        },
        {
          default: () => "审核通过",
        },
      );
    }
    case "2": {
      return h(
        NTag,
        {
          style: {
            marginRight: "6px",
          },
          type: "error",
          bordered: false,
        },
        {
          default: () => "审核拒绝",
        },
      );
    }
    default: {
      return h(
        NTag,
        {
          style: {
            marginRight: "6px",
          },
          type: "info",
          bordered: false,
        },
        {
          default: () => auditStatus,
        },
      );
    }
  }
};
export const getTableColumns = (
  deleteItem: Function,
) => [
  {
    title: "场地名称",
    key: "venueName",
    align: "center",
    fixed: "left",
  },
  {
    title: "审批状态",
    key: "auditStatus",
    align: "center",
    render(row) {
      return formatAuditStatus(row.auditStatus);
    },
  },
  {
    title: "场地位置",
    key: "venueLocation",
    align: "center",
  },
  {
    title: "申请预定开始时间",
    key: "startDateTime",
    align: "center",
  },
  {
    title: "申请预定结束时间",
    key: "endDateTime",
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
    title: "操作",
    key: "actions",
    align: "center",
    fixed: "right",
    render(row) {
      return [
        h(
          NPopconfirm,
          {
            negativeText: "取消",
            positiveText: "确定",
            onPositiveClick: () => deleteItem(row.id),
          },
          {
            default: () => "确定取消吗？",
            trigger: () =>
              h(
                NButton,
                { text: true, type: "error" },
                {
                  default: () => [
                    h(NIcon, null, { default: () => h(TrashOutline) }),
                    " 取消预定",
                  ],
                },
              ),
          },
        ),
      ];
    },
  },
];
