import { defineStore } from 'pinia'
import { usePost } from '../hooks/http'
import router from '../router'
import { TOKEN } from '../common/constants'
import type { User } from '../types/models/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    bearerToken: (state) => `Bearer ${state.token}`
  },
  actions: {
    async login(user: User) {
      const { data } = await usePost<User, string>('/auth/login', user);
      this.token = data;
      localStorage.setItem(TOKEN, data);
      return data;
    },
    logout() {
      this.token = '';
      localStorage.removeItem(TOKEN);
      router.push('/login');
    }
  }
})