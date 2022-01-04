<template>
  <div class="edit-cus-controller">
    <div class="row">
      <div class="col3">
        <span class="set-label">类型:</span>
        <a-select v-model:value="content.type" style="width: 100px">
          <a-select-option v-for="item in CONSTANTS.types" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div class="col3">
        <span class="set-label">名称:</span>
        <a-input v-model:value="content.label" style="width: 100px"></a-input>
      </div>
      <div class="col3">
        <span class="set-label">字段:</span>
        <a-input v-model:value="content.value" style="width: 100px"></a-input>
      </div>
    </div>

    <div v-if="content.type === 'select' || content.type === 'checkBox'">
      <div class="s-title">数据配置: <div class="btn add-point" @click="addPoint">新增</div></div>
      <div class="row" v-for="(item, index) in content.points" :key="index">
        <div class="col2">
          <span class="set-label">名称:</span>
          <a-input v-model:value="item.label" style="width: 100px"></a-input>
        </div>
        <div class="col2">
          <span class="set-label">字段:</span>
          <a-input v-model:value="item.value" style="width: 100px"></a-input>
        </div>
        <div class="operate">
          <div class="btn delete-point" @click="() => deletePoint(index)">删除</div>
        </div>
      </div>
    </div>

    <div v-if="content.type === 'rangePicker'">
      <div class="row">
        <div class="col3">
          <span class="set-label">显示时间:</span>
          <a-checkbox v-model:checked="content.showTime"></a-checkbox>
        </div>
        <div class="col3">
          <span class="set-label">时间格式:</span>
          <a-select v-model:value="content.format" style="width: 100px">
            <a-select-option v-for="item in CONSTANTS.times" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue';
const CONSTANTS = {
  types: [
    { label: '搜索框', value: 'input'},
    { label: '选择框', value: 'select'},
    { label: '选择按钮', value: 'checkBox'},
    { label: '时间选择框', value: 'rangePicker'},
  ],
  times: [
    { label: '年-月-日 时:分:秒', value: 'YYYY-MM-DD HH:mm:ss'},
    { label: '年/月/日 时:分:秒', value: 'YYYY/MM/DD HH:mm:ss'},
    { label: '年月日 时分秒', value: 'YYYY年M月D日 H时m分s秒'},
  ],
}

export default defineComponent({
  name: 'edit-cus-controller',
  components:{
  },
  props:{
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    points: {
      type: Array,
      default: () => []
    },
  },
  setup(props) {
    let content = reactive(props.formData.content || {});
    watch(() => props.formData, (d) => {
      content.value = d.content
    })

    // 增加点
    const addPoint = () => {
      content.points = [...(content.points || []), {label: '', value: ''}]
    }
    // 删除点
    const deletePoint = (i) => {
      content.points.splice(i, 1)
    }

    return {
      content,
      CONSTANTS,
      addPoint,
      deletePoint
    }
  }
})
</script>
<style lang="less" scoped>
.edit-cus-controller {
  width: 100%;
  .s-title {
    position: relative;
    margin: 13px 0 8px 0;
    font-size: 14px;
    font-weight: 600;
  }
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    .set-label {
      display: inline-block;
      line-height: 30px;
      // min-width: 30%;
      text-align: right;
      padding-right: 8px;
    }
    .color-label {
      position: relative;
      top: -11px;
    }
    .col2 {
      width: 50%;
    }
    .col3 {
      width: 33%;
    }
  }

  .operate {
    position: relative;
  }
  .btn {
    position: absolute;
    right: 0;
    width: 35px;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
  } 
  .add-point {
    top: 1px;
    background-color: @normal;
  }
  .delete-point {
    top: 6px;
    background-color: @delete;
  }
}
</style>