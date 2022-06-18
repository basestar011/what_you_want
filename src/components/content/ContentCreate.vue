<script lang="ts">
export default {
  name: 'ContentCreate'
}
</script>

<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import { useContentStore } from '@/store/content'
import { reactive, ref, toRaw } from 'vue';
import ContentDetailForm from './form/ContentDetailForm.vue';
import { Content, Space } from '@/types/models/content'
import { handleError } from '@/utils/error';
import { useRouter } from 'vue-router';
import type { Media } from '@/types/models/media'
import { useAuthPost } from '@/hooks/http'

// detail form Info
type DetailFormType = InstanceType<typeof ContentDetailForm>;
const detailType = ref<string>('space');
const detailForm = ref<DetailFormType>(null);

const state = reactive<Partial<Content<any>>>({
  cg_code: 0,
  title: '',
  detail: {},
  date: null,
  images: []
})

const imageInput = ref<HTMLInputElement>(null);


const categoryStore = useCategoryStore();
const contentStore = useContentStore();
const router = useRouter();

// 새 카테고리 추가
function addNewCategory(event: Event) {
  // TODO: 컨텐츠 생성 페이지에서 카테고리 추가 팝업 열기
}
// 새 컨텐츠 생성 
async function submitContent(e: SubmitEvent) {
  // TODO: content validation 추가
  // 1) form validation
  // 1-1. basic form validate
  // 1-2. detail form validate

  // 2) set detail form data
  state.detail = detailForm.value?.getFormDetail() ?? {};
  
  try {
    // 3) add contents
    const data = await categoryStore.addContentByCategory<Space>(toRaw(state));
    Array.prototype.forEach.call(data, file => {
      console.log(`filename: ${file.filename}, size: ${file.filesize}, key: ${file.key}`);
    });
    alert('완료~');

    // 4) move contents page
    router.push('/content')
  } catch (error) {
    const { message } = handleError(error);
    alert(message);
  }
}
function checkBasicForm() {

}

async function uploadImages(event: Event): Promise<void> {
  const images = (event.target as HTMLInputElement).files;

  // 1. upload하려는 파일 체크
  if(!checkImages(images)) {
    alert('이미지 파일만 추가 가능합니다.');
    return;
  }

  // 2. multipart/formdata 전송을 위한 formdata 세팅
  const formData = new FormData();
  Array.from(images).forEach(file => formData.append('images', file));

  try {
    // 3. 이미지 aws s3 upload
    const { data: uploadedImages } = await useAuthPost<FormData, Media[]>('/external/images', formData);
    
    // 4. images 배열에 추가
    state.images = [...state.images, ...uploadedImages];
  } catch (error) {
    const { message } = handleError(error);
    alert(message ?? error.message);
  }

}

// 첨부 이미지 파일 타입이 image/* 인지 체크
function checkImages(images: FileList): boolean {
  return Array.from(images).every(file => file.type.match("image/"));
}
</script>

<template>
  <div>
    <h1 class="page_title">컨텐츠 등록</h1>
    <form class="page_form" @submit.prevent="submitContent">
      <div class="form_line">
        <span class="essential">*</span>
        <span class="form_description">카테고리</span>
        <select class="form_select" v-model.number="state.cg_code">
          <option value="0" selected>카테고리를 선택하세요.</option>
          <option
            v-for="category in categoryStore.list"
            :value="category.code"
          >{{ category.name }}</option>
        </select>
        <button type="button" class="form_button" @click="addNewCategory">새 카테고리 추가</button>
      </div>
      <div class="form_line">
        <span class="essential">*</span>
        <span class="form_description">컨텐츠 유형</span>
        <select class="form_select" v-model="detailType">
          <option value="">일반</option>
          <option value="space" selected>장소</option>
        </select>
      </div>
      <div class="form_line">
        <span class="essential">*</span>
        <span class="form_description">컨텐츠 제목</span>
        <input type="text"  class="form_text" v-model="state.title" />
      </div>
      <div class="form_line">
        <span class="form_description form_optional">날짜</span>
        <input type="date" class="form_date" v-model="state.date"/>
      </div>
      <div class="form_line">
        <span class="form_description">이미지</span>
        <button type="button" class="form_button" @click="imageInput.click()">이미지 추가</button>
        <input type="file" class="form_file" ref="imageInput" @change="uploadImages" multiple accept="image/*" />
      </div>
      <div v-if="state.images.length > 0" class="form_line">
        <div v-for="image in state.images" class="image_wrapper">
          <img :src="image.srclink" :alt="image.name" class="preview_image">
          <button type="button" @click="" class="removeBtn">X</button>
        </div>
      </div>
      <ContentDetailForm :type="detailType" ref="detailForm"/>
      <button type="submit">생성</button>
    </form>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid lightslategrey;
  font-size: 2.5em;
}
.page_form {
  padding: 1em 1em;
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  font-size: 1.5em;
}
.form_line {
  display: flex;
  align-items: center;
}
.form_line .form_select,
.form_line .form_button,
.form_line .form_text,
.form_line .form_date {
  font-size: 1em;
}
.form_line .image_wrapper {
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 15px;
}
.form_line .image_wrapper .preview_image {
  width: 100%;
  height: 100%;
}
.form_line .image_wrapper .removeBtn {
  position: absolute;
  left: 60px;
  top: -10px;
  background-color: red;
  border: 2px solid red;
  border-radius: 30px;
  font-size: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.essential {
  margin-right: 0.3em;
  color: red;
}
.form_description {
  margin-right: 0.5em;
}
.form_description.form_optional {
  margin-left: 0.8em;
}
.form_select {
  width: 30%;
}
.form_text {
  width: 70%;
}
.form_button {
  margin-left: 0.5em
}
.form_file {
  display: none;
}
</style>