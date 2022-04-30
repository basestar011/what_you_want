<script setup>
</script>

<template>
  <div class="container">
    <p>What Do You Want?</p>
    <router-link to="/quiz">시작하기 -></router-link>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  font-size: 5rem;
  margin-top: 0;
}

a {
  text-decoration: none;
  padding: 0.5em 1em;
  font-size: 3em;
  background-color: aqua;
  color: white;
  font-family: 'Dongle';
  font-weight: 700;
  border: none;
  border-radius: 16px;
}
</style>