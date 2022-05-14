import request from '@/utils/request'

export function getRentList() {
  return request({
    url: `car_order/`,
    method: 'get'
  })
}

export function getBikeList() {
  return request({
    url: 'car/',
    method: 'get'
  })
}

export function getLocateList() {
  return request({
    url: 'locate/',
    method: 'get'
  })
}

export function postReturnBike(orderID) {
  return request({
    url: `car_order/return/write_off/backend/`,
    method: 'post',
    data: { orderID }
  })
}
