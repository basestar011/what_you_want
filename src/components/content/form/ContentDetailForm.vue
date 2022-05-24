<script lang="ts">
export default {
  name: 'ContentDetailForm'
}
</script>

<script setup lang="ts">
import { watch, ref, shallowRef, defineAsyncComponent, onBeforeMount, computed } from 'vue'

const formComponent = ref(null);
const address = computed(() => formComponent.value?.address);
const description = computed(() => formComponent.value?.description);
const test = computed(() => formComponent.value?.test);

// form type
const props = withDefaults(defineProps<{ type: string }>(), { type: 'space' });
// type에 따라 나타나는 detail form
const detailComponent = shallowRef(null);

watch(() => props.type, async (type) => {
  detailComponent.value = await loadContentForm(type);
});

onBeforeMount(async () => {
  detailComponent.value = await loadContentForm(props.type);
});

// type에 따른 form component load method
const loadContentForm = async (type: string) => {
  const formDetail = type.charAt(0).toUpperCase() + type.slice(1);
  return await defineAsyncComponent(() => import(`./Content${formDetail}Form.vue`))
}

defineExpose({ address, description, test })
</script>

<template>
  <component :is="detailComponent" ref="formComponent"/>
</template>

<style scoped>

</style>