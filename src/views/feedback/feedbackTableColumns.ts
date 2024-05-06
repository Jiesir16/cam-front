import { h } from "vue";
import { NButton, NIcon, NTag } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";
const formatTypes = (value) => {
  switch (value) {
    case "1": {
      return "功能欠缺/不好用";
    }
    case "2": {
      return "页面效果";
    }
    case "3": {
      return "一点建议";
    }
    case "4": {
      return "其他方面";
    }
  }
};
export const getTableColumns = (deleteItem: Function) => [
  {
    title: "留言类型",
    key: "feedbackType",
    align: "center",
    render(row) {
      return h(
        NTag,
        {
          style: {
            marginRight: "6px",
          },
          type: "warning",
          bordered: false,
        },
        {
          default: () => formatTypes(row.feedbackType),
        },
      );
    },
  },
  {
    title: "留言提交人",
    key: "feedbackCreator",
    align: "center",
  },
  {
    title: "留言内容",
    key: "feedbackContent",
    align: "center",
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
  },
  {
    title: "操作",
    key: "actions",
    align: "center",
    render(row) {
      return [
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
