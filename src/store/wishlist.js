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
    fetchAllCategory() {
      return apiClient.get('/categories');
    },
    fetchCategoryById(id) {
      return apiClient.get(`/categories/${id}`);
    },
  }
});