<template>
  <!-- Overlay Background -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40">
    <!-- Pop-up dialog -->
    <div class="fixed inset-0 flex justify-center items-center z-50">
      <div class="flex flex-col w-[300px] p-4 gap-3 items-center bg-white rounded-3xl shadow-lg">
        <div class="flex flex-col items-center gap-1">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Mohon menunggu</h3>
          <p class="text-sm text-gray-500">Sedang memprosess data</p>
        </div>
        <div class="my-10">
          <svg
            class="animate-spin h-14 w-14 text-gray-500 mx-auto"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false
  }
})
</script>
