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
            :disabled="roleInfo.id!=null"
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
            check-strategy="all"
            cascade
            block-line
            :data="options"
            v-model:checked-keys="roleInfo.permissionIds"
            label-field="permName"
            key-field="id"
            default-expand-all
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
import { usePermsStore } from "@/stores/modules/perms.ts";
import { computed } from "vue";

const permsStore = usePermsStore();
permsStore.fetchAllPerms();
console.log("permsStore.getPerms()", permsStore.getPerms());
const options = computed(() => permsStore.perms);

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
