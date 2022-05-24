<script lang="ts">
export default {
  name: 'BaseModal'
}
</script>

<script setup lang="ts">

</script>

<template>
  <transition name="modal" appear>
    <section class="modal">
      <div class="modal__window">
        <div class="modal__title">
          <!-- <slot name="title" /> -->
          타이틀
        </div>
        <div class="modal__content">
          <!-- <slot name="content" /> -->
          콘텐츠
        </div>
        <div class="modal__footer">
          <!-- <slot name="footer" /> -->
          푸터
        </div>
      </div>
      <div class="modal__overlay" @click.self="$emit('modal:close')"></div>
    </section>
  </transition>
</template>

<style scoped>
.modal {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 0.8;
}

.modal__window {
  width: 30rem;
  height: 40rem;
  border-radius: 0.4rem;
  overflow: hidden;
  padding: 1rem;
  z-index: 1;

  background-color: white;
}

.modal__title, .modal__content, .modal__footer {
  font-size: 10px;
  z-index: 99;
}

.modal__title {

}

.modal__content {

}

.modal__footer {

}

.modal-enter, .modal-leave-to {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.modal-enter-to, .modal-leave {
  transition: opacity 0.4s ease;
}
</style>