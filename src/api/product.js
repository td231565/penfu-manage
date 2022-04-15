import request from '@/utils/request'

export function getList(page, numberPerPage, queryData) {
  return request({
    url: 'product/list/',
    method: 'post',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}

export function getDetail(id) {
  return request({
    url: `product/${id}`,
    method: 'get'
  })
}

export function postDetail(data) {
  return request({
    url: `product/`,
    method: 'post',
    data
  })
}

export function patchDetail(data, id) {
  return request({
    url: `product/${id}`,
    method: 'patch',
    data
  })
}

export function deleteItems(ids) {
  return request({
    url: `product/`,
    method: 'delete',
    data: {
      id: ids
    }
  })
}
