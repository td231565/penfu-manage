import request from '@/utils/request'

export function getList(page, numberPerPage, queryData) {
  return request({
    url: 'user/',
    method: 'get',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}
