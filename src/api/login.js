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
        url: `/userInfo`,
        method: 'post',
        data: d
    })
}
export function getUserInfoMock (d) {
    return axios({
        url: `/getUserInfo/mock`,
        method: 'post',
        data: d
    })
}
