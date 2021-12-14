import { axios } from '@/utils/request'

export function getDashboardList (d) {
    return axios({
        url: `/dashboard/list`,
        method: 'post',
        data: d
    })
}
export function getComponentList (d) {
    return axios({
        url: `/component/list`,
        method: 'post',
        data: d
    })
}
export function getDatasourceList (d) {
    return axios({
        url: `/datasource/list`,
        method: 'post',
        data: d
    })
}

export function getDashboard (d) {
    return axios({
        url: `/dashboard/detail`,
        method: 'post',
        data: d
    })
}

export function getComponent (d) {
    return axios({
        url: `/component/detail`,
        method: 'post',
        data: d
    })
}

export function getDatasource (d) {
    return axios({
        url: `/datasource/detail`,
        method: 'post',
        data: d
    })
}

export function getData (d) {
    return axios({
        url: `/datasource/data`,
        method: 'post',
        data: d
    })
}


