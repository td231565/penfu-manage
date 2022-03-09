const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 15)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '票券',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    status: true
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
