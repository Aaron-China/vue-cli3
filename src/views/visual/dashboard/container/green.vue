<template>
  <div class="component-container">
    <div class="title" :title="title">{{title}}</div>
    <div class="border"></div>
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
  .title {
    width: 55%;
    height: @titleHeight;
    line-height: @titleHeight;
    color: #52AAAB;
    padding: 0 15px 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .border {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #397084;
    clip-path: polygon(
      0 18px, 8px 25px, 60% 25px, calc(60% + 2px) 25px, calc(60% + 25px) 0, calc(100% - 25px) 0, 100% 25px, 100% calc(100% - 25px), 
      calc(100% - 25px) 100%, 25px 100%, 0 calc(100% - 25px), 0 19px,

      2px 19px, 2px calc(100% - 26px), 26px calc(100% - 2px), calc(100% - 26px) calc(100% - 2px),calc(100% - 27.5px) 100%, 
      calc(100% - 2px) calc(100% - 25.5px), calc(100% - 2px) 25.5px, calc(100% - 25.5px) 2px, calc(60% + 25.5px) 2px, 
      calc(60% + 2.5px) 27px, 60% 27px, 8px 27px, 0 20px,
    );
  }
}
</style>
