const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  attractionPage: state => state.lists.attraction.page,
  attractionQuery: state => state.lists.attraction.query,
  memberPage: state => state.lists.member.page,
  memberQuery: state => state.lists.member.query,
  orderPage: state => state.lists.order.page,
  orderQuery: state => state.lists.order.query,
  productPage: state => state.lists.product.page,
  productQuery: state => state.lists.product.query,
  rentPage: state => state.lists.rent.page,
  rentQuery: state => state.lists.rent.query,
  bikePage: state => state.lists.bike.page,
  storePage: state => state.lists.store.page,
  storeQuery: state => state.lists.store.query
}
export default getters
