<template>
  <!-- Overlay Background -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="onCancel">
    <!-- Pop-up dialog -->
    <div class="fixed inset-0 flex justify-center items-center z-50">
      <div class="flex flex-col w-[300px] p-4 gap-3 items-center bg-white rounded-3xl shadow-lg">
        <!-- Warning Icon -->
        <WarningIcon class="w-full" />
        <div class="flex flex-col items-center gap-1">
          <!-- Dynamic Title and Message -->
          <h3 class="text-lg font-semibold text-center">{{ title }}</h3>
          <p class="text-sm font-normal text-center">{{ message }}</p>
        </div>

        <!-- Confirm Button -->
        <button
          @click="onConfirm"
          class="bg-red-500 text-white text-base font-semibold w-full flex justify-center items-center gap-1 py-2 px-4 rounded-lg"
        >
          {{ confirmText }}
        </button>

        <!-- Cancel Button -->
        <button
          @click="onCancel"
          class="bg-gray-200 text-black text-base font-semibold w-full flex justify-center items-center gap-1 py-2 px-4 rounded-lg mt-2"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from './icons/WarningIcon.vue'
import { type PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Konfirmasi' // Default title jika tidak diubah
  },
  message: {
    type: String,
    default: 'Apakah Anda yakin bahwa data sudah benar?' // Default message jika tidak diubah
  },
  confirmText: {
    type: String,
    default: 'Data Sudah Benar' // Teks default tombol konfirmasi
  },
  cancelText: {
    type: String,
    default: 'Batal' // Teks default tombol batal
  },
  onConfirm: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  },
  onCancel: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  }
})
</script>
