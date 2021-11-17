<template>
  <div class="c-modal" v-show="visible">
    <div 
      class="u-container"
      :style="{ ...styles }"
    >
      <div class="u-header">
        <CloseOutlined class="u-close" @click="handleClose" />
        {{title}}
      </div>
      <div class="u-body">
        <slot style="width: 100%; height: 100%" name='content'></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 一个显示隐藏的modal， 没有foorter， 也不销毁dom
import { defineComponent } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'c-modal',
  components: {
    CloseOutlined,
  },
  props:{
    visible: {  // 显示隐藏
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => {
        return {
          top: '25px',
          width: '95%',
          marginLeft: '-47.5%'
        }
      }
    },
    onClose: {
      type: Function,
      default: () => {}
    },
  },
  setup(props, { emit }) {
    // 关闭弹窗
    const handleClose = () => {
      emit('onClose')
    }

    return {
      handleClose
    }
  }
})
</script>
<style lang="less" scoped>
  .c-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    .u-container {
      position: absolute;
      left: 50%;
      background-color: white;
      overflow: hidden;
      border-radius: 5px;
    }
    .u-header {
      position: relative;
      padding: 15px;
      min-height: 50px;
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid #C4C4C4;
      .u-close {
        position: absolute;
        right: 20px;
        top: 19px;
        cursor: pointer;
      }
    }
    .u-body {
      min-height: 300px;
      padding: 20px;
    }
  }
</style>