import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  deleteItem: Function,
) => [
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
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => deleteItem(row.id),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(TrashOutline) }),
              " 取消报名",
            ],
          },
        ),
      ];
    },
  },
];
