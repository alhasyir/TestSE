<template>
  <LayoutProvider>
    <template #content>
      <div class="flex flex-col min-h-screen">
        <!-- Header Section -->
        <div class="flex gap-3 justify-start items-center p-4 bg-red-500">
          <ElectionBox />
          <h1 class="font-sans text-white text-lg">SmartElection</h1>
        </div>

        <!-- Location and Logout Button -->
        <div class="px-4 flex justify-between">
          <div class="flex flex-col">
            <h1 class="font-sans text-2xl font-semibold text-white">
              {{ USER_KELURAHAN }}
            </h1>
            <h2 class="font-sans font-bold text-white">{{ USER_TPS }}</h2>
          </div>
          <button
            @click="confirmLogout"
            class="flex w-8 h-8 p-[3.5px_4px_4.5px_4px] justify-center items-center flex-shrink-0 bg-white rounded-full"
          >
            <LogOut />
          </button>
        </div>

        <!-- Input Success Section -->
        <div class="bg-gray-50 rounded-t-3xl pt-6 px-4 mt-4 flex-grow">
          <h1 class="font-sans font-semibold text-2xl">
            Terimakasih, Data Sudah Berhasil Di Input
          </h1>
          <p class="mt-1 font-sans text-sm text-gray-600">
            Apabila ada perubahan data silahkan untuk menghubungi koordinator desa!
          </p>

          <!-- Vote Count Section -->
          <div class="mb-4 mt-6 bg-white border-2 rounded-xl p-4">
            <!-- Paslon 1 -->
            <div class="flex justify-between">
              <div>
                <h1 class="text-sm text-gray-500 font-medium mb-1">Paslon 1</h1>
                <div class="flex gap-1">
                  <img src="/assets/images/paslon1.png" alt="paslon1" class="w-9 h-9" />
                  <div class="flex flex-col justify-center">
                    <h1 class="text-xs font-semibold">H. Eman Suherman</h1>
                    <h2 class="text-xs font-semibold">Dena Muhamad Ramdhan</h2>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-gray-100 rounded">
                <h1 class="text-xs font-semibold text-center">Total Suara</h1>
                <h1 class="text-xs font-semibold text-center">{{ paslon1Votes }}</h1>
              </div>
            </div>

            <!-- Paslon 2 -->
            <div class="flex justify-between mt-4">
              <div>
                <h1 class="text-sm text-gray-500 font-medium mb-1">Paslon 2</h1>
                <div class="flex gap-1">
                  <img src="/assets/images/paslon2.png" alt="paslon2" class="w-9 h-9" />
                  <div class="flex flex-col justify-center">
                    <h1 class="text-xs font-semibold">Dr. H. Karna Sobahi, M.M.Pd.</h1>
                    <h2 class="text-xs font-semibold">Koko Suyoko</h2>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-gray-100 rounded">
                <h1 class="text-xs font-semibold text-center">Total Suara</h1>
                <h1 class="text-xs font-semibold text-center">{{ paslon2Votes }}</h1>
              </div>
            </div>

            <!-- Total Votes Summary -->
            <div class="flex justify-around gap-2 my-4">
              <div class="w-[180px] py-4 px-3 bg-white border border-gray-400 rounded text-center">
                <h1 class="text-xs font-semibold">Suara Sah</h1>
                <h1 class="font-semibold">{{ validVotes }}</h1>
              </div>
              <div class="w-[180px] py-4 px-3 bg-white border border-gray-400 rounded text-center">
                <h1 class="text-xs font-semibold">Suara Tidak Sah</h1>
                <h1 class="font-semibold">{{ invalidVotes }}</h1>
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div
                class="w-[310px] sm:w-[350px] md:w-[390px] py-4 px-3 flex flex-col items-center bg-gray-50 border border-gray-400 rounded text-center"
              >
                <h1 class="text-xs font-semibold">Total Suara Keseluruhan</h1>
                <h1 class="font-semibold">{{ totalVotes }}</h1>
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-gray-50 py-4">
          <h1 class="text-center">Smartelection by Sadigit</h1>
        </footer>
      </div>
    </template>
  </LayoutProvider>
  <LoadingDialog v-if="isLoading" />
</template>

<script setup lang="ts">
import { LogOut } from '@/components/icons'
import ElectionBox from '@/components/icons/electionBox.vue'
import { LayoutProvider, LoadingDialog } from '@/components'
import { onMounted, ref } from 'vue'
import { fetchGetDataSuara } from '@/api'
import { getUserdata } from '@/utils/user'
import { useDialogStore } from '@/stores/dialog'
import { useAccountStore } from '@/stores/account'

const dialog = useDialogStore()
const { logout } = useAccountStore()
const isLoading = ref(false)
const paslon1Votes = ref(0)
const paslon2Votes = ref(0)
const validVotes = ref(0)
const invalidVotes = ref(0)
const totalVotes = ref(0)
const { USER_KELURAHAN, USER_TPS, USER_ID, USER_USERNAME } = getUserdata()

const confirmLogout = () => {
  dialog.title = 'Keluar'
  dialog.content = 'Apakah anda yakin ingin keluar?'
  dialog.type = 'error'
  dialog.showCancelButton = true
  dialog.dismissOnAction = true
  dialog.confirmText = 'Ya'
  dialog.cancelText = 'Tidak'
  dialog.open = true

  dialog.onConfirm = onSuccessfulLogout
}

const onSuccessfulLogout = () => {
  logout()
}

const getData = () => {
  isLoading.value = true

  const payLoad = {
    user_id: USER_ID
  }

  fetchGetDataSuara(payLoad)
    .then((response) => {
      paslon1Votes.value = response.data.data.suara_paslon_no1
      paslon2Votes.value = response.data.data.suara_paslon_no2
      validVotes.value = response.data.data.suara_sah
      invalidVotes.value = response.data.data.suara_tidak_sah
      totalVotes.value = response.data.data.total_suara
    })
    .catch((error) => {
      console.error('Error fetching vote data:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  getData()
  console.log(USER_ID, USER_USERNAME)
})
</script>
