export default {
  namespaced: true,
  state: {
    attraction: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        search: '',
        startDate: '',
        endDate: ''
      }
    },
    member: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        name: '',
        email: '',
        cellphone: '',
        userCategory: '會員'
      }
    },
    order: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        productID: '',
        title: '',
        category: '',
        startDate: '',
        endDate: ''
      }
    },
    product: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        search: '',
        category: '',
        startDate: '',
        endDate: ''
      }
    },
    rent: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        status: '',
        carName: '',
        carID: ''
      }
    },
    bike: {
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    },
    store: {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      query: {
        name: '',
        email: '',
        cellphone: '',
        startDate: '',
        endDate: '',
        userCategory: '店家'
      }
    }
  },
  mutations: {
    SET_ATTRACTION_PAGE(state, payload) {
      state.attraction.page = payload
    },
    SET_ATTRACTION_QUERY(state, payload) {
      state.attraction.query = payload
    },
    SET_MEMBER_PAGE(state, payload) {
      state.member.page = payload
    },
    SET_MEMBER_QUERY(state, payload) {
      state.member.query = payload
    },
    SET_ORDER_PAGE(state, payload) {
      state.order.page = payload
    },
    SET_ORDER_QUERY(state, payload) {
      state.order.query = payload
    },
    SET_PRODUCT_PAGE(state, payload) {
      state.product.page = payload
    },
    SET_PRODUCT_QUERY(state, payload) {
      state.product.query = payload
    },
    SET_RENT_PAGE(state, payload) {
      state.rent.page = payload
    },
    SET_RENT_QUERY(state, payload) {
      state.rent.query = payload
    },
    SET_BIKE_PAGE(state, payload) {
      state.bike.page = payload
    },
    SET_STORE_PAGE(state, payload) {
      state.store.page = payload
    },
    SET_STORE_QUERY(state, payload) {
      state.store.query = payload
    }
  }
}

