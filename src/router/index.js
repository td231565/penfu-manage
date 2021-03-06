import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: '首頁',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/product'
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: () => import('@/views/product/List'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'ProductCreate',
        component: () => import('@/views/product/Create'),
        meta: { title: '商品新增', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        component: () => import('@/views/product/Create'),
        meta: { title: '商品編輯', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    meta: { title: '會員管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: () => import('@/views/member/List'),
        meta: { title: '會員列表', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    redirect: '/store/list',
    name: 'Store',
    meta: { title: '店家管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'StoreList',
        component: () => import('@/views/store/List'),
        meta: { title: '店家列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'StoreCreate',
        component: () => import('@/views/store/Create'),
        meta: { title: '店家新增', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'StoreEdit',
        component: () => import('@/views/store/Create'),
        meta: { title: '店家編輯', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/list',
    name: 'sale',
    meta: { title: '銷售管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'saleList',
        component: () => import('@/views/sale/List'),
        meta: { title: '銷售列表', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { title: '訂單管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: () => import('@/views/order/List'),
        meta: { title: '訂單列表', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/attraction',
    component: Layout,
    redirect: '/attraction/list',
    name: 'Attraction',
    meta: { title: '景點管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'AttractionList',
        component: () => import('@/views/attraction/List'),
        meta: { title: '景點列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'AttractionCreate',
        component: () => import('@/views/attraction/Create'),
        meta: { title: '景點新增', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'AttractionEdit',
        component: () => import('@/views/attraction/Create'),
        meta: { title: '景點編輯', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/rent',
    component: Layout,
    redirect: '/rent/list',
    name: 'Rent',
    meta: { title: '租借管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'RentList',
        component: () => import('@/views/rent/RentList'),
        meta: { title: '租借列表', icon: 'table' }
      },
      {
        path: 'bikeList',
        name: 'BikeList',
        component: () => import('@/views/rent/BikeList'),
        meta: { title: '車輛管理', icon: 'tree' }
      },
      {
        path: 'locateList',
        name: 'LocateList',
        component: () => import('@/views/rent/LocateList'),
        meta: { title: '地點管理', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
