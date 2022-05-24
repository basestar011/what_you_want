<script lang="ts">
export default {
  name: 'Content Create'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { reactive, ref, toRaw } from 'vue';
import ContentBasicForm from './form/ContentBasicForm.vue';
import ContentDetailForm from './form/ContentDetailForm.vue';
import { Space, Content } from '@/types/models/content'
import { handleError } from '@/utils/error';
import { useRouter } from 'vue-router';
import { getHeapSpaceStatistics } from 'v8';

const form = reactive<Omit<Content<any>, 'code'>>({
  title: '',
  detail: {},
  cg_code: 0
})

const type = ref('space');
const detailForm = ref(null);

const categoryStore = useCategoryStore();
const router = useRouter();

const createContent = async (e: SubmitEvent) => {
  const detailComp = detailForm.value;
  if(type.value === 'space') {
  }
  /*
  const formdata = toRaw(form);
  try {
    const { code } = await categoryStore.addContentByCategory<Space>(formdata);
    console.log(`created Content code : ${code}`);
    alert('완료~');
    router.push('/content')
  } catch (error) {
    const { message } = handleError(error);
    alert(message);
  }
  */
}
</script>

<template>
  <div>
    Content Create
    <form @submit.prevent="createContent">
      <select v-model.number="form.cg_code">
        <option value="">카테고리를 선택하세요.</option>
        <option
          v-for="category in categoryStore.list"
          :value="category.code"
        >{{ category.name }}</option>
      </select>
      <select v-model="type">
        <option value="space">장소</option>
        <option value="test">테스트</option>
      </select>
      <ContentBasicForm v-model:title="form.title" />
      <ContentDetailForm :type="type" ref="detailForm"/>
      <button type="submit">생성</button>
    </form>
  </div>
</template>

<style scoped>

</style>