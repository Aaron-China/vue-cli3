<template>
  <div class="cus-controller">
    <div class="row" v-if="formData.type === 'input'">
      <span class="set-label">{{formData.label}}:</span>
      <a-input-search
        style="width: 100%"
        enter-button
        @search="handleChange"
      />
    </div>

    <div class="row" v-if="formData.type === 'select'">
      <span class="set-label">{{formData.label}}:</span>
      <a-select style="width: 100%" @change="handleChange">
        <a-select-option v-for="item in formData.points" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>

    <div class="row" v-if="formData.type === 'checkBox'">
      <span class="set-label check-label">{{formData.label}}:</span>
      <a-checkbox-group :options="formData.points" @change="handleChange" />
    </div>

    <div class="row" v-if="formData.type === 'rangePicker'">
      <span class="set-label">{{formData.label}}:</span>
      <a-range-picker 
        style="width: 100%" 
        :format="formData.format"
        :show-time="formData.showTime"
        @ok="handleChange"
      />
    </div>
  </div>
</template>

<script>
// 控制器组件
import { defineComponent } from 'vue';
import dayjs from 'dayjs'

export default defineComponent({
  name: 'cus-controller',
  props:{
    id: {        // 组件是否绑定动态数据源
      require: true,
      default: ''
    },
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
  setup(props, { emit }) {
    const handleChange = (v) => {
      const {value, type, format = ''} = props.formData;
      let data = {};
      if(type === 'input' || type === 'select' || type === 'checkBox') {
        data[value] = v
      } else if(type === 'input' || type === 'select' || type === 'checkBox') {
        data[value] = format ? [
          dayjs(v[0]).format(format),
          dayjs(v[1]).format(format)
        ]: v
      }
      emit('onChange', {id: props.id, type, data})
    }

    return {
      handleChange
    }
  }
})
</script>
<style lang="less" scoped>
.cus-controller {
  width: 100%;
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    .set-label {
      display: inline-block;
      line-height: 30px;
      min-width: 30%;
      text-align: right;
      padding-right: 8px;
    }
    .check-label{
      line-height: 20px;
    }
  }
}
</style>