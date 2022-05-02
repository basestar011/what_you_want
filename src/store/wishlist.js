import { defineStore } from 'pinia'
import { apiClient } from '../utils/api'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    categories: [],
    wishlist: [],
  }),
  getters: {
    getCategoryById: (state) => 
      (id) => state.categories.find(category => category.id === id),
  },
  actions: {
    async fetchAllCategory() {
      return apiClient.get('/category');
    },
    async fetchCategoryById(id) {
      return apiClient.get(`/category/${id}`);
    },
  }
});