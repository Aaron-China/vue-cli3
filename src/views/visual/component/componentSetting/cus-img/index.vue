<template>
  <div class="edit-cus-text">
    <div class="row">
      <span class="set-label">图片地址:</span>
      <a-input v-model:value="content.src" style="width: 150px"></a-input>
      <span class="set-label">动态地址:</span>
      <a-select v-model:value="content.srcD" style="width: 150px">
        <a-select-option v-for="item in points" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div class="row">
      <span class="set-label">提示信息:</span>
      <a-input v-model:value="content.title" style="width: 150px"></a-input>
      <span class="set-label">动态信息:</span>
      <a-select v-model:value="content.titleD" style="width: 150px">
        <a-select-option v-for="item in points" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div class="row">
      <span class="set-label">图片宽度:</span>
      <a-input v-model:value="content.width" style="width: 200px">
        <template #addonAfter>
          <a-select v-model:value="content.unit" style="width: 70px">
            <a-select-option value="px">像素</a-select-option>
            <a-select-option value="%">%</a-select-option>
          </a-select>
        </template>
      </a-input>
    </div>
    <div class="row">
      <span class="set-label">位置:</span>
      <a-select
        v-model:value="content.textAlign"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
        style="width: 200px"
      >
        <a-select-option v-for="item in SETTING.textAlign" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div class="row">
      <span class="set-label">边距:</span>
      上 <a-input v-model:value="content.t" style="width: 70px"></a-input>
      下 <a-input v-model:value="content.b" style="width: 70px"></a-input>
      左 <a-input v-model:value="content.l" style="width: 70px"></a-input>
      右 <a-input v-model:value="content.r" style="width: 70px"></a-input>
      <a-select v-model:value="content.mUnit" style="width: 70px">
        <a-select-option value="px">像素</a-select-option>
        <a-select-option value="%">%</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
// 一个可以批量输入的组件，换行自动切换数据，输出逗号分隔的字符串
import { defineComponent, reactive, watch } from 'vue';
const SETTING = {
  textAlign: [
    { label: '靠左', value: 'left'},
    { label: '居中', value: 'center'},
    { label: '靠右', value: 'right'},
  ]
}

export default defineComponent({
  name: 'edit-cus-img',
  components: {},
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

    return {
      content,
      SETTING,
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
    width: 100%;
    margin-bottom: 10px;
    .set-label {
      display: inline-block;
      line-height: 30px;
      min-width: 15%;
      text-align: right;
      padding-right: 8px;
    }
  }
}
</style>