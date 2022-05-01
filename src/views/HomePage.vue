<script setup>
import { ref, unref } from 'vue';
import { useRouter } from 'vue-router'

const code = ref(null);
const router = useRouter();

function connect(e) {
  if(unref(code) === 'roof808') {
    router.push('/wishlist');
  } else {
    alert('좀 더 분발하세요!');
  }
}
</script>

<template>
  <div class="container">
    <p>What Do You Want?</p>
    <form @submit.prevent="connect">
      <input type="text" placeholder="코드를 입력하세요" v-model="code"/>
      <button type="submit">접속</button>
    </form>
    <router-link to="/quiz">퀴즈로 코드 힌트 얻기 :)</router-link>
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

.container p {
  font-size: 5rem;
  margin-bottom: 0;
}

.container form {
  width: 40%;
  height: 50px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

form input {
  margin-left: 10px;
  padding: 1px 10px;
  font-size: 2rem;
}

form button {
  margin: 0 10px;
  height: 100%;
  min-width: 4rem;
  font-size: 2rem;
}

.container a {
  text-decoration: none;
  padding: 0.5em 1em;
  font-size: 3em;
  background-color: lightskyblue;
  color: white;
  font-family: 'Dongle';
  font-weight: 700;
  border: none;
  border-radius: 16px;
}
</style>