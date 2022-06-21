<script lang="ts">
export default {
  name: 'ContentDetailForm'
}
</script>

<script setup lang="ts">
import ContentSpaceForm from './ContentSpaceForm.vue'
import { watch, ref, shallowRef, defineAsyncComponent, onBeforeMount } from 'vue'
import { useContentStore } from '@/store/content'

type FormComponentType = InstanceType<typeof ContentSpaceForm>;

// expose된 값을 가져오기 위한 Component ref
const formComponent = ref<FormComponentType>(null);

// form type
const props = withDefaults(defineProps<{ type: string }>(), { type: 'space' });
// type에 따라 나타나는 detail form
const detailComponent = shallowRef<FormComponentType>(null);

watch(() => props.type, async (type) => {
  detailComponent.value = await loadContentForm(type);
});

onBeforeMount(async () => {
  detailComponent.value = await loadContentForm(props.type);
});

// type에 따른 form component load method
const loadContentForm = async (type: string) => {
  if(!type) return null;
  
  const formDetail = type.charAt(0).toUpperCase() + type.slice(1);
  return await defineAsyncComponent(() => import(`./Content${formDetail}Form.vue`))
}
// 부모 컴포넌트가 detail data 받는 method
const getFormDetail = () => formComponent.value?.detail ?? null;

defineExpose({ getFormDetail });
</script>

<template>
  <component :is="detailComponent" ref="formComponent"/>
</template>

<style scoped>
</style>