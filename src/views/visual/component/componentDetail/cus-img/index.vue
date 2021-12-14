<template>
  <div class="cus-img" :style="{textAlign: content.textAlign || 'left'}">
    <img :style="{...style}" :src="content.src" :title="content.title || ''" />
  </div>
</template>

<script>
// 图片组件，仅支持单张图片
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'cus-img',
  props:{
    dynamic: {        // 组件是否绑定动态数据源
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataSource: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    const content = ref(''), style = ref({}); 
    watch(() => [props.formData, props.dataSource], (d) => {
      init(d[0], d[1])
    })

    const init = (f, d) => {
      try {
        let s = {};
        if(f.unit) s.width = `${f.width}${f.unit}`;
        if(f.mUnit) s.padding = `${f.t || 0}${f.mUnit} ${f.r || 0}${f.mUnit} ${f.b || 0}${f.mUnit} ${f.l || 0}${f.mUnit}`;
        if(f.srcD) d.src = d[f.srcD]
        if(f.titleD) d.title = d[f.titleD]

        style.value = {...s}
        content.value = {...d}
      } catch (err) {
        console.log(err)
      }
    }

    init(props.formData, props.dataSource);

    return {
      style,
      content
    }
  }
})
</script>
<style lang="less" scoped>
.cus-img {
  width: 100%;
}
</style>