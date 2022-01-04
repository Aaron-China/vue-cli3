<template>
  <div class="wrapper">
    <div class="list-box">
      <search-model :formList="formList" @onSearch="handleSearch">
        <template #tool-left>
          <a-button class="n-btn" @click="add" >新增</a-button>
          <a-button class="d-btn" style="margin-left: 15px;" @click="deleteM" >批量删除</a-button>
        </template>
      </search-model>
      <c-table
        :loading="table.loading"
        :selected="true"
        :columns="columns"
        :dataSource="table.dataSource"
        :pagination="table.pagination"
        :total="table.pagination.total"
        :selectedRow="table.selectedRowId"
        @tableChange="tableChange"
        @selectChange="handleSelect"
      >
      </c-table>
      <!-- 编辑弹窗 -->
      <edit-model
        :loading="modal.loading"
        :visible="modal.visible"
        :type="modal.type"
        :title="modal.title"
        :initData="modal.form"
        :formItems="modalFormList"
        @onClose="modalClose"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { SearchModel, CTable, EditModel } from '@components/index.js'
import { COMPONENTS_LIST, COMPONENTS_OBJ } from './constants'
import { getComponentList } from "@api/visual";

const formList = [
  { label: '类型', key: 'type', type: "select", option: COMPONENTS_LIST },
  { type: "btn" },
]
const modalFormList = [
  { label: '名称', key: 'title', type: "input", required: true },
  { label: '类型', key: 'type', type: "select", option: COMPONENTS_LIST, required: true },
  { label: '数据源', key: 'datasource', type: "select", option: [], required: true },
]

export default defineComponent({
  name: 'component-list',
  components: {
    SearchModel,
    CTable,
    EditModel
  },
  setup() {
    const router = useRouter();
    let search = reactive({});
    const columns = [
      { title: '名称', dataIndex: "title", width: 120, ellipsis: true },
      { title: '类型', dataIndex: "type", width: 90,
        customRender: ({ text }) => {
          return COMPONENTS_OBJ[text] || ''
        }
      },
      { title: '数据源', dataIndex: "datasourceName", width: 130 },
      { title: '是否绑定面板', dataIndex: "bind", width: 130,
        customRender: ({ text }) => {
          return text ? '绑定' : '未绑定'
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 70,
        align: 'center',
        customRender: ({ record }) => {
          return (<div>
            <a onClick={() => edit(record) }>编辑</a>
          </div>)
        }
      }
    ];
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
    let modal = reactive({
      loading: false,
      visible: false,
      title: '',
      type: 'add',
      form: {}
    });
    // 查询表格数据
    const getData = () => {
      table.loading = true
      getComponentList().then(res => {
        if (res.code === 200) {
          let d = res.data;
          table.dataSource = d.records;
          table.pagination.current = d.current;
          table.pagination.pageSize = d.size;
          table.pagination.total = d.total;
        }
        table.loading = false;
      })
      .catch(err => {
        console.log(err);
        table.loading = false;
      });
    }
    // 搜索
    const handleSearch = (data) => {
      search = { ...data }
      table.pagination.current = 1
      getData();
    }
    // 选择表格数据
    const handleSelect = (keys, rows) => {
      table.selectedRowId = [...keys];
      table.selectedRowKeys = rows;
    }
    // 分页、筛选、排序变化
    const tableChange = (pagination) => {
      table.pagination.current = pagination.current
      table.pagination.pageSize = pagination.pageSize
      getData()
    }
    // 新增
    const add = () => {
      modal.visible = true
      modal.title = '新增'
      modal.type = 'add'
      modal.form = {}
    }
    // 新增的保存
    const modalClose = (d) => {
      if(d !== 'cancle') {
        table.dataSource.push({...d.data, id: table.dataSource.length + 1})
      }
      modal.visible = false
      modal.title = '新增'
      modal.type = 'add'
      modal.form = {}
    }
    // 编辑
    const edit = (d) => {
      router.push({
        path: '/visual/component/detail', 
        query: {
          id: d.id,
          did: d.datasourceId,
        }
      })
    }
    // 批量删除
    const deleteM = () => {
      let list = table.dataSource.filter(item => {
        return !table.selectedRowId.some(s => s === item.id)
      })
      table.dataSource = [...list]
    }

    getData();

    return {
      search,            // 表格查询条件
      formList,          // 表格查询项
      columns,           // 表格表头
      table,             // 表格相关数据
      modal,
      modalFormList,
      handleSelect,
      tableChange,
      handleSearch,
      add,
      edit,
      deleteM,
      modalClose
    }
  }
})
</script>
<style lang="less" >
</style>
