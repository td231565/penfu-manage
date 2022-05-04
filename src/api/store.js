import request from '@/utils/request'

export function getUserDetail(id) {
  return request({
    url: `business_info/${id}`,
    method: 'get'
  })
}

export function updateUserPassword(payload) {
  return request({
    url: 'users/change_password_admin/',
    method: 'patch',
    data: payload
  })
}

export function createNewStore(payload) {
  return request({
    url: 'business_info/register/',
    method: 'post',
    data: payload
  })
}

export function updateStoreDetail(payload) {
  return request({
    url: `business_info/`,
    method: 'patch',
    data: payload
  })
}
