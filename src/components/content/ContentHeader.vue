<script lang="ts">
export default {
  name: 'ContentHeader'
}
</script>

<script setup lang="ts">
import type { Category } from '@/types/models/category'
import { useCategoryStore } from '@/store/category'
import { useContentStore } from '@/store/content'
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();
const isContentListPage = computed(() => route.path.match(/^\/content$/g));
const isContentCreatePage = computed(() => route.path.match('/content/create'));
const isContentDetailPage = computed(() => route.path.match(/^\/content\/[0-9]/g));

const categoryStore = useCategoryStore();
const categoryName = computed<string>(() => (categoryStore.selected?.name) ?? '전체');
const categoryDesc = computed<string>(() => categoryStore.selected?.description ?? '');

const contentStore = useContentStore();
const contentTitle = computed(() => contentStore.current?.title ?? '');
</script>

<template>
  <div class="container">
    <template v-if="isContentListPage"><!-- 컨텐츠 리스트 페이지 -->
      <h2 class="section-category">
        <p class="category-name">{{ categoryName }} <router-link to="/content/create" class="create-text">컨텐츠 등록</router-link></p>
        <span class="category-desc">{{ categoryDesc }}dsfsdfsdfsdfsdf</span>
      </h2>
    </template>
    <template v-if="isContentCreatePage"><!-- 컨텐츠 등록 페이지 -->
      <h1 class="page_title">컨텐츠 등록</h1>
    </template>
    <template v-if="isContentDetailPage"><!-- 컨텐츠 상세 페이지 -->
      <h1>{{ contentTitle }}</h1>
    </template>
  </div>
</template>

<style scoped>
.container {
  border-bottom: 2px solid lightslategrey;
}
.section-category {
  margin: 0
}
.section-category .category-name {
  margin: 0;
  padding: 0;
}
</style>