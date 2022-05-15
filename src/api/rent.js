import request from '@/utils/request'

export function getRentList(page, numberPerPage, queryData) {
  return request({
    url: 'car/list/order_status/',
    method: 'post',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}

export function getBikeList(page, numberPerPage) {
  return request({
    url: 'car/list/',
    method: 'post',
    data: {
      page,
      numberPerPage
    }
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

export function postCreateNewBike({ title, lastLocate }) {
  return request({
    url: `car/`,
    method: 'post',
    data: {
      title,
      lastLocate,
      status: 1
    }
  })
}

export function patchBike({ id, title, lastLocate, status }) {
  return request({
    url: `car/${id}`,
    method: 'patch',
    data: {
      title,
      lastLocate,
      status
    }
  })
}

export function deleteBike(id) {
  return request({
    url: `car/${id}`,
    method: 'delete'
  })
}

export function postCreateNewLocate({ title, address, lng, lat }) {
  return request({
    url: `locate/`,
    method: 'post',
    data: {
      title,
      address,
      lng,
      lat,
      status: 1
    }
  })
}

export function patchLocate({ id, title, address, lng, lat, status }) {
  return request({
    url: `locate/${id}`,
    method: 'patch',
    data: {
      title,
      address,
      lng,
      lat,
      status
    }
  })
}

export function deleteLocate(id) {
  return request({
    url: `locate/${id}`,
    method: 'delete'
  })
}
