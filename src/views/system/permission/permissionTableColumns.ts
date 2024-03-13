import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import { LayersOutline, TrashOutline } from "@vicons/ionicons5";

export const getTableColumns = (
  openEditModal: Function,
  deleteItem: Function,
) => [
  {
    title: "权限编码",
    key: "permCode",
    align: "center",
  },
  {
    title: "父节点ID",
    key: "parentId",
    align: "center",
  },
  {
    title: "权限名称",
    key: "permName",
    align: "center",
  },
  {
    title: "权限描述",
    key: "description",
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
