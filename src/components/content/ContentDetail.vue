<script lang="ts">
export default {
  name: 'ContentDetail'
}
</script>

<script setup lang="ts">
import type { Content } from '@/types/models/content'
const { content } = defineProps<{
  content: Content<any>
}>();
</script>

<template>
  <div>
    code: {{ content.code }}<br/>
    title: {{ content.title }}<br/>
    categoryCode: {{ content.cg_code }}<br/>
    created: {{ content.created }}<br/>
    modified: {{ content.modified }}<br/>
    detail: {{ content.detail }}
  </div>
</template>

<style scoped>

</style>