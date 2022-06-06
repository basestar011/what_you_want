<script lang="ts">
export default {
  name: 'ContentList'
}
</script>

<script setup lang="ts">
import ContentDetail from './ContentDetail.vue';
import { useContentStore } from '@/store/content'

const contentStore = useContentStore();
</script>

<template>
  <ul>
    <li v-for="content in contentStore.listBySelectedCategory">
      <ContentDetail :content="content" />
    </li>
  </ul>
</template>

<style scoped>

</style>