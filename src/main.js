import { createApp } from 'vue'
import dayjs from 'dayjs'
import App from './App.vue'
import './antdUse'
import router from './router'
import store from './store'
import antdUse from './antdUse'
import 'dayjs/locale/zh-cn';
import './app.less'

import '@mock/index.js'

// 创建应用上下文
const app = createApp(App)
app.config.productionTip
dayjs.locale('zh-cn');
// 原型上添加全局字段方式变了
app.config.globalProperties.$dayjs = dayjs
// 引入路由、vuex、 antd
antdUse(app)
app.use(router)
app.use(store)

// 挂载dom
app.mount('#app')

