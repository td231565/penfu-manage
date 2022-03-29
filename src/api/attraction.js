import request from '@/utils/request'

export function getList(page, numberPerPage, queryData) {
  return request({
    url: 'attraction/list/',
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
    url: `attraction/${id}`,
    method: 'get'
  })
}

export function postDetail(data) {
  return request({
    url: `attraction/`,
    method: 'post',
    data
  })
}

export function patchDetail(data, id) {
  return request({
    url: `attraction/${id}`,
    method: 'patch',
    data
  })
}

export function deleteItems(ids) {
  return request({
    url: `attraction/`,
    method: 'delete',
    data: {
      id: ids
    }
  })
}
