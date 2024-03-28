<template>
  <n-flex style="margin: 12px">
    <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      style="height: 340px"
      :show-dots="true"
    >
      <n-carousel-item :style="{ width: '60%' }">
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item :style="{ width: '60%' }">
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item :style="{ width: '60%' }">
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item :style="{ width: '60%' }">
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel-item>
    </n-carousel>
  </n-flex>
  <n-flex style="margin: 12px">
    <n-grid x-gap="12" y-gap="8" :cols="3">
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg"
                />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/03/17/5c8db80696ca5.png"
              />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg"
                />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/03/17/5c8db80696ca5.png"
                />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg"
                />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
      <n-gi>
        <n-card style="cursor: pointer;" title="我们为什么要读书" @click="handleClick">
          <template #cover>
            <div style="height: 200px">
              <img
                src="https://i.loli.net/2019/03/17/5c8db80696ca5.png"
                />
            </div>
          </template>
          我们为什么要读书
        </n-card>
      </n-gi>
    </n-grid>
  </n-flex>
</template>

<script setup lang="ts">
import { message } from "@/plugins/naive-ui-discrete-api.ts";

function handleClick() {
  message.info("点击了");
}
</script>

<style lang="scss">
/* 可以在这里添加一些额外的全局或局部样式 */
// class引用是 .xxx声明属性,id引用是#xxx
.light-green {
  height: 308px;
  background-color: rgba(0, 128, 0, 0.12);
  cursor: pointer; /* 添加手型光标，表示可点击 */
}

.green {
  height: 308px;
  background-color: rgba(0, 128, 0, 0.24);
  cursor: pointer; /* 添加手型光标，表示可点击 */
}

.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
