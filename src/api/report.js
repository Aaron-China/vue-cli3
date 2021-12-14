import { axios } from '@/utils/request'

export function getList (d) {
    return axios({
        url: `/report/list`,
        method: 'post',
        data: d
    })
}


