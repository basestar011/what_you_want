<script lang="ts">
export default {
  name: 'ContentTestForm'
}
</script>

<script setup lang="ts">
import type { ContentValidate } from '@/types/models/content'
import { reactive } from 'vue'

type detailType = {
  test1: string
  test2: string
  sample: string
};

// detail form data 작성
const detail = reactive<detailType>({
  test1: '',
  test2: '',
  sample: ''
})

// formdata validate 함수 작성
const validate: ContentValidate = (): string => {
  return null;
}

defineExpose({ detail, validate })
</script>

<template>
  <div>
    test form
  </div>
</template>

<style scoped>

</style>