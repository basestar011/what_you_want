<script>
  export default {
    name: 'QuizPage'
  }
</script>

<script setup>
import { ref, reactive } from 'vue'

const who = reactive({
  name: '', age: '', tall: ''
});
const submitForm = () => {
  const { name, age, tall } = who;
  alert(name, age, tall);
}
</script>

<template>
  <div class="container">
    <h1>퀴즈</h1>
    <div class="form-wrapper">
      <form @submit.prevent="submitForm">
        <div>
          <span class="label">이름</span><input type="text" v-model.trim="who.name">
        </div>
        <div>
          <span class="label">나이</span><input type="text" v-model.number="who.age">
        </div>
        <div>
          <span class="label">키</span><input type="text" v-model.number="who.tall">
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container h1 {
  font-size: 6rem;
  margin: 1rem 0px;
}
.form-wrapper {
  min-width: 30%;
}
.form-wrapper form {
  width: 100%;
  display: flex;
  flex-direction: column;

}
.form-wrapper form div {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}
.form-wrapper form div input {
  min-width: 200px;
  padding: 0.3rem 1rem;
}
.form-wrapper form button {
  align-self: stretch;
  font-family: 'Dongle';
  font-size: 1.5rem;
  font-weight: 300;
}
.form-wrapper .label {
  font-size: 2rem;
}
</style>