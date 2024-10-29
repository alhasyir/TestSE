<template>
  <LayoutProvider>
    <template #content>
      <div class="flex flex-col min-h-screen">
        <!-- icon = name -->
        <div class="flex gap-3 justify-start items-center p-4 bg-red-500">
          <ElectionBox />
          <h1 class="font-sans text-white text-lg">SmartElection</h1>
        </div>

        <!-- foto logo -->
        <div class="flex justify-center items-center">
          <FotoKK class="w-36 h-52" />
        </div>

        <!-- input -->
        <div class="bg-gray-50 rounded-t-3xl pt-6 px-4 mt-4 flex-grow">
          <h1 class="font-sans font-semibold text-3xl">Suara KK</h1>
          <p class="font-sans text-sm">Silahkan masuk untuk mulai mengisi form perolehan suara.</p>

          <form id="login" @submit.prevent="onLogin">
            <div class="mb-4 mt-6">
              <label for="username" class="text-sm font-medium">Username</label>
              <InputText
                id="username"
                type="text"
                placeholder="Silahkan masukan username"
                @update:value="username = $event"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div class="mb-4 mt-6 relative">
              <label for="password" class="text-sm font-medium">Password</label>
              <InputText
                id="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Silahkan masukan password"
                @update:value="password = $event"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
              />

              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <RedEye v-if="showPassword" />
                <GrayEye v-else />
              </button>
              <a class="text-sm text-red-500">Lupa password? silahkan hubungi admin!</a>
            </div>

            <div class="my-8">
              <ButtonSubmit
                type="submit"
                label="Masuk"
                :isLoading="isLoading"
                :disabled="isLoading"
                class="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold text-center justify-center"
              />
            </div>
          </form>
        </div>

        <footer class="bg-gray-50 py-4">
          <h1 class="text-center">Smartelection by Sadigit</h1>
        </footer>
      </div>
    </template>
  </LayoutProvider>
  <NotificationDialog
    v-if="isNotificationVisible"
    :title="notificationData.title"
    :message="notificationData.message"
    :isSuccess="notificationData.isSuccess"
  />
</template>

<script setup lang="ts">
import { ButtonSubmit, InputText, NotificationDialog } from '@/components'
import { FotoKK, GrayEye, RedEye } from '@/components/icons'
import ElectionBox from '@/components/icons/electionBox.vue'
import LayoutProvider from '@/components/LayoutProvider.vue'
import { useDialogStore } from '@/stores/dialog'
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/stores/account'
import { createAuth } from '@/api'
import router from '@/router'
import { writeData, writeDataJson } from '@/utils/storage'

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const dialog = useDialogStore()
const isLoading = ref(false)
const username = ref('')
const password = ref('')
const account = useAccountStore()
const notificationData = ref({ title: '', message: '', isSuccess: true })
const isNotificationVisible = ref(false)

const validate = () => {
  isLoading.value = false
  if (!username.value) {
    onEmptyUsername()
    return false
  }

  if (!password.value) {
    onEmptyPassword()
    return false
  }

  return true
}

const onLogin = () => {
  // if (!isLoading.value) {
  //   isLoading.value = true

  //   if (validate()) {
  //     const data = {
  //       username: username.value,
  //       password: password.value
  //     }
  //     createAuth(data)
  //       .then((res) => {
  //         console.log('Respons Login:', res.data)
  //         const result = res.data
  //         if (result.status && result.token && result.data) {
  //           onSuccessfulLogin(result.token, result.data, result.expired_at, result.data.username)
  //         } else {
  //           onFailedLogin()
  //         }
  //       })
  //       .catch(() => {
  //         onFailedLogin()
  //       })
  //       .finally(() => {
  //         isLoading.value = false
  //       })
  //   } else {
  //     isLoading.value = false
  //   }
  // }
  router.push('/formStep2')
}

const onSuccessfulLogin = (token: any, data: any, expired_at: number, username: any) => {
  // console.log('Token yang disimpan:', token) // Cek token sebelum disimpan
  // console.log('User Data:', data) // Cek token sebelum disimpan
  // account.setAuthenticated(true)
  // console.log('user_name', username)

  // writeData('token', token)
  // writeData('user_name', username)
  // writeDataJson('user_data', data)
  // writeData('expired_at', expired_at)

  // notificationData.value = {
  //   title: 'Login Berhasil',
  //   message: 'Selamat Datang di Smart Election',
  //   isSuccess: true
  // }

  // // Tampilkan dialog notifikasi
  // isNotificationVisible.value = true

  // // Navigasi ke halaman berikutnya setelah notifikasi tampil
  // setTimeout(() => {
  //   isNotificationVisible.value = false
  //   if (data.upload_photo) {
  //     router.push('/home') // Arahkan ke /home jika input_photo true
  //   } else {
  router.push('/formStep1') // Arahkan ke formStep1 jika input_photo false
  //   }
  // }, 2500) // Durasi tampilan notifikasi
}

const onFailedLogin = () => {
  notificationData.value = {
    title: 'Login Gagal',
    message: 'Username atau password Anda salah',
    isSuccess: false
  }

  // Tampilkan dialog notifikasi
  isNotificationVisible.value = true
  setTimeout(() => {
    isNotificationVisible.value = false
  }, 2000) // Durasi tampilan notifikasi
}

const onEmptyUsername = () => {
  dialog.open = true
  dialog.title = 'Username kosong'
  dialog.content = 'Silahkan masukan username Anda.'
  dialog.confirmText = 'Mengerti'
  dialog.type = 'error'
  dialog.showCancelButton = false
}

const onEmptyPassword = () => {
  dialog.open = true
  dialog.title = 'Password kosong'
  dialog.content = 'Silahkan masukan password Anda.'
  dialog.confirmText = 'Mengerti'
  dialog.type = 'error'
  dialog.showCancelButton = false
}

onMounted(() => {
  document.title = 'Login - Smart Election'
})
</script>
