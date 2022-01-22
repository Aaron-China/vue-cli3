<template>
  <div>
    新增
    <a-input />
  </div>
</template>

<script>
// 这里我只做路由测试，对最新的keep-alive用法做个示例，所以在根布局没有使用缓存，实际应用中，注意他的层层包裹
// 单层缓存，只能缓存子元素，深层嵌套的无法缓存，如果需要，再写一层keep-alive包裹
// 可以缓存，但是在 pageLayout 内的元素，无论是否缓存，跳转都没问题
// 但是如果跳转到 basicLayout 下，层级比使用keep-alive还要高了，就会有跳转到keep-alive之外，再跳回来导致不缓存
// 这还是嵌套问题，如果要解决，就必须basicLayout也加上keep-alive
import { defineComponent, onMounted, onActivated, onDeactivated } from 'vue';
export default defineComponent({
  name: 'add',
  components: {},
  setup() {
    onMounted(() => {
      console.log('add onMounted')
    })
    onActivated(() => {
      console.log('add onActivated')
    })
    onDeactivated(() => {
      console.log('add onDeactivated')
    })
  }
})
</script>

<style lang="less">
</style>
