<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>权限信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="权限编码">
          <n-input
            v-model:value="permissionInfo.permCode"
            placeholder="请输入权限编码"
            :disabled="permissionInfo.id!=null"
            />
        </n-form-item>
        <n-form-item label="权限名称">
          <n-input
            v-model:value="permissionInfo.permName"
            placeholder="请输入权限名称"
            />
        </n-form-item>
        <n-form-item label="父节点ID">
          <n-input-number
            :show-button="false"
            v-model:value="permissionInfo.parentId"
            placeholder="请输入父节点ID"
            />
        </n-form-item>
        <n-form-item label="权限描述">
          <n-input
            v-model:value="permissionInfo.description"
            placeholder="请输入权限描述"
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
import { Permission } from "@/views/system/permission/permissionApi";

export interface Props {
  show?: boolean;
  permissionInfo: Permission;
}

// 定义组件属性
const props = defineProps<Props>();

// 定义发送事件
const emit = defineEmits(["update:show", "edit", "create"]);

function handleSubmit() {
  console.log(
    "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
  );
  console.log("props.value", props);
  if (props.permissionInfo.id) {
    emit("edit", { ...props.permissionInfo });
  } else {
    emit("create", { ...props.permissionInfo });
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
