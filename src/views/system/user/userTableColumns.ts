import { h } from "vue";
import { NButton, NIcon, NImage, NSwitch, NTag } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  updateActivationStatus: Function,
  openEditModal: Function,
  deleteItem: Function,
) => [
  {
    title: "头像",
    key: "avatarUrl",
    align: "center",
    render({ avatarUrl }) {
      return [
        h(NImage, {
          text: true,
          src: avatarUrl,
          lazy: true,
          width: 45,
        }),
      ];
    },
  },
  {
    title: "用户名",
    key: "username",
    align: "center",
  },
  {
    title: "邮箱",
    key: "email",
    align: "center",
  },
  {
    title: "角色",
    key: "roles",
    align: "center",
    render(row) {
      return row.roles.map((role) => {
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
            default: () => role.roleName,
          },
        );
      });
    },
  },
  {
    title: "是否激活",
    key: "activated",
    align: "center",
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
            style: {
              marginRight: "6px",
            },
            text: true,
            type: "info",
            onClick: () => openEditModal(row),
          },
          {
            default: () => [
              h(NIcon, null, { default: () => h(LayersOutline) }),
              " 编辑",
            ],
          },
        ),
        h(
          NButton,
          {
            style: {
              marginRight: "6px",
            },
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
