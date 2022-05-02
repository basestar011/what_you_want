import { watchEffect, shallowRef, readonly } from 'vue'

export function eagerComputed(fn) {
  const result = shallowRef();
  watchEffect(() => result.value = fn(), { flush: 'sync' });
  return readonly(result);
}