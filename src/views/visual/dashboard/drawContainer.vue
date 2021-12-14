<template>
  <div 
    class="draw-container"
    :style="{
      ...style,
      width: `${newSite.width}px`, 
      height: `${newSite.height}px`, 
      top: `${newSite.top}px`, 
      left: `${newSite.left}px`, 
    }"
    @click="handleClick"
  >
    <slot class="contain" name="content"></slot>
    <div class="site" v-if="checked" draggable="true" @dragstart="start" @drag="drag" @dragend="drop">
      <div class="size" draggable="true" @dragstart="sizeStart" @drag="sizeDrag" @dragend="sizeDrop"></div>
    </div>
    <div class="tool">
      <UnorderedListOutlined class="icon" />
      <div class="btn">
        <div @click="(e) => handleChange(e, 'edit')">编辑</div>
        <div @click="(e) => handleChange(e, 'up')">上移一层</div>
        <div @click="(e) => handleChange(e, 'down')">下移一层</div>
        <div @click="(e) => handleChange(e, 'max')">移至顶层</div>
        <div @click="(e) => handleChange(e, 'min')">移至底层</div>
        <div @click="(e) => handleChange(e, 'delete')">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { UnorderedListOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    UnorderedListOutlined,
  },
  props: {
    id: {},
    checked: {
      type: Boolean,
      default: false
    },
    site: {
      type: Object,
    },
    conStyle: {
      type: Object
    }
  },
  setup(props, { emit }) {
    let newSite = reactive({...props.site});
    let position = {x: 0, y: 0};
    let style = computed(() => props.conStyle);

    // 点击  选中 取消选中
    const handleClick = (e) => {
      e.stopPropagation()
      emit('onCheck', props.id)
    }
    // 位置移动  开始拖拽
    const start = (e) => {
      position = {
        x: e.screenX,
        y: e.screenY
      }
    }
    // 位置移动  拖拽中
    const drag = (e) => {
      let x = e.screenX - position.x, y = e.screenY - position.y;
      position = {
        x: e.screenX,
        y: e.screenY
      };
      newSite.top = newSite.top + y;
      newSite.left = newSite.left + x;
    }
    // 位置移动  结束拖拽
    const drop = (e) => {
      let x = e.screenX - position.x, y = e.screenY - position.y;
      position = {
        x: e.screenX,
        y: e.screenY
      };
      newSite.top = newSite.top + y;
      newSite.left = newSite.left + x;
      emit('onChange', {type: 'site', obj: {id: props.id, ...newSite}})
    }
    // 大小修改  开始拖拽
    const sizeStart = (e) => {
      position = {
        x: e.screenX,
        y: e.screenY
      }
    }
    // 大小修改  拖拽中
    const sizeDrag = (e) => {
      let x = e.screenX - position.x, y = e.screenY - position.y;
      position = {
        x: e.screenX,
        y: e.screenY
      };
      newSite.width = newSite.width + x;
      newSite.height = newSite.height + y;
    }
    // 大小修改  结束拖拽
    const sizeDrop = (e) => {
      let x = e.screenX - position.x, y = e.screenY - position.y;
      position = {
        x: e.screenX,
        y: e.screenY
      };
      newSite.width = newSite.width + x;
      newSite.height = newSite.height + y;
      emit('onChange', {type: 'size', obj: {id: props.id, ...newSite}})
    }
    // 操作按钮 编辑、删除、图层层级调整等
    const handleChange = (e, k) => {
       e.stopPropagation()
      emit('onChange', {type: k, obj: {id: props.id}})
    }


    return {
      style,
      newSite,
      handleClick,
      start,
      drag,
      drop,
      sizeStart,
      sizeDrag,
      sizeDrop,
      handleChange
    }
  }
})
</script>

<style lang="less" scoped>
.draw-container {
  position: absolute;
  .contain {
    position: relative;
  }
  .site {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid red;
    cursor: move;
    .size {
      position: absolute;
      bottom: -5px;
      right: -5px;
      width: 6px;
      height: 6px;
      background-color: red;
      cursor: se-resize;
    }
  }
  .tool{
    position: absolute;
    top: -2px;
    right: 3px;
    width: 13px;
    height: 13px;
    &:hover .btn {
      display: block;
    }
    .icon {
      cursor: pointer;
    }
    .btn {
      width: 55px;
      display: none;
      margin-top: -3px;
      font-size: 11px;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      background-color: #fff;
      div {
        padding: 2px 5px;
        text-align: center;
        cursor: pointer;
        word-break: keep-all;
        &:hover {
          color: #fff;
          background-color: #1890FF;
        }
      }
    }
  }
}
</style>
