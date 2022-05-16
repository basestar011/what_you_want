import { defineStore } from 'pinia'
import { useAuthClient } from '../hooks'
import { handleError } from '../utils/error'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    list: [],
  }),
  getters: {
    getCategoryByCode: (state) => 
      (code) => state.categories.find(category => category.code === code),
  },
  actions: {
    async fetchAllCategory() {
      try {
        const { data } = await useAuthClient('/categories', 'GET');
        this.list = data.categories;
        return data.categories;
      } catch (error) {
        return handleError(error);
      }
    },
    fetchCategoryByCode(code) {
      return useAuthClient(`/categories/${code}`, 'GET');
    },
    addCategory(category) {
      return useAuthClient('/categories', 'POST', category);
    },
    updateCategory({ code, ...data }) {
      return useAuthClient(`/categories/${code}`, 'PATCH', data);
    },
    deleteCategory(code) {
      return useAuthClient(`/categories/${code}`, 'DELETE');
    }
  }
});