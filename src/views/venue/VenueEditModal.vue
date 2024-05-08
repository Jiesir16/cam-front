<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 900px">
      <template #header>权限信息</template>
      <n-form ref="editForm">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi path="activityName" :span="12" label="场地名称">
            <n-input
              v-model:value="venueInfo.venueName"
              placeholder="请输入场地名称"
              :disabled="venueInfo.id != null"
            />
          </n-form-item-gi>
          <n-form-item-gi path="venueType" :span="12" label="场地类型">
            <n-input
              v-model:value="venueInfo.venueType"
              placeholder="请输入场地类型"
            />
          </n-form-item-gi>
          <n-form-item-gi path="venueLocation" :span="24" label="场地位置">
            <n-input
              v-model:value="venueInfo.venueLocation"
              placeholder="请输入场地位置"
            />
          </n-form-item-gi>
          <n-form-item-gi label="场地状态" :span="12">
            <n-select
              v-model:value="venueInfo.venueStatus"
              :options="venueStatusOptions"
              placeholder="请选择"
            />
          </n-form-item-gi>
          <n-form-item-gi label="场地图片" :span="12">
            <n-upload
              action="/api/v1/media/upload"
              @finish="handleFinish"
              :headers="{ Authorization: useUsersStore().token }"
              v-model:file-list="venueInfo.fileList"
              list-type="image-card"
              :max="Number(1)"
            >
              点击上传
            </n-upload>
          </n-form-item-gi>
          <n-form-item-gi label="开放开始时间" :span="12">
            <n-time-picker
              v-model:formatted-value="venueInfo.availableTimeStart"
              :hours="
                Array.from({ length: 22 - 6 + 1 }, (_, index) => index + 6)
              "
              :minutes="[0, 30]"
              :seconds="[0]"
            />
          </n-form-item-gi>
          <n-form-item-gi label="开放结束时间" :span="12">
            <n-time-picker
              v-model:formatted-value="venueInfo.availableTimeEnd"
              :hours="
                Array.from({ length: 22 - 6 + 1 }, (_, index) => index + 6)
              "
              :minutes="[0, 30]"
              :seconds="[0]"
            />
          </n-form-item-gi>
          <n-form-item-gi label="可容纳人数" :span="12">
            <n-input-number
              v-model:value="venueInfo.capacity"
              placeholder="请输入可容纳人数"
            />
          </n-form-item-gi>
          <n-form-item-gi label="联系人" :span="12">
            <n-input
              v-model:value="venueInfo.contactPerson"
              placeholder="请输入联系人"
            />
          </n-form-item-gi>
          <n-form-item-gi label="联系人邮箱" :span="12">
            <n-input
              v-model:value="venueInfo.contactEmail"
              placeholder="请输入联系人邮箱"
            />
          </n-form-item-gi>
          <n-form-item-gi label="联系人手机号" :span="12">
            <n-input
              v-model:value="venueInfo.contactPhone"
              placeholder="请输入联系人手机号"
            />
          </n-form-item-gi>
          <n-form-item-gi label="场地详情" :span="24">
            <n-input
              type="textarea"
              v-model:value="venueInfo.venueDetail"
              placeholder="请输入场地详情"
            />
          </n-form-item-gi>
        </n-grid>
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
import { useUsersStore } from "@/stores/modules/users.ts";
import { UploadFileInfo } from "naive-ui";
import { ref } from "vue";

export interface Props {
  show?: boolean;
  venueInfo: VenueInfo;
}

// 定义组件属性
const props = defineProps<Props>();

// 定义发送事件
const emit = defineEmits(["update:show", "edit", "create"]);

function handleFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent<XMLHttpRequest>;
}) {
  console.log("[handleFinish]", file, event);
  if (event && event.target && event.target) {
    file.url = event.target.response;
  }
}

const venueStatusOptions = ref([
  { label: "开放中", value: "open" },
  { label: "已关闭", value: "closed" },
]);

function handleSubmit() {
  console.log(
    "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
  );
  console.log("props.value", props);
  if (props.venueInfo.id) {
    emit("edit", {
      ...props.venueInfo,
      venueImg: props.venueInfo.fileList?.map((item) => item.url).pop(),
    });
  } else {
    emit("create", {
      ...props.venueInfo,
      venueImg: props.venueInfo.fileList?.map((item) => item.url).pop(),
    });
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
