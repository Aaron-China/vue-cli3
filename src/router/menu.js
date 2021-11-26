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
                component: () => import('@views/user.vue')
              },
              {
                path: '/setting/user/edit',
                name: 'edit',
                title: '修改',
                component: () => import('@views/user.vue')
              },
              {
                path: '/setting/user/delete',
                name: 'delete',
                title: '删除',
                component: () => import('@views/user.vue')
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
