<template>
  <n-modal :show="show1">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>用户信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="用户名">
          <n-input v-model:value="user1.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="user1.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item>
          <n-tree-select
            multiple
            v-model:value="user1.roleIds"
            label-field="roleName"
            key-field="id"
            :options="options"
            @update:value="handleUpdateValue"
          />
        </n-form-item>
        <!-- 其他表单项 -->
      </n-form>
      <template #action>
        <n-flex justify="end">
          <n-button @click="handleCancel">取消</n-button>
          <n-button @click="handleSubmit" type="primary">提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { TreeSelectOption } from "naive-ui";
import { useRolesStore } from "@/stores/modules/role";

export interface User {
  id?: Number | null;
  username?: String | null;
  email?: String | null;
  roleIds?: Array<number>;
}

export interface Props {
  show1?: boolean;
  user1: User;
}

const roleStore = useRolesStore();
let s = [];
roleStore.fetchAllRoles().then(data => {
  console.log("data",data);
  s = data;
});

const options = s;

//const options = [
//  {
//    roleName: "管理员",
//    id: 1,
//  },
//  {
//    roleName: "访客",
//    id: 2,
//  },
//];

function handleUpdateValue(
  value: string | number | Array<string | number> | null,
  option: TreeSelectOption | null | Array<TreeSelectOption | null>,
) {
  console.log(value, option);
}

// 定义组件属性
const props = defineProps<Props>();

// 定义发送事件
const emit = defineEmits(["update:show", "edit", "create"]);

function handleSubmit() {
  console.log(
    "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
  );
  console.log("userInfo.value", props);
  if (props.user1.id) {
    emit("edit", { ...props.user1 });
  } else {
    emit("create", { ...props.user1 });
  }

  emit("update:show", false);
}

function handleCancel() {
  console.log(
    "[Modal子组件] 触发了 handleCancel ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}

function handleClose() {
  console.log(
    "[Modal子组件] 触发了 handleClose ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}
</script>
