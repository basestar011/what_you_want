import { defineStore } from 'pinia'
import { useClient, usePost } from '../hooks'
import router from '../router'
import { Method } from '../types/enums'
import { TOKEN } from '../common/constants'
import type { User } from '../types/models/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
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
      this.token = null;
      localStorage.removeItem(TOKEN);
      router.push('/login');
    }
  }
})