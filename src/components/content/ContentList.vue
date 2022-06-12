<script lang="ts">
export default {
  name: 'ContentList'
}
</script>

<script setup lang="ts">
import ContentDetail from './ContentDetail.vue';
import { useContentStore } from '@/store/content'
import { formatDate } from '@/utils/formatDate'

const contentStore = useContentStore();
</script>

<template>
  <p v-if="contentStore.listBySelectedCategory.length === 0">
    등록된 컨텐츠가 없습니다.
  </p>
  <ul v-else>
    <li v-for="content in contentStore.listBySelectedCategory">
      <router-link :to="`/content/${content.code}`">
        {{ content.code }} {{ content.title }} {{ formatDate(content.modified) }}
      <!-- <ContentDetail :content="content" /> -->
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
p, ul {
  padding-left: 1rem;
  font-size: 30px;
  margin: 10px 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
</style>