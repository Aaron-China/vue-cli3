<template>
  <div class="c-large-table" :style="{paddingRight: dataSource.length > rows ? '10px' : 0}">
    <a-table
      :loading="loading"
      :columns="tableColumns"
      :row-key="record => record[rowKey]"
      :data-source="state.tableData"
      :row-selection="selected ? { selectedRowKeys: state.selectedRowKeys, onChange: handleSelect, onSelectAll: handleSelectAll } : null"
      @change="handleTableChange"
      :pagination="pagination"
      :scroll="scroll"
    >
    </a-table>
    <div v-show="dataSource.length > rows" class="sc" :style="{height: tableHeight+'px'}">
      <div class="scbc" :style="{height: state.totalHeight+'px'}"></div>
    </div>
    <span class="totalTip">共 {{total}} 条数据</span>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
const ROWS = 15,          // 局部渲染的数据条数
      HEIGHT = 28.8,      // 每行的高度
      TABLEHEIGHT = 433;  // 表格可视高度

export default defineComponent({
  name: 'largeTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: () => { return [] }
    },
    rowKey: {
      type: String,
      default: "id"
    },
    columns: {
      type: Array,
      default: () => { return [] }
    },
    pagination: {
      type: Object,
      default: () => { 
        return {
          current: 1,
          pageSize: 20,
          tota: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["20", "50", "100", "200", "500", "1000", "2000"]
        }
      }
    },
    rows: {   // 可视区域展示多少行
      type: Number,
      default: ROWS
    },
    rowHeight: { // 每行的高度
      type: Number,
      default: HEIGHT
    },
    tableHeight: { // 可是区域高度
      type: Number,
      default: TABLEHEIGHT
    },
    selected: { // 是否可选
      type: Boolean,
      default: false
    },
    scroll: { // 横向滚动，禁止纵向滚动
      type: Object,
      default: () => { return {x: true} }
    },
    selectChange: { // 可选的回调
      type: Function,
    }, 
    tableChange: { // 分页、筛选、排序的回调
      type: Function,
    },
    selectedRow: { // 分页、筛选、排序的回调
      type: Array,
      default: () => { return [] }
    },
    total: { 
      type: Number,
      default: 0
    },
  },
  setup(props, { emit }){
    const state = reactive({
      scrollEle: '',
      tableData: [],
      selectedRowKeys: [],
      totalHeight: 433,  // 数据总高度
      idx: 0,            // 当前开始下标
    });
    const tableColumns = computed(() => {
      let col = props.columns.map(item => {
        if(!item.align) item.align = 'center'
        if(item.maxLength) {
          item.customRender = ({text}) => {
            if(text && (text.length >= item.maxLength)) {
              let short = text.slice(0, item.maxLength - 1)
              return (<div class="slice-str">{short}...<p class="slice-str-all">{text}</p></div>)
            } else {
              return text
            }
          }
        }
        return item
      })
      return col
    });
    watch(() => props.dataSource, v => {
      state.tableData = v.length > props.rows ? v.slice(0, props.rows) : v;
      state.totalHeight = v.length * props.rowHeight;
      initScroll();
    });
    watch(() => props.selectedRow, v => {
      state.selectedRowKeys = v;
    });
    state.tableData = props.dataSource.length > props.rows ? props.dataSource.slice(0, props.rows) : props.dataSource;
    state.totalHeight = props.dataSource.length * props.rowHeight;


    const initScroll = () => {
      if(!state.scrollEle && props.dataSource.length > props.rows) {
        let node = document.querySelector('.c-large-table .sc');
        if(node) {
          state.scrollEle = node
          document.querySelector('.c-large-table .sc').addEventListener('scroll', handleScroll);
        }
      }
      if(state.scrollEle && props.dataSource.length > props.rows) {
        state.scrollEle.scrollTop = 0
      }
    }
    const onShowSizeChange =(current, pageSize) => {
      emit("onShowSizeChange", current, pageSize);
    }
    const pageChange =(current, pageSize) => {
      emit("onChange", current, pageSize);
    }
    const handleTableChange =(pagination, filters, sorter) => {
      if(state.scrollEle) state.scrollEle.scrollTop = 0
      emit("tableChange", pagination, filters, sorter);
    }
    const handleSelect =(d, dl) => {
      state.selectedRowKeys = d
      if(props.selected) emit("selectChange", d, dl);
    }
    // 注意全选，需要手动填充数据
    const handleSelectAll =(d) => {
      let keys = [], dates = []
      if(d) {
        keys = props.dataSource.map(item => item[props.rowKey])
        dates = [...props.dataSource]
      }
      handleSelect(keys, dates)
    }
    // 监听虚拟滚轮变化，计算展示的数据
    const handleScroll =(e) => {
      const { scrollTop, scrollHeight } = e.target
      let lenMax = props.dataSource.length, nIdx;

      if(scrollTop === 0) {
        state.tableData = props.dataSource.slice(0, props.rows)
        state.idx = 0
      } else if(scrollTop === (scrollHeight - state.tableHeight)) {
        nIdx = lenMax - state.rows
        state.tableData = props.dataSource.slice(nIdx, nIdx + props.rows)
        state.idx = nIdx
      } else {
        nIdx = Math.ceil(scrollTop * lenMax / scrollHeight)
        if(nIdx !== state.idx && nIdx <= (lenMax - props.rows)) {
          state.tableData = props.dataSource.slice(nIdx, nIdx + props.rows)
          state.idx = nIdx
        }
      }
    }

    onMounted(() => {
      initScroll();
    });
    onBeforeUnmount(() => {
      if(state.scrollEle) {
        let sc = document.querySelector('.c-large-table .sc');
        if(sc) sc.removeEventListener('scroll', handleScroll);
        state.scrollEle = "";
      }
    });

    return {
      state,
      tableColumns,
      onShowSizeChange,
      pageChange,
      handleTableChange,
      handleSelect,
      handleSelectAll,
      handleScroll,
    }
  }
})
</script>

<style lang="less">
  .c-large-table {
    position: relative;
    .totalTip {
      position: relative;
      top: -27px;
    }
    .ant-table-pagination.ant-pagination {
      margin: 12px 0 0 0 ;
    }
    .slice-str {
      position: relative;
      cursor: default;
      .slice-str-all {
        position: absolute;
        top: 18px;
        left: 40px;
        z-index: 99;
        display: none;
        min-width: 200px;
        border-radius: 5px;
        padding: 2px;
        font-size: 12px;
        background-color: rgba(0,0,0,0.8);
        color: white;
        text-align: left;
      }
      &:hover .slice-str-all{
        display: block;
      }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
      padding: 3px 10px;
    }
    .sc {
      position: absolute;
      top: 25px;
      right: -6px;
      width: 16px;
      overflow-x: hidden;
      overflow-y: scroll;
      .scbc {
        width: 10px;
        border-radius: 2px;
        background-color: #F1F1F1;
      }
    }
  }
</style>
