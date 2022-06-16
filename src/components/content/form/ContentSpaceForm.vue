<script lang="ts">
export default {
  name: 'ContentSpaceForm'
}
</script>

<script setup lang="ts">
import type { Space } from '@/types/models/content'
import { reactive, ref } from 'vue'

const photos = ref<HTMLInputElement>(null);
const detail: Space = reactive({
  address: '',
  description: '',
  isWent: false,
  photos: [],
});

defineExpose({ detail });

function changePhoto() {
  detail.photos = [];
  Array.prototype.forEach.call(photos.value.files, (file: File) => {
    detail.photos.push(file);
  });
}
</script>

<template>
  <div>
    <label for="content_address">주소: </label> <input type="text" id="content_address" v-model="detail.address">
    <label for="content_desc">내용/설명: </label><textarea id="content_desc" v-model="detail.description"></textarea>
    <label for="photo">사진 등록 </label><input id="photo" type="file" @change="changePhoto" ref="photos" multiple/>
  </div>
</template>

<style scoped>

</style>