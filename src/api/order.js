import request from '@/utils/request'

export function getList(page, numberPerPage, queryData) {
  return request({
    url: 'order/saleCount/',
    method: 'post',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}

export function getDetail(queryData) {
  return request({
    url: `order/saleDetail/`,
    method: 'post',
    data: queryData
  })
}
