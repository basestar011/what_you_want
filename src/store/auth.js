import { defineStore } from 'pinia'
import { useClient } from '../hooks'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    bearerToken: (state) => `Bearer ${state.token}`
  },
  actions: {
    async login(user) {
      const { data } = await useClient('/auth/login', 'POST', user);
      this.token = data;
      localStorage.setItem('token', data);
      return data;
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
})