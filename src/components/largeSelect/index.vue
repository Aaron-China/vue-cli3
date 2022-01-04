<template>
  <div :class="['c-large-select', uid]">
    <a-select 
      style="width: 100%"
      showSearch
      :allowClear="allowClear"
      :value="value"
      :open="open"
      :getPopupContainer="triggerNode => triggerNode.parentNode"
      :filter-option="(input, option) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }"
      :placeholder="placeholder"
      @search="handleSearch"
      @change="handleChange"
      @dropdownVisibleChange="handleDrop"
    >
      <a-select-option v-for="op in selectData.list" :key="op.value" :title="op.title || op.label" :value="op.value">
        {{op.label}}
      </a-select-option>
    </a-select>
    <div v-show="open && selectData.res.length > rows" class="sc" :style="{height: listHeight+'px'}">
      <div class="scbc" :style="{height: totalHeight+'px'}"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount } from 'vue';
const ROWS = 8,           // 局部渲染的数据条数
      HEIGHT = 31.6,      // 每行的高度
      LISTHEIGHT = 250;   // 可视高度

export default defineComponent({
  name: 'largeSelect',
  props: {
    value: {
      default: null
    },
    allowClear: {
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 下拉列表的list
    list: {
      type: Array,
      default: () => []
    },
    rows: {   // 可视区域高度
      type: Number,
      default: ROWS
    },
    rowHeight: { // 每行的高度
      type: Number,
      default: HEIGHT
    },
    listHeight: { // 可是区域高度
      type: Number,
      default: LISTHEIGHT
    },
  },
  setup(props, { emit }) {
    let uid = ref('');            // 唯一id，用于监听事件
    let totalHeight = ref(250.0);   // 总高度
    let selectData = reactive({
      list: [],                   // 下拉列表数据
      res: [],                    // 下拉列表所有数据，主要针对搜索的情况需要及时变化滚动条
    });
    let open = ref(false);        // 下拉列表是否展开了
    let idx = 0,                  // 当前开始下标
        scrollEle = '',           // 滚动条dom对象
        mousedown = false;        // 自定义滚动条按下事件标志

    // 初始化事件
    const initScroll = () => {
      if(!scrollEle && selectData.res.length > props.rows) {
        let node = document.querySelector(`.${uid.value} .sc`);
        if(node) {
          scrollEle = node
          node.addEventListener('scroll', handleScroll);
          node.addEventListener('mousedown', handleMouse(true));
          node.addEventListener('mouseup', handleMouse(false));
        }
      }
      if(scrollEle && selectData.res.length > props.rows) {
        scrollEle.scrollTop = 0
      }
    }
    // 监听鼠标事件的方法
    const handleMouse = (v) => {
      mousedown = v
    }
    // 监听虚拟滚轮变化，计算展示的数据
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight } = e.target
      let lenMax = selectData.res.length, nIdx;
      if(scrollTop === 0) { // 滑到顶，从头展示
        selectData.list = selectData.res.slice(0, props.rows)
        idx = 0
      } else if(scrollTop - (scrollHeight - props.listHeight) > -props.rowHeight ) { // 滑到底了，但是js监听精度不准，需要做一行的误差容错
        nIdx = lenMax - props.rows
        selectData.list = selectData.res.slice(nIdx, nIdx + props.rows)
        idx = nIdx
      } else {  // 其他情况，照常处理数据
        nIdx = Math.ceil(scrollTop * lenMax / scrollHeight)
        if(nIdx !== idx && nIdx <= (lenMax - props.rows)) {
          selectData.list = selectData.res.slice(nIdx, nIdx + props.rows)
          idx = nIdx
        }
      }
    }
    const handleSearch = (d) => {
      let newList = props.list.filter(item => item.label.toLowerCase().indexOf(d.toLowerCase()) >= 0);
      selectData.list = newList.slice(0, props.rows);
      selectData.res = newList;
      totalHeight.value = newList.length * props.rowHeight;
    }
    const handleChange = (d, op) => {
      if(props.list.length > props.rows) {
        let tar = props.list.find(item => item.value === d)
        selectData.list = [tar, ...props.list.filter(item => item.value !== d).slice(0, props.rows - 1)]
        selectData.res = [...props.list]
        totalHeight.value = selectData.res.length * props.rowHeight
      }
      let tar = props.list.find(item => item.value === d)
      emit('change', d, op, tar)
    }
    const handleDrop = (d) => {
      open.value = mousedown ? true : d
    }

    selectData.list = props.list.length > props.rows ? props.list.slice(0, props.rows) : props.list;
    selectData.res = [...props.list];
    totalHeight.value = props.list.length * props.rowHeight
    uid.value = `s_${(new Date()).valueOf()}`;

    onMounted(() => {
      initScroll();
    })
    onBeforeUnmount(() => {
      if(scrollEle) {
        let sc = document.querySelector(`.${uid.value} .sc`);
        if(sc) {
          sc.removeEventListener('scroll', handleScroll, false);
          sc.removeEventListener('mousedown', handleMouse, false);
          sc.removeEventListener('mouseup', handleMouse, false);
        }
        scrollEle = "";
      }
      open.value = false;
      selectData.list = [];
      selectData.res = [];
    })

    return {
      uid,
      totalHeight,
      selectData,
      open,
      handleSearch,
      handleChange,
      handleDrop,
    }
  }
})
</script>

<style lang="less" scoped>
  .c-large-select {
    position: relative;
    .sc {
      position: absolute;
      top: 40px;
      right: 0;
      width: 16px;
      overflow-x: hidden;
      overflow-y: scroll;
      z-index: 9999;
      .scbc {
        width: 15px;
        border-radius: 2px;
        background-color: #F1F1F1;
      }
    }
  }
</style>
