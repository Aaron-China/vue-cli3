const app = {
  namespaced: 'app',
  state: () => ({
    token: '3mnuehn457873nberuwen',
    user: {},
    factoryList: [
      {value: '001', label: '华为'},
      {value: '002', label: '谷歌'},
      {value: '003', label: '中芯国际'},
      {value: '004', label: '宁德时代'}
    ],
    // 所有权限. type 类型 区分菜单和按钮  path权限所在的菜单路径  key 是权限关键字,按钮才有
    permission: [],
    auth: {},     //   按钮权限
  }),
  mutations: {
    setToken: (state, d) => {
      state.token = d
    },
    setUser: (state, d) => {
      state.user = d.user
      state.permission = d.permission
      state.auth = d.auth
    }
  },
  actions: {}
}
export default app