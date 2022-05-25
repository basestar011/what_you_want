<script lang="ts">
export default {
  name: 'ContentSpaceForm'
}
</script>

<script setup lang="ts">
import { reactive } from 'vue'

const detail = reactive({
  address: '',
  description: '',
  isWent: false
});

defineExpose({ detail });
</script>

<template>
  <div>
    address: <input type="text" v-model="detail.address">
    description: <textarea v-model="detail.description"></textarea>
  </div>
</template>

<style scoped>

</style>