import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: 'upload/',
    method: 'post',
    data,
    headers: { 'Content-type': 'multipart/form-data' }
  })
}
