<script>
  export default {
    name: 'AppHeader'
  }
</script>

<template>
  <header>
    <h1><router-link to="/">What Do You Want ?</router-link></h1>
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