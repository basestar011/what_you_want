<script lang="ts">
export default {
  name: 'Category List'
}
</script>

<script setup lang="ts">
import type { Category } from '@/types/models/category'
import CategoryComp from './Category.vue';
import { useCategoryStore } from '@/store/category'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter();

const props = defineProps<{
  categories: Category[]
}>()

const categoryStore = useCategoryStore();
const allCategory = computed(() => {
  return categoryStore.selected === undefined || categoryStore.selected === null
});

function isSelected(category: Category): boolean {
  return categoryStore.selected ? categoryStore.selected.code === category.code : false;
}

function selectCategory($event: Category): void {
  categoryStore.selected = $event;
  $router.push('/content');
}
</script>

<template>
<!-- 
  카테고리 리스트 컴포넌트
  - 카테고리 나열
  - 카테고리 별 컨텐츠 갯수 전시 ex) 카테고리1 (2)
  - 서브 카테고리 추가 예정
-->
<ul>
  <li @click="categoryStore.selected = null" :class="{ all: allCategory }">전체</li>
  <li v-for="category in props.categories">
    <CategoryComp :category="category" :selected="isSelected(category)" @category:select="selectCategory"/>
  </li>
</ul>
</template>

<style scoped>
ul {
  list-style: square;
}
ul li {
  font-size: 1.5em;
  cursor: pointer;
}

.all {
  font-weight: 700;
  color: red;
}
</style>