import { defineStore } from 'pinia'
import { useAuthGet, useAuthPost, useAuthPatch, useAuthDelete } from '../hooks/http'
import { handleError } from '../utils/error'
import type { Category } from '@/types/models/category';
import type { Content } from '@/types/models/content';

export type CategoryState = {
  list: Category[]
}

export const useCategoryStore = defineStore<string, CategoryState, any, any>('category', {
  state: () => ({
    list: [],
  }),
  getters: {
    getCategoryByCode: (state: CategoryState) => 
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
    updateCategory(code: string, category: Omit<Category, 'code'>) {
      return useAuthPatch<Omit<Category, 'code'>, any>(`/categories/${code}`, category);
    },
    deleteCategory(code: string) {
      return useAuthDelete<number>(`/categories/${code}`);
    },
    getContentsByCategory<T>(code: string) {
      return useAuthGet<Content<T>>(`/categories/${code}/contents`);
    },
    addContentByCategory(code: string, content) {
      return useAuthPost(`/categories/${code}/contents`, content);
    }
  }
});