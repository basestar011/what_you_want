<script lang="ts">
  export default {
    name: 'AppHeader'
  }
</script>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref(import.meta.env.WDYW_APP_TITLE);
</script>

<template>
  <header>
    <h1><router-link to="/">{{ title }}</router-link></h1>
  </header>
</template>


<style scoped>
header h1 {
  text-align: center;
}
header a {
  text-decoration: none;
  color: white;
}
</style>