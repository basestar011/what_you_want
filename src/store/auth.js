import { defineStore } from 'pinia'
import router from '../router'
import { useClient } from '../hooks'

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
      const { data } = await useClient('/auth/login', 'POST', user);
      this.token = data.token;
      localStorage.setItem('token', data.token);
      router.push('/content');
    }
  }
})