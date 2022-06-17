<script lang="ts">
export default {
  name: 'ContentBasicForm'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthPost } from '@/hooks/http'
import type { Media } from '@/types/models/media'
import { handleError } from '@/utils/error';

defineProps<{ title: string }>()
// input file element ref
const fileInput = ref<HTMLInputElement>(null);
// 업로드 된 이미지
const uploadedImages = ref<Media[]>([]);

// 컨텐츠 title 관련 event
const emit = defineEmits(['update:title']);
const updateTitle = (e: Event): void => {
  const newTitle = (e.target as HTMLInputElement).value;
  emit('update:title', newTitle);
}

// 이미지파일 추가 시 change 이벤트
async function addPhotos(event: Event) {
  const inputFile = event.target as HTMLInputElement;

  const files: FileList = inputFile.files;
  const fileToUpload: File[] = [];
  for(let i=0; i<files.length; i++) {
    fileToUpload.push(files[i]);
  }

  if(validateUploadImages(fileToUpload)) {
    const images = await uploadImages(fileToUpload) as Media[];
    uploadedImages.value = [...uploadedImages.value, ...images];
  } else {
    alert('이미지 파일만 업로드 가능합니다.');
  }
  initInputFile();
}

/**
 * input file 초기화
 */
function initInputFile(): void {
  // TODO: ie는 다르게 해야한다는 것 같음. 나중에 추가
  fileInput.value.value = '';
}

/**
 * 업로드 할 이미지 파일 유효성 검사
 * @param images 
 */
function validateUploadImages(images: File[]): boolean {
  return images.every(image => image.type.match(/image-*/));
}

/**
 * 이미지 aws s3에 업로드 후 업로드된 정보 받아옴
 * @param images 이미지 파일
 */
async function uploadImages(images: File[]): Promise<Media[] | void> {
  try {
    const imageUploadForm = new FormData();
    images.forEach(image => imageUploadForm.append('images', image));
    const { data } = await useAuthPost<FormData, Media[]>('/external/images', imageUploadForm);
    return data;
  } catch (error) {
    const { message } = handleError(error);
    alert(message);
  }
}

/**
 * 업로드한 이미지 삭제
 */
function deleteImage(index: number) {
  console.log('삭제', uploadedImages.value[index]);
  // uploadedImages.value.splice(index, 1);
}
</script>

<template>
  <div>
    <label>제목</label><input type="text" :value="title" @input="updateTitle" />
    <label for="photo">사진 등록</label><input id="photo" type="file" @change="addPhotos" ref="fileInput" multiple accept="image/*,.pdf"/>
    <div class="preview_area">
      <ul class="preview">
        <li v-for="(image, i) in uploadedImages">
          <p>{{i + 1}}번째 이미지 <button @click.prevent="deleteImage(i)">x</button></p>
          <p>{{ image }}</p>
          <img :src="image.srclink" width="50px" height="50px"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.preview {
  list-style: none;
}
</style>