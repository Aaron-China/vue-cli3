import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE } from './menu.js'

const route = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior: () => ({ y: 0 }),
    routes: ROUTE
})

export default route
