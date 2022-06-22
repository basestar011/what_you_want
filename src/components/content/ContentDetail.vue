<script lang="ts">
export default {
  name: 'ContentDetail'
}
</script>

<script setup lang="ts">
import type { Content } from '@/types/models/content'
import ImageList from '../common/ImageList.vue'
import { computed, onBeforeMount, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/store/content'
import { formatDate } from '@/utils/formatDate'

const route = useRoute();
const router = useRouter();
const contentStore = useContentStore();
const content = computed(() => contentStore.selected);

onBeforeMount(() => {
  watchEffect(() => {
    if(route.path.match(/^\/content\/[0-9]/g)) {
      const { code } = route.params;
      const codeNum = Number(code);
      if(isNaN(codeNum)) {
        alert('잘못된 접근입니다.');
        router.push('/content');
        return;
      }
      contentStore.selected = contentStore.contentDetail(codeNum);
    }
  });
})
</script>

<template>
  <div class="container">
    <div v-if="content">
      <p>작성/수정일 : {{ formatDate(content.modified, 'LLL') }}</p>
      <p>계획일 : {{ formatDate(content.date, 'LLL') }}</p>
      <p>{{ content.detail?.address }}</p>
      <p>{{ content.detail?.description }}</p>
      <p v-if="content.detail?.isWent">다녀옴!</p>
      <p v-else>아직 못감 ㅠ</p>
      <ImageList
        v-if="content.images"
        :images="content.images"
        class=""
      />
    </div>
    <div v-else>
      그런 컨텐스 업슴네다..
    </div>
    <div class="btn_area">
      <router-link to="/content">목록</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>