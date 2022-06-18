import { defineStore } from 'pinia'
import { useAuthGet, useAuthPost, useAuthPatch, useAuthDelete } from '../hooks/http'
import type { Category } from '@/types/models/category';
import type { Content } from '@/types/models/content';

export type CategoryState = {
  list: Category[],
  selected: Category
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    list: [],
    selected: null
  } as CategoryState),
  getters: {
    getCategoryByCode: (state) => 
      (code: Category['code']) => state.list.find((category) => category.code === code),
  },
  actions: {
    async fetchAllCategory(): Promise<Category[]> {
      const { data } = await useAuthGet<Category[]>('/categories');
      this.list = data;
      return data;
    },
    async fetchCategoryByCode(code: Category['code']): Promise<Category> {
      const { data } = await useAuthGet<Category>(`/categories/${code}`);
      return data;
    },
    async addCategory(category: Category): Promise<Pick<Category, 'code'>> {
      const { data } = await useAuthPost<Category, Pick<Category, 'code'>>('/categories', category);
      return data;
    },
    async updateCategory(code: Category['code'], category: Omit<Category, 'code'>): Promise<Category> {
      const { data } = await useAuthPatch<Omit<Category, 'code'>, Category>(`/categories/${code}`, category);
      return data;
    },
    async deleteCategory(code: Category['code']): Promise<boolean> {
      const { status } = await useAuthDelete<string>(`/categories/${code}`);
      return status === 200
    },
    async getContentsByCategory<T>(code: Category['code']): Promise<Content<T>[]> {
      const { data } = await useAuthGet<Content<T>[]>(`/categories/${code}/contents`);
      return data;
    },
    async addContentByCategory<T>(content: Partial<Content<any>>): Promise<Pick<Content<T>, 'code'>> {
      const { data } = 
        await useAuthPost<Partial<Content<any>>, Pick<Content<T>, 'code'>>(
          `/categories/${content.cg_code}/contents`,
          content
        );
      return data
    }
  }
});