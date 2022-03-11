const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    name: '@cname',
    'status|1': [true, false],
    tel: '@string(9, 9)',
    email: '@email',
    birthday: '@date',
    'sex|1': ['男', '女']
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/member/list',
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
