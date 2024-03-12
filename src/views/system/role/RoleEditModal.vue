<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>角色信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="角色编码">
          <n-input
            v-model:value="roleInfo.roleCode"
            placeholder="请输入角色编码"
          />
        </n-form-item>
        <n-form-item label="角色名称">
          <n-input
            v-model:value="roleInfo.roleName"
            placeholder="请输入角色名称"
          />
        </n-form-item>
        <n-form-item label="角色权限">
          <n-tree
            cascade
            block-line
            :data="options"
            :default-expanded-keys="defaultExpandedKeys"
            @update:checked-keys="handleCheckedKeysChange"
            expand-on-click
            checkable
          />
        </n-form-item>
        <n-form-item label="角色描述">
          <n-input
            v-model:value="roleInfo.description"
            placeholder="请输入角色描述"
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
import { Role } from "@/views/system/role/roleApi";
import { ref } from "vue";
import { TreeOption } from "naive-ui";
import {message} from "@/plugins/naive-ui-discrete-api.ts";

const defaultExpandedKeys = ref<string[]>(["keylevel21"]);

const options = ref<TreeOption[]>([
  {
    label: "level 11",
    key: "keylevel11",
    children: [
      {
        label: "level 2",
        key: "keylevel21",
      },
    ],
  },
  {
    label: "level 12",
    key: "keylevel12",
    children: [
      {
        label: "level 2",
        key: "keylevel22",
      },
    ],
  },
]);

function handleCheckedKeysChange(checkedKeys: string[]) {
  message.info(JSON.stringify(checkedKeys))
}

export interface Props {
  show?: boolean;
  roleInfo: Role;
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
  if (props.roleInfo.id) {
    emit("edit", { ...props.roleInfo });
  } else {
    emit("create", { ...props.roleInfo });
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
