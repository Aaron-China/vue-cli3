<template>
  <component 
    class="cus-comp" 
    :is="formData.type" 
    :dynamic="!!formData.datasourceId" 
    :formData="formData.content" 
    :dataSource="dataSource" 
    @onChange="handleChange"
  />
</template>

<script>
// 图片组件，仅支持单张图片
import { defineComponent, ref, watch } from 'vue';
import cusComponent from './index'
import { getData } from "@api/visual";
import { getCompData } from '@utils/util.js'

export default defineComponent({
  name: 'base-component',
  components: {
    ...cusComponent,
  },
  props:{
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, { emit }) {
    let dataSource = ref({}); 
    watch(() => props.formData, (d) => {
      if(d.datasourceId) getDataSource(d.datasourceId);
    })

    // 根据数据源类型，获取具体数据
    // parameter 参数，直接使用，每个数据源收集参数时，都会处理好，是自己能直接使用的格式
    const getDataSource = (id, parameter) => {
      if(id) {
        getData({id}).then(res => {
          if (res.code === 200) {
            try {
              dataSource.value = getCompData(res.data, parameter);
            } catch (error) {
              console.log(error)
            }
          } else {
            message.error(res.msg)
          }
        })
      }
    }
    // 目前只有控制器有回调的需要
    const handleChange = (v) => {
      emit('onControl', v)
    }

    getDataSource(props.formData.datasourceId);

    return {
      dataSource,
      handleChange
    }
  }
})
</script>
<style lang="less" scoped>
.cus-comp {
  box-sizing: border-box;
  margin-top: calc(@titleHeight + 10px);
}
</style>