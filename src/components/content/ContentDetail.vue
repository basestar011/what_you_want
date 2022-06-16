<script lang="ts">
export default {
  name: 'ContentDetail'
}
</script>

<script setup lang="ts">
import type { Content } from '@/types/models/content'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/store/content'
import { formatDate } from '@/utils/formatDate'

const route = useRoute();
const router = useRouter();
const contentStore = useContentStore();
const content = ref<Content<any>>(null);

onBeforeMount(() => {
  const { code } = route.params;
  const codeNum = Number(code);
  if(isNaN(codeNum)) {
    alert('잘못된 접근입니다.');
    router.push('/content');
  }
  
  content.value = contentStore.contentDetail(codeNum);
})
</script>

<template>
  <div v-if="content">
    <h1>{{ content.title }}</h1>
    <p>{{ formatDate(content.modified, 'LLL') }}</p>
    <p>{{ content.detail?.address }}</p>
    <p>{{ content.detail?.description }}</p>
    <p>{{ content.detail?.isWent }}</p>
  </div>
</template>

<style scoped>

</style>