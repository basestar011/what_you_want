import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '../types/enums'
import { useAuthStore } from '../store/auth'
import { useAuthGet } from '../hooks/http'
import { TOKEN } from '../common/constants'

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
        layout: Layout.GUEST
      },
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/quiz',
      meta: {
        layout: Layout.GUEST
      },
      component: () => import('@/views/QuizPage.vue')
    },
    {
      path: '/content',
      meta: {
        layout: Layout.DEFAULT,
        requiresAuth: true,
      },
      component: () => import('@/views/ContentPage.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/content/ContentList.vue')
        },
        {
          path: 'create',
          component: () => import('@/components/content/ContentCreate.vue')
        }
      ]
    }
  ]
});

router.beforeEach(async (to, from) => {
  const recode = to.matched.find(recode => recode.meta.requiresAuth);
  // 인증이 필요한 페이지
  if(recode && recode.meta.requiresAuth) {
    const authStore = useAuthStore();
    // 로그인이 되어 있는 상태
    if(authStore.isAuthenticated) {
      return true;
    } else { // 로그인이 되어 있지 않음
      const token = localStorage.getItem(TOKEN);
      if(token) {
        authStore.token = token;
        try {
          const { data } = await useAuthGet<string>('/auth');
          authStore.token = data;
          return true;
        } catch (error) {
          alert('로그인이 필요합니다.');
          localStorage.removeItem(TOKEN);
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