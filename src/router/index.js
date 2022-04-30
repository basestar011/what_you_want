import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUT } from '@/common/constants'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      meta: {
        layout: LAYOUT.Guest
      },
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/quiz',
      meta: {
        layout: LAYOUT.Guest
      },
      component: () => import('@/views/QuizPage.vue')
    }
  ]
});