<script>
export default {
  name: 'AppLayout'
}
</script>

<script setup>
import LayoutDefault from './LayoutDefault.vue';
import LayoutGuest from './LayoutGuest.vue';
import { LAYOUT } from '@/common/constants'
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, reactive, unref, watch, defineAsyncComponent, shallowRef, watchEffect } from 'vue'
import { eagerComputed } from '@/hooks'

const $route = useRoute();
const recode = computed(() => $route.matched.find(recode => recode.meta.layout));
const layout = eagerComputed(() => recode.value ? recode.value.meta.layout : LAYOUT.default);

const layoutComponent = shallowRef();

watch(layout, async (value) => {
  layoutComponent.value = await loadComponent(value);
});

async function loadComponent(layout) {
  switch (layout) {
    case LAYOUT.guest:
      return defineAsyncComponent(() => import('./LayoutGuest.vue'));
    case LAYOUT.default: 
    default:
      return defineAsyncComponent(() => import('./LayoutDefault.vue'));
  }
};

onBeforeMount(async () => {
  layoutComponent.value = await loadComponent(unref(layout));
});
</script>

<template>
  <component :is="layoutComponent" />
</template>