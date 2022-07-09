import request from '@/utils/request'

export function getList(page, numberPerPage, queryData) {
  return request({
    url: 'users/backend_user_list',
    method: 'post',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}

export function deleteStore(id) {
  return request({
    url: `business_info/${id}`,
    method: 'delete'
  })
}
