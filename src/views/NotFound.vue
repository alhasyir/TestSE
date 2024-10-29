<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 Not Found'
})
</script>
<template>
  <section>
    <div class="bg-white rounded-3xl w-auto h-full p-32 lg:p-52">
      <h1 class="font-sans font-bold text-dark text-base text-center">Link Tidak Ditemukan</h1>
      <h2 class="text-center font-sans text-sm text-gray-800">
        Silahkan untuk <a href="/login" class="underline text-primary-600">kembali</a>
      </h2>
    </div>
  </section>
</template>
