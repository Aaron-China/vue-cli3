import axios from 'axios'
import router from '@router/index.js'
import Cookies from 'js-cookie'
import notification from 'ant-design-vue/es/notification'
const token = localStorage.getItem('token');

// 创建 axios 实例
const service = axios.create({
    baseURL: '/api', // api base_url
    withCredentials: true,
    timeout: 60000, // 超时时间：6分钟 注意和nginx配置保持一致
    maxBodyLength: 31457280,  // 请求体最大长度 单位B，上限30MB 注意和nginx配置保持一致
    maxContentLength: 5242880,  // 响应的最大长度，单位 B ，5MB，针对文件或者表格数据大量返回 注意和nginx配置保持一致
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 401) { // 登录失效
            localStorage.setItem('token', '');
            router.push({path: '/login'})
        } else if (error.response.status === 402) {  // 缺少权限
            notification.error({
                message: '您没有权限查看当前信息',
                description: '请联系管理员获取数据权限',
                duration: null
            })
        } else if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        } else if (error.response.status === 504) {  // 请求超时
            notification.error({
                message: '提示',
                description: '请求时间较长，请稍后查看',
                duration: null
            });
        } 
    } else {
        // 请求超时
        notification.error({
            message: '提示',
            description: '请求时间较长，请稍后查看',
            duration: null
        });
    }
    return Promise.reject(error)
}

// 请求拦截，设置token
service.interceptors.request.use((config) => {
    config.headers['Access-Token'] = token
    Cookies.set('Access-Token', token);
    return config
}, err)

// 处理响应
service.interceptors.response.use((response) => {
    return response.data
}, err)

function requests(options = {}) {
    return service.request({ ...options })
}

export { requests as axios }
