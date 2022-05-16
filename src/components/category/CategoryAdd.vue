<script>
export default {
  name: 'Add Category'
}
</script>

<script setup>
import { reactive, toRaw } from 'vue'

const state = reactive({ name: '', description: '' });

const emit = defineEmits(['category:add']);
const clearForm = () => {
  state.name = '';
  state.description = '';
}
defineExpose({ clearForm })

const addCategory = (e) => {
  if(state.name.trim() === '') {
    alert('카테고리 이름을 입력하세요');
    return false;
  }

  if(state.description.trim() === '') {
    alert('카테고리 설명을 입력하세요');
    return false;
  }

  emit('category:add', toRaw(state));
}
</script>

<template>
  <div>
    <form @submit.prevent="addCategory">
      <input type="text" v-model="state.name" />
      <textarea cols="30" rows="10" v-model="state.description"></textarea>
      <button type="submit">추가</button>
    </form>
  </div>
</template>

<style scoped>

</style>