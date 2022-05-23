<script lang="ts">
export default {
  name: 'Content Create'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import type { Restaurant } from '@/types/models/content'
const categoryStore = useCategoryStore();

const createContent = async () => {
  await categoryStore.addContentByCategory<Restaurant>({ cg_code: 25, title: '테스트콘텐츠', detail: { address: '서울시', description: '식당입니다.', menu: ['제육덮밥', '김치찌개'] } });
}
</script>

<template>
  <div>
    Content Create
    <button type="button" @click="createContent">생성</button>
  </div>
</template>

<style scoped>

</style>