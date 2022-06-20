<script lang="ts">
export default {
  name: 'ContentPage'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { useContentStore } from '@/store/content'
import { onBeforeMount, ref, computed } from 'vue';
import CategoryList from '@/components/category/CategoryList.vue';
import CategoryAdd from '@/components/category/CategoryAdd.vue';
import { handleError } from '@/utils/error';
import type { Category } from '@/types/models/category';
import { useRoute } from 'vue-router'

const categoryStore = useCategoryStore();
const contentStore = useContentStore();
const $route = useRoute();

const categoryAdd = ref(null);
const categoryName = computed(() => (categoryStore.selected?.name) ?? '전체');
const categoryDesc = computed(() => {
  return categoryStore.selected?.description ?? ''
});
const isNotCreatePage = computed(() => $route.path.lastIndexOf('/create') === -1);

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
    const categoryPromise = categoryStore.fetchAllCategory();
    const contentPromise = contentStore.fetchAllContents();
    await Promise.allSettled([categoryPromise, contentPromise]);
  } catch (error) {
    const { message } = handleError(error);
    console.log(message);
  }
});
</script>

<template>
  <article>
    <header>
      <h1>콘텐츠 페이지</h1>
    </header>
    <nav v-if="isNotCreatePage">
      <CategoryList :categories="categoryStore.list" />
      <!-- <CategoryAdd @category:add="addCategory" ref="categoryAdd"/> -->
    </nav>
    <section>
      <h2 v-if="isNotCreatePage" class="section-category">
        <p class="category-name">{{ categoryName }} <router-link to="/content/create" class="create-text">컨텐츠 등록</router-link></p>
        <span class="category-desc">{{ categoryDesc }}</span>
      </h2>
      <div>
        <router-view></router-view>
      </div>
    </section>
  </article>
</template>

<style scoped>
nav {
  display: inline-flex;
  width: 20%;
}
section {
  display: inline-flex;
  flex-direction: column;
  width: 80%;
}
.section-category {
  margin: 0 0 20px 0;
  border-bottom: 2px solid lightslategrey;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  line-height: 1em;
}
.section-category .category-name {
  display: flex;
  justify-content: space-between;
  margin: 0;
}
.section-category .category-name .create-text {
  text-decoration: none;
  color: black;
  font-size: 0.5em;
}
.section-category .category-desc {
  color: grey;
  font-size: 1.5rem;
}
</style>