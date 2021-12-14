<template>
  <div class="component-container">
    <div class="title" :title="title">{{title}}</div>
    <div class="bor top-left"></div>
    <div class="bor top-right"></div>
    <div class="bor bottom-left"></div>
    <div class="bor bottom-right"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: {
      default: ''
    }
  }
})
</script>

<style lang="less" scoped>
.component-container {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3px;
  border: 1px solid #3172B7;
  border-radius: 2px;
  .title {
    height: @titleHeight;
    line-height: @titleHeight;
    background-image: linear-gradient(to right, rgba(56, 90, 191, 1) , rgba(255, 255, 255, 0.1));
    color: #fff;
    padding: 0 15px 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bor {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }
  .top-left {
    border-top: 2px solid #4193EB;
    border-left: 2px solid #4193EB;
    top: -1.5px;
    left: -2px;
  }
  .top-right {
    border-top: 2px solid #4193EB;
    border-right: 2px solid #4193EB;
    top: -1.5px;
    right: -1.5px;
  }
  .bottom-left {
    border-bottom: 2px solid #4193EB;
    border-left: 2px solid #4193EB;
    bottom: -2px;
    left: -2px;
  }
  .bottom-right {
    border-bottom: 2px solid #4193EB;
    border-right: 2px solid #4193EB;
    bottom: -2px;
    right: -1.5px;
  }
}
</style>
