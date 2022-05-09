<script>
export default {
  name: 'WishListPage'
}
</script>

<script setup>
import { useWishlistStore } from '@/store/wishlist'
import { onBeforeMount, reactive, toRaw } from 'vue';

const wishlistStore = useWishlistStore();
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

  const response = await wishlistStore.addCategory(toRaw(state));
  console.log(response);
}

onBeforeMount(async () => {
  try {
    const response = await wishlistStore.fetchAllCategory();
    if(response.status === 200) {
      wishlistStore.categories = response.data;
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <h1>WISH LIST</h1>
    <input type="text" v-model="state.name" />
    <textarea cols="30" rows="10" v-model="state.description"></textarea>
    <button @click="addCategory">추가</button>
  </div>
</template>

<style scoped>

</style>