import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUT } from '@/common/constants'
import { useAuthStore } from '../store/auth'
import { useAuthClient } from '../hooks'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      redirect: '/content'
    },
    {
      path: '/login',
      meta: {
        layout: LAYOUT.guest
      },
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/quiz',
      meta: {
        layout: LAYOUT.guest
      },
      component: () => import('@/views/QuizPage.vue')
    },
    {
      path: '/content',
      meta: {
        layout: LAYOUT.default,
        auth: true,
      },
      component: () => import('@/views/ContentPage.vue')
    }
  ]
});

router.beforeEach(async (to, from) => {
  const recode = to.matched.find(recode => recode.meta.auth);
  if(recode && recode.meta.auth) {
    // 인증이 필요한 페이지
    const authStore = useAuthStore();
    // 로그인이 되어 있는 상태
    if(authStore.isAuthenticated) {
      return true;
    } else { // 로그인이 되어 있지 않음
      const token = localStorage.getItem('token');
      if(token) {
        authStore.token = token;
        try {
          const { data } = await useAuthClient('/auth', 'GET');
          authStore.token = data;
          return true;
        } catch (error) {
          alert('로그인이 필요합니다.');
          localStorage.removeItem('token');
          return '/login';
        }
      } else {
        return '/login';
      }
    }
  } else { // 인증이 필요없는 페이지
    return true;
  }
});

export default router;