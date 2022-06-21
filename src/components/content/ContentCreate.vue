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
import { Content, Space, DetailType } from '@/types/models/content'
import { handleError } from '@/utils/error';
import { useRouter } from 'vue-router';
import type { Media } from '@/types/models/media'
import { useAuthDelete, useAuthPost } from '@/hooks/http'

// detail form Info
type DetailFormType = InstanceType<typeof ContentDetailForm>;
type detailLiteralType = '' | 'space';
const detailType = ref<detailLiteralType>('space');
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
    const data = await contentStore.addContent<DetailType<typeof detailType.value>>(toRaw(state));
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

async function addContent(detailType: detailLiteralType): Promise<any> {
  switch (detailType) {
    case 'space':
      return await contentStore.addContent<Space>(toRaw(state));
    case '':
      return await contentStore.addContent<{}>(toRaw(state));
  }
}

async function uploadImages(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const images = input.files;

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
  } finally {
    // 5. input file 초기화
    // IE를 제외한 브라우저에서 input file value 초기화 시키는 방법
    // value를 '' 로 초기화 시 input.files 도 초기화 된다.
    // TODO: IE 초기화는 나중에 필요할 때 추가
    input.value = '';
  }
}

// 첨부 이미지 파일 타입이 image/* 인지 체크
function checkImages(images: FileList): boolean {
  return Array.from(images).every(file => file.type.match("image/"));
}

// 첨부 이미지 삭제
async function removeImage(index: number, image: Media) {
  if(confirm('이 이미지를 삭제하시겠습니까?')) {
    try {
      // path가 포함된 id인 경우 http요청 시 /가 http 요청 경로로 인식되어 encoding 해야함.
      const imageId = image.path ? encodeURIComponent(`${image.path}/${image.id}`) : image.id
      const { status } = await useAuthDelete<any>(`/external/images/${imageId}`);
      if(status !== 204) {
        alert('이미지 삭제 중 에러가 발생했습니다.');
      } else {
        state.images.splice(index, 1);
      }
    } catch (error) {
      console.log(error);
      alert('이미지 삭제 중 에러가 발생했습니다.');
    }
  }
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
          <option value="wish" selected>소원</option>
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
        <div v-for="(image, i) in state.images" class="image_wrapper">
          <img :src="image.srclink" :alt="image.name" class="preview_image">
          <button type="button" @click="removeImage(i, image)" class="removeBtn">X</button>
        </div>
      </div>
      <ContentDetailForm :type="detailType" ref="detailForm"/>
      <div class="form_btn">
        <button type="submit">등록</button>
        <button type="button" @click="$router.push('/content')">이전</button>
      </div>
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
.form_btn {
  margin-top: 2em;
}
.form_btn button {
  font-size: 0.8em;
  width: 2.5em;
  margin-right: 0.5em;
}
</style>