<script lang="ts">
export default {
  name: 'ContentCreate'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { useContentStore } from '@/store/content'
import { reactive, ref, toRaw } from 'vue';
import ContentBasicForm from './form/ContentBasicForm.vue';
import ContentDetailForm from './form/ContentDetailForm.vue';
import { Content, Space } from '@/types/models/content'
import { handleError } from '@/utils/error';
import { useRouter } from 'vue-router';

type DetailFormType = InstanceType<typeof ContentDetailForm>;

const form = reactive<Pick<Content<any>, 'title' | 'detail' | 'cg_code'>>({
  title: '',
  detail: {},
  cg_code: 0
})

const type = ref('space');
const detailForm = ref<DetailFormType>(null);

const categoryStore = useCategoryStore();
const contentStore = useContentStore();
const router = useRouter();

const createContent = async (e: SubmitEvent) => {
  form.detail = detailForm.value?.getFormDetail();
  console.log('create', toRaw(form));
  
  const formdata: FormData = createFormData(toRaw(form));
  try {
    const data = await categoryStore.addContentByCategory<Space>(formdata);
    Array.prototype.forEach.call(data, file => {
      console.log(`filename: ${file.filename}, size: ${file.filesize}, key: ${file.key}`);
    });
    alert('완료~');
    router.push('/content')
  } catch (error) {
    const { message } = handleError(error);
    alert(message);
  }
  
}

function createFormData(form: Pick<Content<any>, 'title' | 'detail' | 'cg_code'>) {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('cg_code', String(form.cg_code));
  formData.append('detail', form.detail);
  if(form.detail.photos) {
    for(let i=0; i<form.detail.photos.length; i++) {
      const photo = form.detail.photos[i];
      formData.append('photos', photo);
    }
  }
  return formData;
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
        <option value="space" selected>장소</option>
      </select>
      <ContentBasicForm v-model:title="form.title" />
      <ContentDetailForm :type="type" ref="detailForm"/>
      <button type="submit">생성</button>
    </form>
  </div>
</template>

<style scoped>

</style>