import BasicLayout from '@layouts/basicLayout' 
import PageLayout from '@layouts/pageLayout'

export const ROUTE = [
  {
    path: '/',
    name: 'main',
    redirect: '/report',
    component: BasicLayout,
    children: [
      {
        path: '/report',
        name: 'report',
        title: '报表中心',
        component: () => import('@views/report.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        title: '配置中心',
        component: PageLayout,
        redirect: '/setting/user',
        children: [
          {
            path: '/setting/user',
            name: 'user',
            title: '用户管理',
            component: PageLayout,
            redirect: '/setting/user/add',
            children: [
              {
                path: '/setting/user/add',
                name: 'add',
                title: '增加',
                component: () => import('@views/user/add.vue')
              },
              {
                path: '/setting/user/edit',
                name: 'edit',
                title: '修改',
                component: () => import('@views/user/edit.vue')
              },
              {
                path: '/setting/user/delete',
                name: 'delete',
                title: '删除',
                component: () => import('@views/user/delete.vue')
              },
            ]
          },
          {
            path: '/setting/role',
            name: 'role',
            title: '角色管理',
            component: () => import('@views/role.vue')
          }
        ]
      },
      {
        path: '/hightChartsGantt',
        name: 'hightChartsGantt',
        title: 'highCharts甘特图',
        component: () => import('@views/hightChartsGantt/index.vue')
      },
      {
        path: '/visual',
        name: 'visual',
        title: '大屏可视化',
        component: PageLayout,
        redirect: '/visual/dashboard/list',
        children: [
          {
            path: '/visual/dashboard/list',
            name: 'dashboardList',
            title: '看板',
            component: () => import('@views/visual/dashboard/list.vue')
          },
          {
            path: '/visual/dashboard/detail/show',
            name: 'dashboardDetailShow',
            title: '看板详情',
            hidden: true,
            component: () => import('@views/visual/dashboard/showDetail.vue')
          },
          {
            path: '/visual/dashboard/detail/edit',
            name: 'dashboardDetailEdit',
            title: '看板详情',
            hidden: true,
            component: () => import('@views/visual/dashboard/editDetail.vue')
          },
          {
            path: '/visual/component',
            name: 'component',
            title: '组件',
            component: () => import('@views/visual/component/list.vue')
          },
          {
            path: '/visual/component/detail',
            name: 'componentDetail',
            title: '组件详情',
            hidden: true,
            component: () => import('@views/visual/component/detail.vue')
          },
          {
            path: '/visual/datasource',
            name: 'datasource',
            title: '数据源',
            component: () => import('@views/visual/datasource/list.vue')
          },
          {
            path: '/visual/datasource/detail',
            name: 'datasourceDetail',
            title: '数据源详情',
            hidden: true,
            component: () => import('@views/visual/datasource/detail.vue')
          },
        ]
      },
      {
        path: '/socket',
        name: 'socket',
        title: 'socket长连接',
        component: PageLayout,
        redirect: '/socket/chat/user',
        children: [
          {
            path: '/socket/chat/user',
            name: 'chatUser',
            title: '私聊',
            component: () => import('@views/socket/chatUser/index.vue')
          },
          {
            path: '/socket/chat/group',
            name: 'chatGroup',
            title: '群聊',
            component: () => import('@views/socket/chatGroup/index.vue')
          },
          {
            path: '/socket/largeFile',
            name: 'largeFile',
            title: '大文件传输',
            component: () => import('@views/socket/largeFile/index.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    title: '登陆',
    hidden: true,
    component: () => import('@views/login.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    hidden: true
  }
]
