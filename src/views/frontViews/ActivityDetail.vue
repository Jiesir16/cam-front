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
      <template #header>{{ activityInfo.activityName }}</template>
      <template #header-extra>
        <n-flex>
          <n-gradient-text type="info"
          >已报名{{ activityEnrollCount }}人
          </n-gradient-text>
          <n-rate readonly allow-half :default-value="activityRateRef" />
          <n-gradient-text type="warning"
            >{{ activityRateRef }}分
          </n-gradient-text>
        </n-flex>
      </template>
      <n-flex vertical align="center" justify="center">
        <n-image
          lazy
          object-fit="fill"
          width="1200px"
          height="300px"
          :src="activityInfo.activityImg"
        />
        <n-divider>简介</n-divider>
        <n-text>{{ activityInfo.activityBrief }}</n-text>
        <n-divider>地址</n-divider>
        <n-text>{{ activityInfo.venueLocation }}</n-text>
        <n-divider>描述</n-divider>
        <n-text>{{ activityInfo.activityAddition }}</n-text>
      </n-flex>
      <template #action>
        <n-flex align="center" justify="center">
          <template v-if="!isFavorite">
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-button @click="toggleFavorite">
                  <template #icon>
                    <n-icon color="#ff5555">
                      <HeartOutline />
                    </n-icon>
                  </template>
                  收藏
                </n-button>
              </template>
              <span> 点击收藏 </span>
            </n-tooltip>
          </template>
          <template v-else>
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-button @click="toggleUnFavorite">
                  <template #icon>
                    <n-icon color="#ff5555">
                      <Heart />
                    </n-icon>
                  </template>
                  已收藏
                </n-button>
              </template>
              <span> 点击取消收藏 </span>
            </n-tooltip>
          </template>
          <template v-if="!isEnroll">
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-button @click="toggleEnroll">
                  <template #icon>
                    <n-icon color="#ff5555">
                      <HandRightOutline />
                    </n-icon>
                  </template>
                  我要报名
                </n-button>
              </template>
              <span> 点击报名 </span>
            </n-tooltip>
          </template>
          <template v-else>
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-button @click="toggleUnEnroll">
                  <template #icon>
                    <n-icon color="#ff5555">
                      <HandRight />
                    </n-icon>
                  </template>
                  已报名
                </n-button>
              </template>
              <span> 点击取消报名 </span>
            </n-tooltip>
          </template>

          <n-button disabled>活动作品</n-button>
        </n-flex>
      </template>
    </n-card>
    <n-input :value="activityIdRef" v-show="false"></n-input>
  </n-flex>
  <n-card style="width: 80dvw" title="评论:">
    <n-flex vertical justify="start">
      <n-input
        v-model:value="commentRef"
        type="textarea"
        placeholder="请输入评论"
      />
      <n-flex align="center" justify="end">
        <n-button @click="handleComment">评论</n-button>
      </n-flex>
      <n-divider></n-divider>
      <n-card v-for="item in activityCommentsRef" embedded>
        <n-flex vertical justify="start">
          <n-flex justify="space-between">
            <n-flex align="center">
              <n-avatar :src="item.url" />
              <n-text strong>{{ item.username }}</n-text>
            </n-flex>
            <n-flex justify="center" align="center">
              <n-text>{{ item.commentTime }}</n-text>
            </n-flex>
          </n-flex>
          <div style="margin-left: 45px">
            <n-text> {{ item.comment }}</n-text>
          </div>
          <n-collapse>
            <template #arrow>
              <div />
            </template>
            <template #header-extra> 回复</template>
            <n-collapse-item>
              <n-flex vertical>
                <n-input
                  type="textarea"
                  v-model:value="replyContentRef"
                  placeholder="请输入回复内容"
                />
                <n-flex align="center" justify="end">
                  <n-button @click="handleReply(item.id, item.userId)"
                    >提交
                  </n-button>
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
                  <n-text strong>{{ subItem.username }}</n-text>
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
                    <n-input
                      type="textarea"
                      v-model:value="replyContentRef"
                      placeholder="请输入回复内容"
                    />
                    <n-flex align="center" justify="end">
                      <n-button
                        @click="handleReply(item.id, subItem.replyUserId)"
                        >提交
                      </n-button>
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
import {
  ArrowBack,
  HandRight,
  HandRightOutline,
  Heart,
  HeartOutline,
} from "@vicons/ionicons5";
import router from "@/router";
import { useRoute } from "vue-router";
import { restfulApi } from "@/axios";
import { message } from "@/plugins/naive-ui-discrete-api.ts";

