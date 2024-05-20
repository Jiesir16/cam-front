import { h } from "vue";
import { NButton, NIcon, NImage, NPopconfirm, NTag } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

const formatType = (type) => {
  if (type === "online") {
    return "线上活动";
  } else if (type === "offline") {
    return "线下活动";
  } else {
    return type;
  }
};
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
  openAuditModal: Function,
  handleDetail: Function,
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
    render(row) {
      return formatType(row.activityType);
    },
  },
  {
    title: "活动封面",
    key: "activityImg",
    align: "center",
    render(row) {
      return [
        h(NImage, {
          text: true,
          src: row.activityImg,
          lazy: true,
          width: 100,
        }),
      ];
    },
  },
  {
    title: "活动场地",
    key: "venueName",
    align: "center",
  },
  {
    title: "活动种类",
    key: "categoryName",
    align: "center",
  },
  {
    title: "可报名人数",
    key: "enrollment",
    align: "center",
  },
  {
    title: "报名截止时间",
    key: "enrollDeadline",
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
    title: "审核状态",
    key: "auditStatus",
    align: "center",
    render({ auditStatus }) {
      return formatAuditStatus(auditStatus);
    },
  },
  {
    title: "审核意见",
    key: "auditComment",
    align: "center",
  },
  {
    title: "操作",
    key: "actions",
    align: "center",
    minWidth: "128px",
    render(row) {
      if (row.auditStatus === "0") {
        return [
          h(
            NButton,
            {
              text: true,
              type: "info",
              onClick: () => openAuditModal(row),
              vShow: row.auditStatus === 0,
            },
            {
              default: () => [
                h(NIcon, null, { default: () => h(LayersOutline) }),
                " 审核",
              ],
            },
          ),
          h(
            NButton,
            {
              text: true,
              type: "info",
              onClick: () => handleDetail(row),
              vShow: row.auditStatus === 0,
            },
            {
              default: () => [
                h(NIcon, null, { default: () => h(LayersOutline) }),
                " 详情",
              ],
            },
          ),
          h(
            "span",
            {
              style: {
                align: "center",
              },
            },
            { default: () => "  " },
          ),
          h(
            NPopconfirm,
            {
              negativeText: "取消",
              positiveText: "确认",
              onPositiveClick: () => deleteItem(row.id),
            },
            {
              default: () => "确定删除吗？",
              trigger: () =>
                h(
                  NButton,
                  { text: true, type: "error" },
                  {
                    default: () => [
                      h(NIcon, null, { default: () => h(TrashOutline) }),
                      " 删除",
                    ],
                  },
                ),
            },
          ),
        ];
      } else {
        return [
          h(
            NButton,
            {
              text: true,
              type: "info",
              onClick: () => handleDetail(row),
              vShow: row.auditStatus === 0,
            },
            {
              default: () => [
                h(NIcon, null, { default: () => h(LayersOutline) }),
                " 详情",
              ],
            },
          ),
          h(
            NPopconfirm,
            {
              negativeText: "取消",
              positiveText: "确认",
              onPositiveClick: () => deleteItem(row.id),
            },
            {
              default: () => "确定删除吗？",
              trigger: () =>
                h(
                  NButton,
                  { text: true, type: "error" },
                  {
                    default: () => [
                      h(NIcon, null, { default: () => h(TrashOutline) }),
                      " 删除",
                    ],
                  },
                ),
            },
          ),
        ];
      }
    },
  },
];
