<template>
  <button
    :type="type"
    @click="onClick"
    :disabled="disabled"
    class="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold flex justify-center items-center relative"
  >
    <slot></slot>
    <span v-if="!isLoading">{{ label }}</span>
    <span v-else>
      <svg
        class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  onClick: {
    type: Function as unknown as () => (payload: MouseEvent) => void,
    default: () => {}
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})
</script>
