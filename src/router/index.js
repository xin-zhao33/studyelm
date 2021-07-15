
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
    name: '/city/query',
    component: () => import('../pages/home/querySite.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router