<template>
  <n-flex vertical style="min-height: 85dvh">
    <n-card title="留言与反馈" size="huge" style="min-width: 80dvw">
      <n-flex vertical>
        <n-text strong style="font-size: 18px; margin-bottom: 36px">
          欢迎反馈问题，您的意见与建议就是我们的动力！
        </n-text>
        <n-text style="font-size: 16px">
          我们会认真查阅您反馈的每一个问题，在这里您可以提出遇到的问题，也可以发表自己的建议和想法。
        </n-text>
        <n-text style="font-size: 16px">
          针对您宝贵的建议与意见，我们会不断完善校园活动服务平台，希望能给您带来更好的使用体验！
        </n-text>

        <n-flex vertical style="margin-top: 36px">
          <n-form ref="activityApplyFormRef" v-model:value="feedbackInfo">
            <n-grid :cols="24" :x-gap="24">
              <n-form-item-gi path="feedType" :span="24" label="问题类别:">
                <n-select
                  placeholder="请选择问题类别"
                  v-model:value="feedbackInfo.feedbackType"
                  size="large"
                  :options="options"
                />
              </n-form-item-gi>
              <n-form-item-gi
                path="feedbackInfo.feedbackComment"
                :span="24"
                label="问题与建议描述:"
              >
                <n-input
                  type="textarea"
                  v-model:value="feedbackInfo.feedbackComment"
                  placeholder="请输入问题与建议描述"
                ></n-input>
              </n-form-item-gi>
            </n-grid>
          </n-form>
          <n-flex vertical align="center">
            <n-button type="primary" style="width: 180px" size="large">
              提交与反馈
            </n-button>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>

    <n-card title="留言板" size="huge" style="min-width: 80dvw">
      <n-card v-for="item in feedbackInfos">
        <n-text> {{ item.value }}</n-text>
      </n-card>
    </n-card>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";

const options = [
  {
    label: "功能欠缺/不好用",
    value: "001",
  },
  {
    label: "页面效果",
    value: "002",
  },
  {
    label: "一点建议",
    value: "003",
  },
  {
    label: "其他方面",
    value: "004",
  },
];

const feedbackInfo = ref({
  feedbackType: null,
  feedbackComment: null,
});

const feedbackInfos = ref([{ value: "123" }]);
</script>
