<template>
  <div class="edit-cus-text">
    <div class="s-title">内容:</div>
    <div class="row">
        <a-textarea class="text" v-model:value="content.text" :rows="3" />
    </div>
    <div class="s-title">总样式:</div>
    <div class="row">
      <div class="col4">
        <span class="set-label">字体大小:</span>
        <a-input v-model:value="content.fontSize" style="width: 100px" addon-after="px"></a-input>
      </div>
      <div class="col4">
        <span class="set-label">字体宽度:</span>
        <a-select
          v-model:value="content.fontWeight"
          :getPopupContainer="triggerNode => triggerNode.parentNode"
          style="width: 100px"
        >
          <a-select-option v-for="item in SETTING.fontWeight" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div class="col4">
        <span class="set-label">位置:</span>
        <a-select
          v-model:value="content.textAlign"
          :getPopupContainer="triggerNode => triggerNode.parentNode"
          style="width: 100px"
        >
          <a-select-option v-for="item in SETTING.textAlign" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div class="col4">
        <span class="set-label color-label">字体颜色:</span>
        <color-picker v-model:value="content.color" :cusStyle="{right: '75px'}" @change="(v) => changeColor(v, 'all')" />
      </div>
    </div>
    <div class="s-title">数据配置: <div class="btn add-point" @click="addPoint">新增</div></div>
    <div v-for="(item, index) in content.points" :key="index">
      <div class="row">
        <div class="col3">
          <span class="set-label">数据点:</span>
          <a-select
            v-model:value="item.point"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            style="width: 100px"
          >
            <a-select-option v-for="item in points" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
        <div class="col3">
          <span class="set-label">字体大小:</span>
          <a-input v-model:value="item.fontSize" style="width: 100px" addon-after="px"></a-input>
        </div>
        <div class="col3">
          <span class="set-label">字体宽度:</span>
          <a-select
            v-model:value="item.fontWeight"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            style="width: 100px"
          >
            <a-select-option v-for="item in SETTING.fontWeight" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
        <div class="operate">
          <div class="btn delete-point" @click="() => deletePoint(index)">删除</div>
        </div>
      </div>
      <div class="row">
        <div class="col3">
          <span class="set-label">位置:</span>
          <a-select
            v-model:value="item.textAlign"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            style="width: 100px"
          >
            <a-select-option v-for="item in SETTING.textAlign" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
        <div class="col3">
          <span class="set-label">换行:</span>
          <a-select
            v-model:value="item.lineBreak"
            allowClear
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            style="width: 100px"
          >
            <a-select-option v-for="item in SETTING.lineBreak" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
        <div class="col3">
          <span class="set-label color-label">字体颜色:</span>
          <color-picker v-model:value="item.color" :cusStyle="{right: '75px'}" @change="(v) => changeColor(v, index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue';
import { ColorPicker } from '@components/index.js'
import { message } from 'ant-design-vue';
const SETTING = {
  fontWeight: [
    { label: '加粗', value: 700},
    { label: '正常', value: 400},
    { label: '变细', value: 100},
  ],
  lineBreak: [
    { label: '不换行', value: 'span'},
    { label: '换行', value: 'div'},
  ],
  textAlign: [
    { label: '靠左', value: 'left'},
    { label: '居中', value: 'center'},
    { label: '靠右', value: 'right'},
  ]
}

export default defineComponent({
  name: 'edit-cus-text',
  components: {
    ColorPicker
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

    // 颜色修改的回调
    const changeColor = (v, i) => {
      if(i === 'all') {
        content.color = v
      } else {
        content.points[i].color = v
      }
    }
    // 增加数据点
    const addPoint = () => {
      if(props.points && props.points.length) {
        content.points.push({point: props.points[0].value})
        content.text += `$${content.points.length }`
      } else {
        message.error('暂无数据点，请配置数据源和数据处理模板')
      }
    }
    // 删除数据点
    const deletePoint = (i) => {
      content.points.splice(i, 1)
      content.text.replace(`$${i + 1}`, '');
    }

    return {
      content,
      SETTING,
      changeColor,
      addPoint,
      deletePoint,
    }
  }
})
</script>
<style lang="less" scoped>
.edit-cus-text {
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
      min-width: 30%;
      text-align: right;
      padding-right: 8px;
    }
    .color-label {
      position: relative;
      top: -11px;
    }
    .col4 {
      width: 25%;
    }
    .col3 {
      width: 33%;
    }
  }
  .text {
    width: 70%;
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