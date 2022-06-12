import { defineStore } from 'pinia'
import type { Content } from '../types/models/content'
import type { Category } from '../types/models/category'
import { useCategoryStore } from './category'
import { useAuthGet } from '../hooks/http'

type ContentState = {
  list: Content<any>[]
}

export const useContentStore = defineStore('content', {
  state: () => ({
    list: []
  } as ContentState),
  getters: {
    listBySelectedCategory: (state) => {
      const categoryStore = useCategoryStore();
      return categoryStore.selected ?
        state.list.filter(content => content.cg_code === categoryStore.selected.code) : state.list;
    },
    countByCategory: (state) => (categoryCode: Category['code']) => {
      return state.list.filter(content => content.cg_code === categoryCode).length;
    },
    contentDetail: (state) => (code: Content<any>['code']) => state.list.find(content => content.code === code)
  },
  actions: {
    async fetchAllContents() {
      const { data } = await useAuthGet<Content<any>[]>('/contents');
      this.list = data;
    }
  }
});