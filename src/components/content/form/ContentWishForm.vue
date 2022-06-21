<script lang="ts">
export default {
  name: 'ContentWishForm'
}
</script>

<script setup lang="ts">
defineExpose({ detail: {
    wishdate: new Date(),
    description: '소원소원헤ㅔ헤',
    done: false
  }
});
</script>

<template>
  <div>
    wish form 입니다.
  </div>
</template>

<style scoped>

</style>