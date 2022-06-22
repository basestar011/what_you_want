<script lang="ts">
export default {
  name: 'ContentWishForm'
}
</script>

<script setup lang="ts">
import type { ContentValidate } from '@/types/models/content'
import { reactive } from 'vue'

const detail = reactive({
  wishdate: new Date(),
  description: '소원소원헤ㅔ헤',
  done: false
});

const validate: ContentValidate = (): string => {
  return null;
}

defineExpose({ detail, validate });
</script>

<template>
  <div>
    wish form 입니다.
  </div>
</template>

<style scoped>

</style>