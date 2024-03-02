import { h } from "vue";
import { NButton, NIcon, NSwitch } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  updateActivationStatus: Function,
  editItem: Function,
  deleteItem: Function,
) => [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "是否激活",
    key: "activated",
    render(row) {
      return h(
        NSwitch,
        {
          value: row.activated,
          "onUpdate:value": (value) => {
            // 更新行的激活状态
            row.activated = value;
            // 可以在这里调用 API 更新服务器上的数据
            updateActivationStatus(row.id, value);
          },
        },
        {
          checked: () => "已激活",
          unchecked: () => "已禁用",
        },
      );
    },
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "修改时间",
    key: "updateTime",
  },
  {
    title: "Actions",
    key: "actions",
    render(row) {
      return [
        h(
          NButton,
          {
            text: true,
            type: "info",
            onClick: () => editItem(row),
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
