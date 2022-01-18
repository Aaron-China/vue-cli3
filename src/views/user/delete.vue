<template>
  <div>
    删除
    <a-input />
  </div>
</template>

<script>
import { defineComponent, onMounted, onActivated, onDeactivated } from 'vue';
export default defineComponent({
  name: 'delete',
  components: {},
  setup() {
    onMounted(() => {
      console.log('delete onMounted')
    })
    onActivated(() => {
      console.log('delete onActivated')
    })
    onDeactivated(() => {
      console.log('delete onDeactivated')
    })
  }
})
</script>

<style scoped>
</style>
