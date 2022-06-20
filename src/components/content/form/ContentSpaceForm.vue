<script lang="ts">
export default {
  name: 'ContentSpaceForm'
}
</script>

<script setup lang="ts">
import type { Space } from '@/types/models/content'
import { reactive } from 'vue'

const detail: Space = reactive({
  address: '',
  description: '',
  isWent: false
});

defineExpose({ detail });
</script>

<template>
  <div class="container">
    <div class="space_address">
      <label for="content_address">위치</label>
      <input type="text" id="content_address" v-model="detail.address">
    </div>
    <div class="space_desc">
      <label for="content_desc">내용</label>
      <textarea id="content_desc" v-model="detail.description"></textarea>
    </div>
    <div class="space_isWent">
      <label for="content_isWent">갔다온곳</label>
      <input type="checkbox" id="content_isWent" v-model="detail.isWent"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  width: 100%;
}
.container label {
  margin-right: 1em;
}
.space_address, .space_desc, .space_isWent {
  display: flex;
  align-items: center;
  min-width: 700px;
}
.space_address input, .space_desc textarea {
  width: 70%;
  resize: none;
}

</style>