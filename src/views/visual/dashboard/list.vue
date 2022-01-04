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
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { SearchModel, CTable } from '@components/index.js'
import { getDashboardList } from "@api/visual";

const formList = [
  { label: '名称', key: 'materialName', type: "input" },
  { type: "btn" },
]

export default defineComponent({
  components: {
    SearchModel,
    CTable
  },
  setup() {
    const router = useRouter();
    let search = reactive({});
    const columns = [
      { title: '名称', dataIndex: "name", width: 80 },
      { title: '设备', dataIndex: "device", width: 90 },
      { title: '是否公开', dataIndex: "open", width: 130, ellipsis: true },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 70,
        align: 'center',
        customRender: ({ record }) => {
          return (<div>
            <a onClick={() => edit(record) }>编辑</a>
            <a style="margin-left: 10px;" onClick={() => detail(record) }>查看</a>
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

    // 查询表格数据
    const getData = () => {
      table.loading = true
      getDashboardList().then(res => {
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
    }
    // 编辑
    const edit = (d) => {
      router.push({
        path: '/visual/dashboard/detail/edit', 
        query: {
          id: d.id,
        }
      })
    }
    // 查看
    const detail = (d) => {
      router.push({
        path: '/visual/dashboard/detail/show', 
        query: {
          id: d.id,
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
      handleSelect,
      tableChange,
      handleSearch,
      add,
      edit,
      deleteM,
    }
  }
})
</script>
<style lang="less" >
</style>
