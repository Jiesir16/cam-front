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
                path="feedbackInfo.feedbackContent"
                :span="24"
                label="问题与建议描述:"
              >
                <n-input
                  type="textarea"
                  v-model:value="feedbackInfo.feedbackContent"
                  placeholder="请输入问题与建议描述"
                ></n-input>
              </n-form-item-gi>
            </n-grid>
          </n-form>
          <n-flex vertical align="center">
            <n-button
              type="primary"
              style="width: 180px"
              size="large"
              @click="handleSubmit"
            >
              提交与反馈
            </n-button>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>

    <n-card title="留言板" size="huge" style="min-width: 80dvw">
      <n-card v-for="item in feedbackInfos">
        <n-flex justify="space-between">
          <n-flex justify="start" align="center">
            <n-tag round :bordered="false" type="default">
              {{ item.feedbackType }}
              <template #icon>
                <n-icon :component="AlbumsOutline" />
              </template>
            </n-tag>
            <n-text> {{ item.feedbackContent }}</n-text>
          </n-flex>
          <n-text> {{ item.createTime }}</n-text>
        </n-flex>
      </n-card>
    </n-card>
  </n-flex>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { restfulApi } from "@/axios";
import { useMessage } from "naive-ui";
import { AlbumsOutline } from "@vicons/ionicons5";

const message = useMessage();
const options = [
  {
    label: "功能欠缺/不好用",
    value: 1,
  },
  {
    label: "页面效果",
    value: 2,
  },
  {
    label: "一点建议",
    value: 3,
  },
  {
    label: "其他方面",
    value: 4,
  },
];

const feedbackInfo = ref({
  feedbackType: null,
  feedbackContent: null,
});

interface FeedbackInfo {
  feedbackContent: String | null;
  feedbackType: String | null;
  createTime: String | null;
}

const feedbackInfos = ref<Array<FeedbackInfo>>([]);

async function handleSubmit() {
  await restfulApi
    .post("/feedback", feedbackInfo.value)
    .then(() => {
      message.success("提交成功");
    })
    .catch(() => {
      message.success("提交失败");
    });
  fetchFeedbackInfos();
}

function fetchFeedbackInfos() {
  restfulApi.get("/feedback/all", {}).then((res) => {
    feedbackInfos.value = res.data.map((item) => ({
      ...item,
      feedbackType: converterType(item.feedbackType),
    }));
  });
}

const converterType = (value: String) => {
  switch (value) {
    case "1": {
      return "功能欠缺/不好用";
    }
    case "2": {
      return "页面效果";
    }
    case "3": {
      return "一点建议";
    }
    case "4": {
      return "其他方面";
    }
  }
};

fetchFeedbackInfos();
</script>
