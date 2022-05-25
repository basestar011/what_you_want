<script lang="ts">
export default {
  name: 'Add Category'
}
</script>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'

const state = reactive({ name: '', description: '' });

const clearForm = () => {
  state.name = '';
  state.description = '';
}
defineExpose({ clearForm })
const emit = defineEmits(['category:add']);

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
<!--
  카테고리 추가 컴포넌트
  - 메인 카테고리와 서브 카테고리 각각 추가할 수 있도록
  - 모달로 추가할 지 따로 추가 페이지에서 추가할 지 생각중
-->
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