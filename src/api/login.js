import { axios } from '@/utils/request'

export function login (d) {
    return axios({
        url: `/login`,
        method: 'post',
        data: d
    })
}

export function getUserInfo (d) {
    return axios({
        url: `/getUserInfo`,
        method: 'post',
        data: d
    })
}
