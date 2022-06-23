<script lang="ts">
export default {
  name: 'Category'
}
</script>

<script setup lang="ts">
import type { Category } from '@/types/models/category'
import { toRaw } from 'vue'

const { category, selected } = defineProps<{
  category: Category,
  selected: boolean
}>();
</script>

<template>
  <p @click="$emit('category:select', toRaw(category))" :class="{ selected: selected }">
    {{ category.name }} ({{ category.count }})
  </p>
</template>

<style scoped>
.selected {
  font-weight: 700;
  color: red;
}
</style>