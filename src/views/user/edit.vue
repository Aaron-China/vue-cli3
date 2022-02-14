<template>
  <div>
    编辑
    <a-input />
  </div>
</template>

<script>
import { defineComponent, onMounted, onActivated, onDeactivated } from 'vue';
export default defineComponent({
  name: 'edit',
  components: {},
  setup() {
    onMounted(() => {
      console.log('edit onMounted')
    })
    onActivated(() => {
      console.log('edit onActivated')
    })
    onDeactivated(() => {
      console.log('edit onDeactivated')
    })
  }
})
</script>
<style scoped>
</style>
