<script lang="ts">
export default {
  name: 'ContentBasicForm'
}
</script>

<script setup lang="ts">
defineProps<{ title: string }>()
const emit = defineEmits(['update:title']);

const updateTitle = (e: Event): void => {
  const newTitle = (e.target as HTMLInputElement).value;
  emit('update:title', newTitle);
}
</script>

<template>
  <div>
    title : <input type="text" :value="title" @input="updateTitle" />
  </div>
</template>

<style scoped>

</style>