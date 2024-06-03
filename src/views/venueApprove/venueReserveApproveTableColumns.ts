import { h } from "vue";
import { NButton, NGradientText, NIcon, NImage, NTag } from "naive-ui";
import { TaskApproved } from "@vicons/carbon";

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
          default: () => "待审批",
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
          default: () => "审批通过",
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
          default: () => "审批拒绝",
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
export const getTableColumns = (openModal: Function) => [
  {
    title: "场地名称",
    key: "venueName",
    align: "center",
    fixed: "left",
  },
  {
    title: "审批状态",
    key: "status",
    align: "center",
    render(row) {
      return formatAuditStatus(row.status);
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
      if (row.status !== "0") {
        return [
          h(
            NGradientText,
            {
              type: "success",
            },
            {
              default: "已审批",
            },
          ),
        ];
      } else {
        if (row.currentStep === row.stepNumber) {
          return [
            h(
              NButton,
              {
                text: true,
                type: "info",
                onClick: () => openModal(row.processId),
              },
              {
                default: () => [
                  h(NIcon, null, { default: () => h(TaskApproved) }),
                  " 审批",
                ],
              },
            ),
          ];
        } else {
          return [
            h(
              NGradientText,
              {
                type: "warning",
              },
              {
                default: "等待前置审批",
              },
            ),
          ];
        }
      }
    },
  },
];
