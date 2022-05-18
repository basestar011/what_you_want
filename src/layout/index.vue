<script lang="ts">
export default {
  name: 'AppLayout'
}
</script>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue';
import LayoutGuest from './LayoutGuest.vue';
import { Layout } from '../types/enums'
import { RouteLocationMatched, useRoute } from 'vue-router';
import { computed, shallowRef, watchEffect } from 'vue'
import type { Component } from 'vue'
import { eagerComputed } from '@/utils/computed'

const $route = useRoute();
const recode = computed<RouteLocationMatched>(() => $route.matched.find(recode => recode.meta.layout));
const layout = eagerComputed<Layout>(() => recode.value ? recode.value.meta.layout : Layout.DEFAULT);

const layoutComponent = shallowRef<Component>();

watchEffect(() => {
  layoutComponent.value = loadComponent(layout.value);
});

function loadComponent(layout: Layout): Component {
  switch (layout) {
    case Layout.GUEST:
      return LayoutGuest;
    case Layout.DEFAULT: 
    default:
      return LayoutDefault;
  }
};
</script>

<template>
  <component :is="layoutComponent" />
</template>