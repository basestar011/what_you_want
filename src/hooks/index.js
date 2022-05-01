import { watchEffect, shallowRef, readonly, defineEmits } from 'vue'

export function eagerComputed(fn) {
  const result = shallowRef();
  watchEffect(() => result.value = fn(), { flush: 'sync' });
  return readonly(result);
}