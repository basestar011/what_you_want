<script>
export default {
  name: 'QuizPage'
}
</script>

<script setup>
import { ref, unref, computed, reactive } from 'vue'
import { stepDefinitions } from '@/components/step'
import DefaultStep from '@/components/step/DefaultStep.vue'

const state = reactive({
  step: 0,
  question: computed(() => stepDefinitions[state.step] && stepDefinitions[state.step].question),
  answer: computed(() => stepDefinitions[state.step] && stepDefinitions[state.step].answer),
  isComplete: computed(() => state.step === stepDefinitions.length)
});

// 다음 스탭 함수
const nextStep = () => {
  // step.value++;
  state.step++;
}
// 답 체크 함수
const submitAnswer = (input) => {
  if(state.answer === input) {
    nextStep();
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
      <h1>코드 힌트</h1>
      <p>우리가 처음 사귀게 된 장소 (영어로)</p>
    </template>
    <template v-else>
      <h1>퀴즈 {{ state.step + 1 }}</h1>
      <div class="step-wrapper">
        <DefaultStep
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