<script lang="ts">
export default {
  name: 'Category'
}
</script>

<script setup lang="ts">
import type { Category } from '@/types/models/category'
import { useContentStore } from '@/store/content'
import { toRaw } from 'vue'

const props = defineProps<{
  category: Category,
  selected: boolean
}>();

const contentStore = useContentStore();
</script>

<template>
  <p @click="$emit('category:select', toRaw(props.category))" :class="{ selected: props.selected }">
    {{ props.category.name }} ({{ contentStore.countByCategory(props.category.code) }})
  </p>
</template>

<style scoped>
.selected {
  font-weight: 700;
  color: red;
}
</style>