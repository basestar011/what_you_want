import { defineStore } from 'pinia'
import { apiClient } from '../utils/api'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token')
  }),
  getters: {
    getToken: (state) => (state.token || localStorage.getItem('token')),
    getBearerToken() { return `Bearer ${this.getToken}` }
  },
  actions: {
    async login(user) {
      const { data } = await apiClient.post('/auth/login', user);
      this.token = data.token;
      localStorage.setItem('token', data.token);
      router.push('/content');
    }
  }
})