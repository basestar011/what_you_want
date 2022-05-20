<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const state = reactive({
  id: '', password: ''
});

const router = useRouter();

async function login(e) {
  try {
    await useAuthStore().login(toRaw(state));
    router.push('/content');
  } catch (error) {
    console.dir(error);
    alert(`${error.name} : ${error.message}`);
  }
}
</script>

<template>
  <div class="container">
    <p>What Do You Want?</p>
    <form @submit.prevent="login">
      <input type="text" placeholder="아이디" v-model="state.id"/>
      <input type="text" placeholder="패스워드" v-model="state.password"/>
      <button type="submit">로그인</button>
    </form>
    <!-- <router-link to="/quiz">퀴즈로 코드 힌트 얻기 :)</router-link> -->
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