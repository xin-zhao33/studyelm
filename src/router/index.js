
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/city/query',
    name: 'query',
    component: () => import('../pages/home/querySite.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../pages/main/index.vue'),
    redirect: '/takeout',
    children: [
      {
        path: '/my',
        name: 'my',
        component: () => import('../pages/main/my/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../pages/main/order/index.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../pages/main/search/index.vue')
      },
      {
        path: '/takeout',
        name: 'takeout',
        component: () => import('../pages/main/takeout/index.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router