const activityRateRef = ref(3.8);
const activityEnrollCount = ref();

const activityCommentsRef = ref();
const activityInfo = ref({
  activityName: null,
  activityImg: null,
  activityBrief: null,
  venueLocation: null,
  activityType: null,
  activityAddition: null,
});
const activityIdRef = ref<any>(null);
const isFavorite = ref();
const isEnroll = ref();

async function fetchActivityById() {
  let paramId = useRoute().params.id;
  activityIdRef.value = paramId;
  await restfulApi.get(`/activity/detail/${paramId}`).then((res) => {
    activityInfo.value = { ...res.data };
    isFavorite.value = res.data.favorite;
    isEnroll.value = res.data.enroll;
    activityEnrollCount.value = res.data.enrollCount;
  });
  await fetchCommets();
}

function fetchCommets() {
  restfulApi
    .get("/comment/comments", { activityId: activityIdRef.value })
    .then((res) => {
      console.log("pinlun", res.data);
      activityCommentsRef.value = res.data.map((item) => ({
        id: item.id,
        url: item.avatarUrl,
        userId: item.userId, // 评论的用户ID
        username: item.username,
        commentTime: item.time,
        comment: item.content,
        replys: item.replies.map((reply) => ({
          id: reply.id, // 评论ID
          replyId: reply.replyId, // 评论回复的
          replyUserId: reply.replyUserId, // 评论回复的
          url: reply.replyAvatarUrl,
          username: reply.replyUsername,
          targetUsername: reply.replyTargetUsername,
          commentTime: reply.replyTime,
          comment: reply.replyContent,
        })),
      }));
    });
}

const commentRef = ref(null);

function handleComment() {
  let data = {
    content: commentRef.value,
    activityId: activityIdRef.value,
  };
  restfulApi.post("/comment", data).then(() => {
    message.success("评论成功");
    commentRef.value = null;
    fetchCommets();
  });
}

function toggleFavorite() {
  let data = {
    activityId: activityIdRef.value,
  };
  restfulApi.post("/collection", data).then(() => {
    message.success("收藏成功");
    isFavorite.value = true;
  });
}

function toggleUnFavorite() {
  let data = {
    activityId: activityIdRef.value,
  };
  restfulApi.put("/collection", data).then(() => {
    message.success("取消成功");
    isFavorite.value = false;
  });
}

function toggleEnroll() {
  let data = {
    activityId: activityIdRef.value,
  };
  restfulApi.post("/enroll", data).then(() => {
    message.success("报名成功");
    isEnroll.value = true;
  });
}

function toggleUnEnroll() {
  let data = {
    activityId: activityIdRef.value,
  };
  restfulApi.put("/enroll", data).then(() => {
    message.success("取消成功");
    isEnroll.value = false;
  });
}

const replyContentRef = ref(null);

function handleReply(commentId, targetUserId) {
  let data = {
    replyContent: replyContentRef.value,
    replyCommentId: commentId,
    replyTargetId: targetUserId,
  };
  restfulApi.post("/reply", data).then(() => {
    message.success("回复成功");
    replyContentRef.value = null;
    fetchCommets();
  });
}

fetchActivityById();

function handleBack() {
  router.go(-1);
}
</script>
<style scoped></style>
