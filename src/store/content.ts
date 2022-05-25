import { defineStore } from 'pinia'

type ContentState = {}

export const useContentStore = defineStore('content', {
  state: () => ({} as ContentState),
  getters: {},
  actions: {}
});