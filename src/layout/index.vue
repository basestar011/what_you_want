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
import { computed, shallowRef, watchEffect } from 'vue'
import { eagerComputed } from '@/utils/computed'

const $route = useRoute();
const recode = computed(() => $route.matched.find(recode => recode.meta.layout));
const layout = eagerComputed(() => recode.value ? recode.value.meta.layout : LAYOUT.default);

const layoutComponent = shallowRef();

watchEffect(() => {
  layoutComponent.value = loadComponent(layout.value);
});

function loadComponent(layout) {
  switch (layout) {
    case LAYOUT.guest:
      return LayoutGuest;
    case LAYOUT.default: 
    default:
      return LayoutDefault;
  }
};
</script>

<template>
  <component :is="layoutComponent" />
</template>