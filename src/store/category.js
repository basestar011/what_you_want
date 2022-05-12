import { defineStore } from 'pinia'
import { apiClient } from '../utils/api'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  getters: {
    getCategoryByCode: (state) => 
      (code) => state.categories.find(category => category.code === code),
  },
  actions: {
    fetchAllCategory() {
      return apiClient.get('/categories');
    },
    fetchCategoryByCode(code) {
      return apiClient.get(`/categories/${code}`);
    },
    addCategory(category) {
      return apiClient.post('/categories', category);
    },
    updateCategory({ code, ...data }) {
      return apiClient.patch(`/categories/${code}`, data);
    },
    deleteCategory(code) {
      return apiClient.delete(`/categories/${code}`);
    }
  }
});