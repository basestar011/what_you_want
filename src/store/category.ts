import { defineStore } from 'pinia'
import { useAuthGet, useAuthPost, useAuthPatch, useAuthDelete } from '../hooks/http'
import { handleError } from '../utils/error'
import { Category } from '@/types/models/category';

export type CategoryState = {
  list: Category[]
}

export const useCategoryStore = defineStore<string, CategoryState>('category', {
  state: () => ({
    list: [],
  }),
  getters: {
    getCategoryByCode: (state) => 
      (code: number) => state.list.find((category) => category.code === code),
  },
  actions: {
    async fetchAllCategory() {
      try {
        const { data } = await useAuthGet<{ categories: Category[] }>('/categories');
        this.list = data.categories;
        return data.categories;
      } catch (error) {
        return handleError(error);
      }
    },
    fetchCategoryByCode(code: number) {
      return useAuthGet<Category>(`/categories/${code}`);
    },
    addCategory(category: Category) {
      return useAuthPost<Category, any>('/categories', category);
    },
    updateCategory(category: Partial<Category>) {
      const { code, ...data } = category;
      return useAuthPatch<Partial<Category>, any>(`/categories/${code}`, data);
    },
    deleteCategory(code) {
      return useAuthDelete(`/categories/${code}`);
    },
    getContentsByCategory(code) {
      return useAuthGet(`/categories/${code}/contents`);
    },
    addContentByCategory(code, content) {
      return useAuthPost(`/categories/${code}/contents`, content);
    }
  }
});