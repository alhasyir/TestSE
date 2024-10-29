<template>
  <!-- Overlay Background -->
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 z-40">
      <!-- Pop-up dialog with inner transition -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0"
      >
        <div v-if="visible" class="fixed inset-0 flex justify-center items-center z-50">
          <div
            v-if="visible"
            class="flex flex-col w-[300px] p-4 gap-3 items-center bg-white rounded-3xl shadow-lg"
          >
            <div class="flex flex-col items-center gap-1">
              <!-- Dynamic Title and Message -->
              <h3 class="text-lg font-semibold text-center">{{ title }}</h3>
              <p class="text-sm font-normal text-center">{{ message }}</p>
            </div>
            <!-- Adjust size based on isSuccess -->
            <DotLottieVue
              :src="isSuccess ? 'Succes.json' : 'Gagal.json'"
              autoplay
              loop
              :style="{
                width: isSuccess ? '100%' : '70%',
                height: isSuccess ? '100%' : '70%',
                marginTop: isSuccess ? '0px' : '10px',
                marginBottom: isSuccess ? '0px' : '10px'
              }"
            />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Konfirmasi' // Default title jika tidak diubah
  },
  message: {
    type: String,
    default: 'Apakah Anda yakin bahwa data sudah benar?' // Default message jika tidak diubah
  },
  isSuccess: {
    type: Boolean,
    default: true // Menentukan apakah hasilnya sukses atau gagal
  },
  visible: {
    type: Boolean,
    default: true // Mengontrol visibilitas pop-up
  }
})
</script>
