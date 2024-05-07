import { h } from "vue";
import { NButton, NIcon, NPopconfirm } from "naive-ui";
import { CloseOutline } from "@vicons/carbon";

export const getTableColumns = (handleUnEnroll: Function) => [
  {
    title: "活动名称",
    key: "activityName",
    align: "center",
  },
  {
    title: "姓名",
    key: "name",
    align: "center",
    fixed: "left",
  },
  {
    title: "学号",
    key: "account",
    align: "center",
  },
  {
    title: "邮箱",
    key: "email",
    align: "center",
  },
  {
    title: "报名时间",
    key: "createTime",
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
          NPopconfirm,
          {
            negativeText: "否",
            positiveText: "是",
            onPositiveClick: () => handleUnEnroll(row),
          },
          {
            default: () => "确定取消吗？",
            trigger: () =>
              h(
                NButton,
                {
                  text: true,
                  type: "info",
                },
                {
                  default: () => [
                    h(NIcon, null, { default: () => h(CloseOutline) }),
                    " 取消报名",
                  ],
                },
              ),
          },
        ),
      ];
    },
  },
];
