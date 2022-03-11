import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/member/list',
    method: 'get',
    params
  })
}
