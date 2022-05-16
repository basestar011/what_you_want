<script>
export default {
  name: 'Category'
}
</script>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <p>({{ props.category.code }}){{ props.category.name }}</p>
</template>

<style scoped>

</style>