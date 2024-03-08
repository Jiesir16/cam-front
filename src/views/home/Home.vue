<template>
    <div class="home">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of our Vue application.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  // 在这里导入其他组件或者使用 Composition API
  </script>
  
  <style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  
    h1 {
      font-size: 2rem;
      color: #333;
    }
  
    p {
      font-size: 1rem;
      color: #666;
    }
  }
  </style>
  