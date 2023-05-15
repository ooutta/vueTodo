import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // STATE
  const count = ref(0)

  // getter
  const doubleCount = computed(() => count.value * 2)
  
  // actions
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
