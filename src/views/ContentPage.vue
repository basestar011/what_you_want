<script lang="ts">
export default {
  name: 'ContentPage'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { useContentStore } from '@/store/content'
import { onBeforeMount, ref, computed, watchEffect } from 'vue';
import CategoryList from '@/components/category/CategoryList.vue';
import CategoryAdd from '@/components/category/CategoryAdd.vue';
import ContentHeader from '@/components/content/ContentHeader.vue';
import { handleError } from '@/utils/error';
import type { Category } from '@/types/models/category';
import { useRoute } from 'vue-router'

const categoryStore = useCategoryStore();
const contentStore = useContentStore();
const $route = useRoute();

/*
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
*/

onBeforeMount(async () => {
  try {
    const categoryPromise = categoryStore.fetchAllCategory();
    const contentPromise = contentStore.fetchAllContents();
    await Promise.allSettled([categoryPromise, contentPromise]);

  } catch (error) {
    const { message } = handleError(error);
    console.log(message);
  }

  watchEffect(() => {
    contentStore.isNavShow = !$route.path.match('/content/create');
  });
});
</script>

<template>
  <article>
    <nav v-if="contentStore.isNavShow" class="nav">
      <CategoryList :categories="categoryStore.list" />
      <!-- <CategoryAdd @category:add="addCategory" ref="categoryAdd"/> -->
    </nav>
    <div class="content_wrapper">
      <ContentHeader class="content_header"/>
      <section class="content_section">
        <router-view></router-view>
      </section>
    </div>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-flow: row nowrap;
}

.nav {
  flex-basis: 150px;
  flex-grow: 1;
  border-right: 1px solid lightslategray;
}
.content_wrapper {
  flex-grow: 8;
}
.content_header {
  
}

.content_section {
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