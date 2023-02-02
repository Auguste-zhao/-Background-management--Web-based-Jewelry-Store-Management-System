import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/products',
    component: Layout,
    redirect: '/products/table',
    name: 'ProductList',
    meta: { title: 'Products', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'ProductList',
        component: () => import('@/views/products/index'),
        meta: { title: 'ProductList', icon: 'table' }
      },
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: () => import('@/views/warehouse/index'),
        meta: { title: 'Warehouse', icon: 'warehouse' }
      }
    ]
  },

  {
    path: '/Users',
    component: Layout,
    name: 'ALL USERS',
    meta: { title: 'Users', icon: 'user-group' },
    children: [
      {
        path: 'index',
        name: 'Admins',
        component: () => import('@/views/admins/index'),
        meta: { title: 'Admins', icon: 'admin' }
      },
      {
        path: 'salesperson',
        name: 'Salesperson',
        component: () => import('@/views/salesperson/index'),
        meta: { title: 'Salesperson', icon: 'salesman' }
      },
      {
        path: 'customers',
          name: 'Customers',
        component: () => import('@/views/customers/index'),
        meta: { title: 'Customers', icon: 'customers' }
      }
    ]
  },

  {
    path: '/orders',
    component: Layout,
    redirect: '/orders',
    name: 'OrdersList',
    meta: { title: 'orders', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'ProductList',
        component: () => import('@/views/orders/index'),
        meta: { title: 'OrdersList', icon: 'table' }
      }
    ]
  },
  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement/table',
    name: 'announcement',
    meta: { title: 'announcement', icon: 'announcement' },
    children: [
      {
        path: 'table',
        name: 'Products',
        component: () => import('@/views/announcement/index'),
        meta: { title: 'announcement', icon: 'edit' }
      },
      {
        path: 'announcementList',
        component: () => import('@/views/announcement/announcementList'),
        name: 'announcementList',
        meta: { title: 'announcementList', icon: 'list' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://101.34.23.226/',
        meta: { title: "Auguste's blog", icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
