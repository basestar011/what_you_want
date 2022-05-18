import { defineStore } from 'pinia'
import { useAuthClient } from '../hooks'
import { handleError } from '../utils/error'
import { Method } from '../types/enums'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    list: [],
  }),
  getters: {
    getCategoryByCode: (state) => 
      (code) => state.list.find(category => category.code === code),
  },
  actions: {
    async fetchAllCategory() {
      try {
        const { data } = await useAuthClient('/categories', Method.GET);
        this.list = data.categories;
        return data.categories;
      } catch (error) {
        return handleError(error);
      }
    },
    fetchCategoryByCode(code) {
      return useAuthClient(`/categories/${code}`, Method.GET);
    },
    addCategory(category) {
      return useAuthClient('/categories', Method.POST, category);
    },
    updateCategory({ code, ...data }) {
      return useAuthClient(`/categories/${code}`, Method.PATCH, data);
    },
    deleteCategory(code) {
      return useAuthClient(`/categories/${code}`, Method.DELETE);
    },
    getContentsByCategory(code) {
      return useAuthClient(`/categories/${code}/contents`, Method.GET);
    },
    addContentByCategory(code, content) {
      return useAuthClient(`/categories/${code}/contents`, Method.POST, content);
    }
  }
});