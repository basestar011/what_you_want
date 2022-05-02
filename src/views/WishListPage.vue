<script>
export default {
  name: 'WishListPage'
}
</script>

<script setup>
import { useWishlistStore } from '@/store/wishlist'
import { onBeforeMount } from 'vue';

const wishlistStore = useWishlistStore();

onBeforeMount(async () => {
  wishlistStore.categories = await wishlistStore.fetchAllCategory();
});
</script>

<template>
  <div>
    <h1>WISH LIST</h1>
  </div>
</template>

<style scoped>

</style>