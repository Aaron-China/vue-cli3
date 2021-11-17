<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      zhCN
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
  margin: 0;
  padding: 0;
}
/* 公共样式 */
/* 按钮 */
/* 新增 导入 导出 */
#app .n-btn {
  color: #fff;
  background-color: @normal;
}
/* 编辑 */
#app .e-btn {
  color: #fff;
  background-color: @edit;
}
/* 重置 */
#app .w-btn {
  color: #fff;
  background-color: @rest;
}
/* 删除 */
#app .d-btn {
  color: #fff;
  background-color: @delete;
}
/* 其他 */
#app .o-btn {
  color: #fff;
  background-color: @other;
}
/* 按钮样式 组合 */
#app .margin-l-10 {
  margin-left: 10px;
}
</style>
