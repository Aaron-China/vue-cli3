<template>
  <div class="cus-text">
  </div>
</template>

<script>
// 一个可以批量输入的组件，换行自动切换数据，输出逗号分隔的字符串
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'cus-text',
  components:{
  },
  props:{
    value: { // 值
      type: String,
    },
  },
  setup() {
    const visible = ref(false);     // 显示弹窗

    return {
      visible,
    }
  }
})
</script>
<style lang="less" scoped>
.cus-text {
  width: 100%;
}
</style>