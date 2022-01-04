<template>
  <component 
    class="cus-comp" 
    :is="formData.type" 
    :dynamic="!!formData.datasourceId" 
    :id="formData.id"
    :formData="formData.content" 
    :dataSource="dataSource" 
    @onChange="handleChange"
  />
</template>

<script>
// 图片组件，仅支持单张图片
import { defineComponent, ref, watch } from 'vue';
import cusComponent from './index'
import { message } from 'ant-design-vue';
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
    parameter: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, { emit }) {
    let dataSource = ref({}); 
    watch(() => [props.formData, props.parameter], (d) => {
      let flag = (d[0].controller || []).some(i => i === d[1].id);
      if(d[0].datasourceId) getDataSource(d[0].datasourceId, flag ? d[1] : null);
    })

    // 根据数据源类型，获取具体数据
    // p 参数，直接使用，每个数据源收集参数时，都会处理好，是自己能直接使用的格式
    const getDataSource = (id, p) => {
      if(id) {
        let param = { id };
        if(p) param.query = p
        console.log(param)
        getData(param).then(res => {
          if (res.code === 200) {
            try {
              dataSource.value = getCompData(res.data, p);
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