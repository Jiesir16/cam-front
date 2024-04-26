<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>权限信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="活动类型编码">
          <n-input
            v-model:value="categoryInfo.categoryCode"
            placeholder="请输入活动类型编码"
            :disabled="categoryInfo.id != null"
          />
        </n-form-item>
        <n-form-item label="活动类型名称">
          <n-input
            v-model:value="categoryInfo.categoryName"
            placeholder="请输入活动类型名称"
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
import { CategoryInfo } from "@/views/activityCategory/categoryApi";

export interface Props {
  show?: boolean;
  categoryInfo: CategoryInfo;
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
  if (props.categoryInfo.id) {
    emit("edit", { ...props.categoryInfo });
  } else {
    emit("create", { ...props.categoryInfo });
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
