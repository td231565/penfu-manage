import request from '@/utils/request'

export function getSaleList(page, numberPerPage, queryData) {
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

export function getSaleDetail(queryData) {
  return request({
    url: `order/saleDetail/`,
    method: 'post',
    data: queryData
  })
}

export function getOrderList(page, numberPerPage, queryData) {
  return request({
    url: 'order/backend/list/',
    method: 'post',
    data: {
      page,
      numberPerPage,
      ...queryData
    }
  })
}

export function updateOrderStatus(uuid) {
  return request({
    url: `order/${uuid}`,
    method: 'patch',
    data: { status: 1 }
  })
}
