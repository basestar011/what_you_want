<script lang="ts">
export default {
  name: 'ContentSpaceForm'
}
</script>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
  address: '',
  description: ''
});

defineExpose(toRefs(state));
</script>

<template>
  <div>
    address: <input type="text" v-model="state.address">
    description: <textarea v-model="state.description"></textarea>
  </div>
</template>

<style scoped>

</style>