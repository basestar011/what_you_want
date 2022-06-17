<script lang="ts">
export default {
  name: 'ContentSpaceForm'
}
</script>

<script setup lang="ts">
import type { Space } from '@/types/models/content'
import { reactive, ref } from 'vue'

const detail: Space = reactive({
  address: '',
  description: '',
  isWent: false
});

defineExpose({ detail });


</script>

<template>
  <div>
    <label for="content_address">주소: </label> <input type="text" id="content_address" v-model="detail.address">
    <label for="content_desc">내용/설명: </label><textarea id="content_desc" v-model="detail.description"></textarea>
  </div>
</template>

<style scoped>

</style>