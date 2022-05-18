<script>
export default {
  name: 'DefaultLayout'
}
</script>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import AppMain from '@/components/common/AppMain.vue'
</script>

<template>
  <AppHeader />
  <AppMain />
</template>