<script>
  export default {
    name: 'AppHeader'
  }
</script>

<template>
  <header v-if="$router.path">
    <h1>What Do You Want ?</h1>
  </header>
</template>


<style scoped>
header h1 {
  text-align: center;
}
</style>