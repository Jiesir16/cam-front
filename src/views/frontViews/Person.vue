<template>
  <n-card
    style="
      max-width: 1383px;
      background-color: #ffffff;
      padding: 20px;
      min-height: 85dvh;
    "
  >
    <n-flex vertical>
      <n-flex vertical align="center">
        <img
          alt="11"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          style="border-radius: 50%"
        />
        <n-text
          >{{
            useUsersStore().loginUserInfo.name
              ? useUsersStore().loginUserInfo.name
              : useUsersStore().loginUserInfo.username
          }}
        </n-text>
        <n-text>{{ useUsersStore().loginUserInfo.department }}</n-text>
        <n-text
          >{{
            useUsersStore().loginUserInfo.grade +
            useUsersStore().loginUserInfo.profession +
            useUsersStore().loginUserInfo.userClass
          }}班
        </n-text>
      </n-flex>

      <n-flex style="min-height: 61dvh">
        <n-tabs
          type="line"
          animated
          v-model:value="selectedRef"
          :tabs-padding="12"
          default-value="collected"
          @update:value="handleChangeTab"
        >
          <n-tab-pane
            name="collected"
            :tab="renderTab('i-BookmarkOutline', '收藏的活动')"
            display-directive="show:lazy"
          >
            <n-grid x-gap="12" y-gap="8" :cols="3">
              <n-gi v-for="(item, index) in activitiesRef">
                <n-card
                  style="cursor: pointer"
                  :title="item.title"
                  @click="handleClick(index)"
                >
                  <template #cover>
                    <div style="height: 200px">
                      <img :src="item.imgUrl" :alt="item.title" />
                    </div>
                  </template>
                  {{ item.desc }}
                  {{ index }}
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
          <n-tab-pane
            name="enrolled"
            :tab="renderTab('i-TicketOutline', '参与过的活动')"
            display-directive="show:lazy"
          >
            <n-grid x-gap="12" y-gap="8" :cols="3">
              <n-gi v-for="(item, index) in activitiesRef">
                <n-card
                  style="cursor: pointer"
                  :title="item.title"
                  @click="handleClick(index)"
                >
                  <template #cover>
                    <div style="height: 200px">
                      <img :src="item.imgUrl" :alt="item.title" />
                    </div>
                  </template>
                  {{ item.desc }}
                  {{ index }}
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
          <n-tab-pane
            name="published"
            :tab="renderTab('i-SendOutline', '发布过的活动')"
            display-directive="show:lazy"
          >
            <n-grid x-gap="12" y-gap="8" :cols="3">
              <n-gi v-for="(item, index) in activitiesRef">
                <n-card
                  style="cursor: pointer"
                  :title="item.title"
                  @click="handleClick(index)"
                >
                  <template #cover>
                    <div style="height: 200px">
                      <img :src="item.imgUrl" :alt="item.title" />
                    </div>
                  </template>
                  {{ item.desc }}
                  {{ index }}
                </n-card>
              </n-gi>
            </n-grid>
          </n-tab-pane>
        </n-tabs>
      </n-flex>
    </n-flex>
    <template #footer>
      <n-flex justify="center">
        <n-pagination
          :page="page"
          :page-count="pages"
          @update:page="handleUpdatePage"
          simple
        />
      </n-flex>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import { renderTab } from "@/utils";
import { useUsersStore } from "@/stores/modules/users.ts";
import { restfulApi } from "@/axios";

interface GridItem {
  title?: string | undefined;
  desc?: string | null | undefined;
  imgUrl?: string | undefined;
}

const page = ref(1);
const pages = ref(1);
const selectedRef = ref<String>("collected");
const activitiesRef = ref<Array<GridItem>>([]);

function handleUpdatePage(pageNo) {
  console.log("[pageNo]", pageNo, selectedRef);
  pageNo = pageNo ? pageNo : 1;
  handleChangeTab(selectedRef.value, pageNo);
}

function handleClick(index: any) {
  message.info(`${index}点击了`);
}

function handleChangeTab(tableName: any, pageNo?: number) {
  console.log("[handleChangeTab]", tableName, pageNo);
  if ("collected" === tableName) {
    fetchActivities({ size: 6, current: pageNo, collected: true });
  } else if ("enrolled" === tableName) {
    fetchActivities({ size: 6, current: pageNo, enrolled: true });
  } else if ("published" === tableName) {
    fetchActivities({ size: 6, current: pageNo, published: true });
  }
}

function fetchActivities(queryParam) {
  restfulApi.get("/activity/page", queryParam).then((res) => {
    page.value = res.data.current;
    pages.value = res.data.pages;
    activitiesRef.value = res.data.records.map((item) => ({
      id: item.id,
      title: item.activityName,
      desc: item.activityBrief,
      imgUrl: item.activityImg,
    }));
  });
}

fetchActivities({ size: 6, current: 1, collected: true });
</script>
