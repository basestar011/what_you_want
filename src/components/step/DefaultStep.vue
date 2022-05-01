<script>
export default {
  name: 'Step'
}
</script>

<script setup>
import { ref } from 'vue';
const { question } = defineProps({
  question: {
    type: String,
    required: true
  }
});

const input = ref(null);
const emit = defineEmits(['submit']);

function submitForm(e) {
  const _value = input.value;
  if(_value === null || _value.trim() === '') {
    alert('퀴즈의 답을 입력해주세요.');
    return false;
  }

  emit('submit', _value);
  input.value = null;
}
</script>

<template>
  <h1>{{ question }}</h1>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="input" autofocus>
    <button type="submit">제출</button>
  </form>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}
form {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
form input {
  width: 70%;
  font-size: 2rem;
}
form button {
  width: 25%;
  font-size: 2rem;
}
</style>