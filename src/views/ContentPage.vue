<script>
export default {
  name: 'ContentPage'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { onBeforeMount, toRaw, ref } from 'vue';
import CategoryList from '@/components/category/CategoryList.vue';
import CategoryAdd from '@/components/category/CategoryAdd.vue';

const categoryStore = useCategoryStore();

const categoryAdd = ref(null);

const addCategory = async (category) => {
  try {
    const { status, data } = await categoryStore.addCategory(category);
    if(status === 201) {
      alert('추가되었습니다.');
    }
    await categoryStore.fetchAllCategory();
    categoryAdd.value.clearForm();
  } catch (error) {
    console.error(error);
    alert('카테고리 추가 중에 에러가 발생했습니다.');
  }
}

onBeforeMount(async () => {
  try {
    await categoryStore.fetchAllCategory();
  } catch (error) {
    console.log(error);
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