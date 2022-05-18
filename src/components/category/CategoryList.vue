<script lang="ts">
export default {
  name: 'Category List'
}
</script>

<script setup lang="ts">
import Category from './Category.vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => ([])
  }
})
</script>

<template>
<ul>
  <li v-for="category in props.categories">
    <Category :category="category" />
  </li>
</ul>
</template>

<style scoped>

</style>