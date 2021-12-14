<template>
  <div class="cus-text" v-html="content"></div>
</template>

<script>
// 文本组件，可以设置简单文本和样式
import { defineComponent, ref, watch } from 'vue';
const FONT_SIZE = 14;

export default defineComponent({
  name: 'cus-text',
  components:{
  },
  props:{
    dynamic: {        // 组件是否绑定动态数据源
      type: Boolean,
      default: false
    },
    formData: {       //组件配置
      type: Object,
      default: () => {
        return {}
      }
    },
    dataSource: {     // 组件数据，注意是纯正的可以直接使用的数据
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const content = ref(''); 
    watch(() => [props.formData, props.dataSource], (d) => {
      init(d[0], d[1]);
    })

    const init = (f, d) => {
      try {
        // 动态
        if(props.dynamic) {
          let str = f.text;
          (f.points || []).forEach((item, idx) => {
            str = str.replace(
              `$${idx + 1}`, 
              `<${item.lineBreak || 'span'} style="font-size:${item.fontSize||FONT_SIZE}px;font-weight:${item.fontWeight};color:${item.color};text-align:${item.textAlign};">${d[item.point] || ''}</${item.lineBreak || 'span'}>`
            );
          });
          content.value = `<div style="font-size:${f.fontSize||FONT_SIZE}px;font-weight:${f.fontWeight};color:${f.color};text-align:${f.textAlign};">${str}</div>`
        } else {
          content.value = `<div style="font-size:${f.fontSize||FONT_SIZE}px;font-weight:${f.fontWeight};color:${f.color};text-align:${f.textAlign};">${f.text}</div>`
        }
      } catch (err) {
        console.log(err)
      }
    }

    init(props.formData, props.dataSource);

    return {
      content
    }
  }
})
</script>
<style lang="less" scoped>
.cus-text {
  width: 100%;
}
</style>