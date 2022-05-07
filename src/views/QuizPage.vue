<script>
export default {
  name: 'QuizPage'
}
</script>

<script setup>
import { computed, reactive } from 'vue'
import { quizDefinitions } from '@/components/quiz/quiz.config'
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizComplete from '@/components/quiz/QuizComplete.vue';

const state = reactive({
  step: 0,
  question: computed(() => quizDefinitions[state.step] && quizDefinitions[state.step].question),
  answer: computed(() => quizDefinitions[state.step] && quizDefinitions[state.step].answer),
  isComplete: computed(() => state.step === quizDefinitions.length)
});

// 다음 퀴즈 함수
const nextQuiz = () => {
  // step.value++;
  state.step++;
}
// 답 체크 함수
const submitAnswer = (input) => {
  if(state.answer === input) {
    nextQuiz();
  } else {
    alert('땡!!!');
    if(state.step !== 0) {
      alert('처음으로 돌아갑니다.');
      state.step = 0;
    }
  }
}
</script>

<template>
  <div class="container">
    <template v-if="state.isComplete">
      <QuizComplete />
    </template>
    <template v-else>
      <h1>퀴즈 {{ state.step + 1 }}</h1>
      <div class="step-wrapper">
        <QuizStep
          :question="state.question"
          @submit="submitAnswer"
        />
      </div>
    </template>
    <router-link to="/">홈으로</router-link>
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
.container a {
  text-decoration: none;
  color: black;
  font-size: 3rem;
  margin-top: 2rem;
}
.step-wrapper {
  min-width: 30%;
  max-width: 60%;
}
</style>