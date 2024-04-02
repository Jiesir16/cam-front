<template>
  <n-flex vertical justify="start" style="min-width: 80dvw; min-height: 85dvh">
    <n-flex>
      <n-button text @click="handleBack">
        <template #icon>
          <n-icon>
            <ArrowBack />
          </n-icon>
        </template>
        返回上一级
      </n-button>
    </n-flex>
    <n-card
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      style="background-color: #ffffff"
    >
      <template #header>我们为什么要读书</template>
      <template #header-extra>
        <n-flex>
          <n-rate readonly allow-half :default-value="eventRateRef" />
          <n-gradient-text type="warning">{{ eventRateRef }}分</n-gradient-text>
        </n-flex>
      </template>
      <n-flex vertical align="center" justify="center">
        <n-image
          lazy
          object-fit="fill"
          width="1200px"
          height="300px"
          src="https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg"
        />
        <n-image
          lazy
          object-fit="fill"
          width="1200px"
          height="300px"
          src="https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg"
        />
        <n-divider>简介</n-divider>
        <n-text>我们为什么要读书——全民阅读：为了不同目的阅读</n-text>
        <n-divider>地址</n-divider>
        图书馆报告厅
      </n-flex>
      <template #action>
        <n-flex align="center" justify="center">
          <n-button>收藏</n-button>
          <n-button>我要报名</n-button>
          <n-button>活动作品</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-flex>
  <n-card style="width: 80dvw" title="评论:">
    <n-flex vertical justify="start">
      <n-input type="textarea" placeholder="请输入评论" />
      <n-flex align="center" justify="end">
        <n-button>评论</n-button>
      </n-flex>
      <n-divider></n-divider>
      <n-card v-for="item in eventCommentsRef">
        <n-flex vertical justify="start">
          <n-flex justify="space-between">
            <n-flex align="center">
              <n-avatar :src="item.url" />
              <n-text strong>{{ item.username }}:</n-text>
            </n-flex>
            <n-text>{{ item.commentTime }}</n-text>
          </n-flex>
          <div>
            <n-text> {{ item.comment }}</n-text>
          </div>
          <n-collapse>
            <template #arrow>
              <div />
            </template>
            <template #header-extra> 回复</template>
            <n-collapse-item>
              <n-flex vertical>
                <n-input type="textarea" placeholder="请输入回复内容" />
                <n-flex align="center" justify="end">
                  <n-button>提交</n-button>
                </n-flex>
              </n-flex>
            </n-collapse-item>
          </n-collapse>
          <n-card
            embedded
            style="margin: 0 20px"
            v-for="subItem in item.replys"
          >
            <n-flex vertical justify="start">
              <n-flex justify="space-between">
                <n-flex align="center">
                  <n-avatar :src="subItem.url" />
                  <n-text strong>{{ subItem.username }}:</n-text>
                </n-flex>
                <n-text>{{ subItem.commentTime }}</n-text>
              </n-flex>
              <n-text>
                回复
                <n-gradient-text strong
                  >{{ subItem.targetUsername }}
                </n-gradient-text>
                : {{ subItem.comment }}
              </n-text>
              <n-collapse arrow-placement="right">
                <template #arrow>
                  <div />
                </template>
                <template #header-extra> 回复</template>
                <n-collapse-item>
                  <n-flex vertical>
                    <n-input type="textarea" placeholder="请输入回复内容" />
                    <n-flex align="center" justify="end">
                      <n-button>提交</n-button>
                    </n-flex>
                  </n-flex>
                </n-collapse-item>
              </n-collapse>
            </n-flex>
          </n-card>
        </n-flex>
      </n-card>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowBack } from "@vicons/ionicons5";
import router from "@/router";

const eventRateRef = ref(3.8);

const eventCommentsRef = ref([
  {
    url: "https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg",
    username: "同学A",
    commentTime: "2024-04-02 19:19:19",
    comment: "哇哇哇，这活动太棒了吧！",
    replys: [
      {
        replyId: "123",
        url: "",
        username: "同学B",
        targetUsername: "同学A",
        commentTime: "2024-04-02 19:19:19",
        comment: "是的，我也这么觉得。",
      },
    ],
  },
]);

function handleBack() {
  router.go(-1);
}
</script>
<style scoped></style>
