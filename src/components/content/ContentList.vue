<script lang="ts">
export default {
  name: 'ContentList'
}
</script>

<script setup lang="ts">
import { useContentStore } from '@/store/content'

const contentStore = useContentStore();
</script>

<template>
  <p v-if="contentStore.listBySelectedCategory.length === 0">
    등록된 컨텐츠가 없습니다.
  </p>
  <div v-else class="container">
    <div class="content_btn">
      <router-link to="/content/create" class="create-text">컨텐츠 등록</router-link>
    </div>
    <ul class="content_list">
      <li v-for="content in contentStore.listBySelectedCategory">
        <router-link :to="`/content/${content.code}`">
          {{ content.code }} | {{ content.title }}
        </router-link>
      </li>
    </ul>
  </div>
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
a:hover {
  color: red;
}
</style>