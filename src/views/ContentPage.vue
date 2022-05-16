<script>
export default {
  name: 'ContentPage'
}
</script>

<script setup>
import { useCategoryStore } from '@/store/category'
import { onBeforeMount, reactive, toRaw } from 'vue';

const categoryStore = useCategoryStore();
const state = reactive({ name: '', description: '' });

const addCategory = async () => {
  if(state.name.trim() === '') {
    alert('카테고리 이름을 입력하세요');
    return false;
  }

  if(state.description.trim() === '') {
    alert('카테고리 설명을 입력하세요');
    return false;
  }

  try {
    const { status, data } = await categoryStore.addCategory(toRaw(state));
    if(status === 201) {
      alert('추가되었습니다.');
      await categoryStore.fetchAllCategory();
    }
  } catch (error) {
    console.error(error);
    alert('카테고리 추가 중에 에러가 발생했습니다.');
  }
}

onBeforeMount(async () => {
  try {
    await categoryStore.fetchAllCategory();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <h1>Content Page</h1>
  </div>
  <div>
    <ul>
      <li v-for="category in categoryStore.list">
        ({{ category.code }}) {{ category.name }}
      </li>
    </ul>
  </div>
  <div>
    <input type="text" v-model="state.name" />
    <textarea cols="30" rows="10" v-model="state.description"></textarea>
    <button @click="addCategory">추가</button>
  </div>
</template>

<style scoped>

</style>