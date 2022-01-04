<template>
  <div class="c-color-picker">
    <div 
      class="picker"
      :style="{top: '-170px', ...cusStyle}"
    >
      <color-picker
        v-show="visible"
        :color="value"
        :sucker-hide="true"
        @changeColor="onChange"
      />
    </div>
    <div class="block" :style="{backgroundColor: value}" @click="onClick"></div>
  </div>
</template>

<script>
//二次封装的颜色选择器组件
import { defineComponent, ref } from 'vue';
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

export default defineComponent({
  name: 'c-color-picker',
  components: {
    ColorPicker
  },
  props:{
    value: {},
    cusStyle: {   // 颜色选择器的样式，比如位置等
      type: Object,
      default: () => {
        return {
          top: '-170px',
          left: '37px'
        }
      }
    }
  },
  setup(props, { emit }) {
    let visible = ref(false);

    const onClick = () => {
      visible.value = !visible.value
    };
    const onChange = (v) => {
      emit('change', v.hex)
    };

    return {
      visible,
      onClick,
      onChange
    }
  }
})
</script>
<style lang="less" scoped>
.c-color-picker {
  position: relative;
  display: inline-block;
  width: 60px;
  .block {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid gray;
  }
  .picker {
    position: absolute;
    z-index: 99;
  }
}
</style>