<template>
  <div class="c-table" >
    <a-table
      :loading="loading"
      :columns="columns"
      :row-key="record => record[rowKey]"
      :rowClassName="(row, idx) => { return idx % 2 === 1? 'dark-row' : 'light-row'}"
      :data-source="dataSource"
      :row-selection="selected ? { selectedRowKeys: selectedRowKeys, onChange: handleSelect, onSelectAll: handleSelectAll } : null"
      @change="handleTableChange"
      :pagination="!!pagination ? {showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['20', '50', '100', '200', '500', '1000'], ...pagination} : false"
      :scroll="{x: scrollX || true, y: totalHeight - scrollY}"
    >
    </a-table>

    <span class="totalTip" :style="{top: !!pagination ? '-27px' : '6px'}">共 {{total}} 条数据</span>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'c-table',
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
      default: () => { 
        return {
          current: 1,
          pageSize: 20,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["20", "50", "100", "200", "500", "1000"]
        }
      }
    },
    selected: { // 是否可选
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Number,
    },
    scrollY: {
      type: Number,
      default: 300
    },
    selectChange: { // 可选的回调
      type: Function,
    }, 
    tableChange: { // 分页、筛选、排序的回调
      type: Function,
    },
    selectedRow: {
      type: Array,
      default: () => { return [] }
    },
    total: { 
      type: Number,
      default: 0
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const selectedRowKeys = ref(props.selectedRow || []);
    const totalHeight = store.state.app.totalHeight

    // 表格页码变化、排序、筛选回调
    const handleTableChange = (pagination, filters, sorter) => {
      emit("tableChange", pagination, filters, sorter);
    }
    // 单选回调
    const handleSelect = (d, dl) => {
      selectedRowKeys.value = d
      if(props.selected) emit("selectChange", d, dl);
    }
    // 全选回调，需要手动填充数据
    const handleSelectAll = (d) => {
      let keys = [], dates = []
      if(d) {
        keys = props.dataSource.map(item => item[props.rowKey])
        dates = [...props.dataSource]
      }
      handleSelect(keys, dates)
    }

    return {
      totalHeight,
      selectedRowKeys,
      handleTableChange,
      handleSelect,
      handleSelectAll
    }
  }
})
</script>

<style lang="less">
  .c-table {
    position: relative;
    color: #000C17;
    .totalTip {
      position: relative;
      top: -27px;
    }
    .ant-table-pagination.ant-pagination {
      margin: 12px 0 0 0 ;
    }
    .ant-table-thead > tr > th {
      background-color: #EEEFF3;
      padding: 6px 3px;
    }
    .ant-table-tbody > tr > td {
      padding: 3px 3px;
    }
    .light-row {
      background-color: #FFFFFF;
    }
    .dark-row {
      background-color: #F4F9FC;
    }
  }
</style>
