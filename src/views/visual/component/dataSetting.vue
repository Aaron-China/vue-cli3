<template>
  <div class="data-setting">
    <pre><code>{{data}}</code></pre>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'dataSetting',
  props: {
    data: {}
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.data-setting {
  width: 100%;
  height: calc(100% - 130px);
  overflow: auto;
}
</style>
