<template>
  <div>
    <large-table
      :loading="table.loading"
      :selected="true"
      :columns="columns"
      :dataSource="table.dataSource"
      :pagination="table.pagination"
      :total="table.pagination.total"
      :selectedRow="table.selectedRowId"
      @selectChange="handleSelect"
    >
    </large-table>

    <c-modal
      :visible="modal.visible"
      :title="modal.title"
      @onClose="handleModal"
    ></c-modal>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { LargeTable, CModal } from '@components/index.js'

export default defineComponent({
  name: 'role',
  components: {
    CModal,
    LargeTable,
  },
  setup () {
    const table = reactive({
      loading: false,
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      selectedRowId: [],
      selectedRowKeys: []
    });
    const modal = reactive({
      visible: false,
      title: '测试自定义弹窗'
    })
    const columns = [
      { title: '工厂名称', dataIndex: "factoryName", width: 130 },
      { title: '物料编码', dataIndex: "materialCode", width: 90, maxLength: 5 },
      { title: '物料名称', dataIndex: "materialName", width: 70, ellipsis: true },
      { title: 'BOM层级', dataIndex: "bomLevel", width: 80 },
      { title: '版本号', dataIndex: "version", width: 80 },
      { title: '数量', dataIndex: "qty", width: 100 },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 70,
        align: 'center',
        customRender: ({ record }) => {
          return (<a onClick={() => handleModal(record)}>编辑</a>)
        }
      }
    ];
    let list = [];
    for (let i = 0; i < 8000; i++) {
      list.push({id: i, factoryName: `${i+1}测试数据`, materialCode: 'wqeweq请问请二无群二', materialName: 'ewrewwqeweq请问请二无群二第三方第三方'});
    }
    table.dataSource = list;
    table.pagination.current = 1;
    table.pagination.pageSize = 8000;
    table.pagination.total = 8000;

    const handleModal = () => {
      modal.visible = !modal.visible
    }
    // 选择表格数据
    const handleSelect = (keys, rows) => {
      table.selectedRowId = [...keys];
      table.selectedRowKeys = rows;
    }

    return {
      columns,
      table,
      modal,
      handleModal,
      handleSelect,
    }
  }
})
</script>

<style scoped>
</style>
