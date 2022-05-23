<script lang="ts">
export default {
  name: 'ContentPage'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { onBeforeMount, ref } from 'vue';
import CategoryList from '@/components/category/CategoryList.vue';
import CategoryAdd from '@/components/category/CategoryAdd.vue';
import { handleError } from '@/utils/error';
import type { Category } from '@/types/models/category';

const categoryStore = useCategoryStore();

const categoryAdd = ref(null);

const addCategory = async (category: Category) => {
  try {
    await categoryStore.addCategory(category);
    alert('추가되었습니다.');
    await categoryStore.fetchAllCategory();
    categoryAdd.value.clearForm();
  } catch (error) {
    const { name, message } = handleError(error);
    console.error(name, message);
    alert('카테고리 추가 중에 에러가 발생했습니다.');
  }
}

onBeforeMount(async () => {
  try {
    await categoryStore.fetchAllCategory();
  } catch (error) {
    const { message } = handleError(error);
    console.log(message);
  }
});
</script>

<template>
  <article>
    <header>
      <h1>Content Page</h1>
    </header>
    <nav>
      <CategoryList :categories="categoryStore.list" />
      <CategoryAdd @category:add="addCategory" ref="categoryAdd"/>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </article>
</template>

<style scoped>

</style>