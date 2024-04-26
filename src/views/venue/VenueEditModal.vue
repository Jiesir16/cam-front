<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 500px">
      <template #header>权限信息</template>
      <n-form ref="editForm">
        <!-- 表单内容，例如： -->
        <n-form-item label="场地名称">
          <n-input
            v-model:value="venueInfo.venueName"
            placeholder="请输入权限编码"
            :disabled="venueInfo.id != null"
          />
        </n-form-item>
        <n-form-item label="场地类型">
          <n-input
            v-model:value="venueInfo.venueType"
            placeholder="请输入权限名称"
          />
        </n-form-item>
        <n-form-item label="场地位置">
          <n-input
            v-model:value="venueInfo.venueLocation"
            placeholder="请输入权限名称"
          />
        </n-form-item>
        <n-form-item label="场地状态">
          <n-input
            v-model:value="venueInfo.venueStatus"
            placeholder="请输入权限描述"
          />
        </n-form-item>
        <n-form-item label="开放时间">
          <n-input
            v-model:value="venueInfo.openTime"
            placeholder="请输入权限描述"
          />
        </n-form-item>
        <n-form-item label="详情">
          <n-input
            v-model:value="venueInfo.venueDetail"
            placeholder="请输入权限描述"
          />
        </n-form-item>
        <n-form-item label="场地图片">
          <n-input
            v-model:value="venueInfo.venueImg"
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
import { VenueInfo } from "@/views/venue/venueApi";

export interface Props {
  show?: boolean;
  venueInfo: VenueInfo;
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
  if (props.venueInfo.id) {
    emit("edit", { ...props.venueInfo });
  } else {
    emit("create", { ...props.venueInfo });
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
