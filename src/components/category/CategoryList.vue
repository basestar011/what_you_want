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
<!-- 
  카테고리 리스트 컴포넌트
  - 카테고리 나열
  - 카테고리 별 컨텐츠 갯수 전시 ex) 카테고리1 (2)
  - 서브 카테고리 추가 예정
-->
<ul>
  <li v-for="category in props.categories">
    <Category :category="category" />
  </li>
</ul>
</template>

<style scoped>

</style>