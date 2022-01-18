<template>
  <div class="wrapper">
    <div class="list-box">
      <search-model :formList="formList" @onSearch="handleSearch" @onBack="handleBack">
        <template #tool-left>
          <a-button v-if="auth.add" class="n-btn" @click="add" >新增</a-button>
          <a-button v-if="auth.delete" class="d-btn" style="margin-left: 15px;" @click="deleteM" >批量删除</a-button>
          <a-button v-if="auth.export" class="n-btn" style="margin-left: 15px;" @click="exportE">导出</a-button>
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
import { useStore } from 'vuex';
import { CTable, SearchModel, EditModel } from '@components/index.js'
import dayjs from 'dayjs'
import { getList } from "@api/report";
import { expoerExcel } from '@/utils/exportExcel'
import { checklength, checkRepeat } from '@utils/util'

const formList = [
  { label: '工厂', key: 'factoryNo', type: 'select', option: [], defaultValue: '001', required: true, needBack: true },
  { label: '物料编码', key: 'materialCode', type: "batchInput", rules: [
    { required: false, message: `请输入物料编码` },
    { pattern: !new RegExp(/^[a-zA-Z0-9,]*$/, 'g'), message: '仅允许输入数字和字母，并以英文逗号分隔' },
    { validator: checkRepeat }, // 校验长度
    { validator: checklength }  // 校验重复性
  ] },
  { label: '物料名称', key: 'materialName', type: "input" },
  { type: "btn" },
  { label: '版本号', key: 'version', type: "largeSelect",  option: [] },
  { label: '数量', key: 'qty', type: "number" },
  { label: '发货时间', key: 'sendTime', type: "datepicker" },
  { label: '生产时间', key: 'createTime', type: "rangepicker" },
  { label: '换产', key: 'change', type: "checkbox" },
]
const modalFormList = [
  { label: '工厂', key: 'factoryNo', type: "select", option: [], required: true },
  { label: '物料编码', key: 'materialCode', type: "batchInput" },
  { label: '数量', key: 'qty', type: "number" },
]

export default defineComponent({
  name: 'report',
  components: {
    SearchModel,
    EditModel,
    CTable
  },
  setup() {
    const store = useStore();
    let search = reactive({factoryNo: '001'});
    const columns = [
      { title: '工厂名称', dataIndex: "factoryName", width: 80 },
      { title: '物料编码', dataIndex: "materialCode", width: 90 },
      { title: '物料名称', dataIndex: "materialName", width: 130, ellipsis: true },
      { title: 'BOM层级', dataIndex: "bomLevel", width: 80 },
      { title: '版本号', dataIndex: "version", width: 80 },
      { title: '数量', dataIndex: "qty", width: 100 },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 70,
        align: 'center',
        customRender: ({ record }) => {
          return auth.edit ? (<a onClick={() => edit(record) }>编辑</a>) : ''
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
    const auth = store.state.app.auth[window.location.pathname] || {};

    // 查询表格数据
    const getData = () => {
      table.loading = true
      const params = {
        ...search,
        current: table.pagination.current,
        size: table.pagination.pageSize
      }
      getList(params).then(res => {
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
        console.log(err)
        table.loading = false;
      });
    }
    // 搜索
    const handleSearch = (data) => {
      if(data.sendTime) data.sendTime = dayjs(data.sendTime).format('YYYY-MM-DD HH:mm:ss')
      if(data.createTime) {
        data.createTime = [
          dayjs(data.createTime[0]).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(data.createTime[1]).format('YYYY-MM-DD HH:mm:ss')
        ]
      }
      search = { ...data }
      table.pagination.current = 1
      getData();
    }
    // 搜索框单个项值变化的回调
    const handleBack = (v, k) => {
      console.log(v, k)
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
    // 编辑
    const edit = (d) => {
      modal.visible = true
      modal.title = '编辑'
      modal.type = 'edit'
      modal.form = {...d}
    }
    // 新增/编辑弹窗保存
    const modalClose = (d) => {
      if(d !== 'cancle') {
        let obj = d.data, list = [];
        if(d.type === 'edit') {
          list = table.dataSource.map(item => {
            return item.id === obj.id ? obj : item
          })
        } else {
          list = [...table.dataSource, {...obj, id: table.dataSource.length + 1}]
        }
        table.dataSource = [...list]
      }
      modal.loading = false
      modal.visible = false
      modal.title = ''
      modal.type = 'add'
      modal.form = {}
    }
    // 批量删除
    const deleteM = () => {
      let list = table.dataSource.filter(item => {
        return !table.selectedRowId.some(s => s === item.id)
      })
      table.dataSource = [...list]
    }
    // 导出
    const exportE = () => {
      let newC = []
      columns.forEach(item => {
        if(item.dataIndex !== "operation") {
          newC.push(item)
        }
      })
      expoerExcel(newC, table.dataSource, '表格下载')
    }

    //初始化数据 
    const factoryList = store.state.app.factoryList;
    formList[0].option = factoryList
    modalFormList[0].option = factoryList
    let list =[];
    for (let i = 0; i < 999; i++) {
      list.push({label: i+1, value: i+1})
    }
    formList[4].option = list;
    getData();

    return {
      search,            // 表格查询条件
      formList,          // 表格查询项
      columns,           // 表格表头
      table,             // 表格相关数据
      modal,             // 新增/编辑弹窗
      modalFormList,     // 弹窗编辑项
      auth,              // 当前页面按钮权限
      handleSelect,
      tableChange,
      handleSearch,
      add,
      edit,
      modalClose,
      deleteM,
      exportE,
      handleBack
    }
  }
})
</script>
<style lang="less">
</style>
