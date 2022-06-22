<script lang="ts">
export default {
  name: 'Image List'
}
</script>

<script setup lang="ts">
import type { Media } from '@/types/models/media'
const { images, deletable } = withDefaults(defineProps<{
  images: Media[],
  deletable?: boolean
}>(), { images: () => [], deletable: false });

function deleteImage(index: number, image: Media) {
  alert(`delete ${index+1} image~! [${image.id}, ${image.name}]`);
}
</script>

<template>
  <div class="container">
    <div v-for="(image, i) in images" class="image_wrapper">
      <img
        :src="image.srclink"
        :alt="image.name"
        class="image"
      />
      <button
        v-if="deletable"
        @click="deleteImage(i, image)"
        class="deleteBtn"
      >X</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}

.image_wrapper {
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 15px;
}
.image_wrapper .image {
  width: 100%;
  height: 100%;
}
.image_wrapper .deleteBtn {
  position: absolute;
  left: 60px;
  top: -10px;
  background-color: red;
  border: 2px solid red;
  border-radius: 30px;
  font-size: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
</style>