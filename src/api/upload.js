import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    // url: 'https://pengfu-app.herokuapp.com/api/upload/',
    url: '/vue-admin-template/member/list',
    method: 'post',
    data,
    headers: { 'Content-type': 'multipart/form-data' }
  })
}
