path      String    url地址
name      String    路由标识
title     String    标题
hidden    Boolean   是否显示在菜单中， 默认false 显示
meta      Object    一些额外参数，比如需要多语言、描述等等，结合需求设定
redirect  String    重定向地址
children  Array     子菜单
component BOM       页面

```javascript
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        name: 'main',
        hidden: true,
        title: 'main',
        meta: {
          international: 'home'
        },
        redirect: '/home',
        children: [
          {
            path: '/home',
            name: 'home',
            title: '首页',
            meta: {
              international: 'home'
            },
            // 懒加载
            component: () => import('@views/home.vue')
          },
        ]
      }
    ]
})
```
