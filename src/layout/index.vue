<script setup>
import LayoutDefault from './LayoutDefault.vue';
import LayoutGuest from './LayoutGuest.vue';
import { LAYOUT } from '@/common/constants'
import { useRoute } from 'vue-router';

const recode = useRoute().matched.find(recode => recode.meta.layout);
const pageLayout = recode ? (recode.meta.layout || LAYOUT.default) : LAYOUT.default;

let layoutComponent;
switch (pageLayout) {
  case LAYOUT.guest:
    layoutComponent = LayoutGuest;
    break;
  case LAYOUT.default: 
  default:
    layoutComponent = LayoutDefault;
    break;
}
</script>

<template>
  <component :is="layoutComponent" />
</template>
