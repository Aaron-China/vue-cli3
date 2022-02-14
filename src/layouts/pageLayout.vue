<template>
  <div class="page-layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'pageLayout'
})
</script>

<style lang="less" scoped>
</style>
