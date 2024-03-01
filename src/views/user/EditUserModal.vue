<template>
  <n-modal v-model:show="showModal">
      <n-card
          style="width: 600px"
          title="模态框"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          >
          <template #header-extra>噢</template>
          <n-flex>
              <n-form ref="editForm">
                  <n-form-item label="用户名">
                      <n-input v-model:value="editFormData.username" disabled/>
                  </n-form-item>
                  <n-form-item label="邮箱">
                      <n-input v-model:value="editFormData.email" disabled/>
                  </n-form-item>
          <!-- 其他表单项 -->
              </n-form>
          </n-flex>
          <template #footer>
            <n-button @click="handleSubmit">提交</n-button>
          </template>
      </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const editFormData = ref({
    username: '',
    // 其他表单数据
});

// 暴露 showModal，以便外部可以控制模态框的显示与隐藏
defineExpose({ showModal });
</script>

<style scoped>
/* 如果需要，可以在这里添加一些 CSS 样式 */
</style>
