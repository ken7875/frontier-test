import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ramdomUser',
      component: () => import('@/views/RamdomUser.vue')
    }
  ]
})

export default router
