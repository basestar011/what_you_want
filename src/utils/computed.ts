import { watchEffect, shallowRef, readonly, Ref, DeepReadonly } from 'vue'

export function eagerComputed<T>(fn: () => T): DeepReadonly<Ref<T>> {
  const result = shallowRef<T>();
  watchEffect(() => result.value = fn(), { flush: 'sync' });
  return readonly(result);
}