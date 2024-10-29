<template>
  <LayoutProvider>
    <template #content>
      <div class="inline-flex p-[16px_0px_0px_0px] flex-col justify-end items-center gap-8">
        <div class="flex flex-col items-start gap-3 w-11/12">
          <div class="flex items-center gap-2">
            <ElectionBox />
            <h2 class="font-medium text-base text-white">SmartElection</h2>
          </div>
          <div class="flex w-full justify-between items-center">
            <div class="flex flex-col items-start gap-1">
              <p class="font-semibold text-2xl text-white">{{ USER_KELURAHAN }}</p>
              <p class="font-bold text-base text-white">{{ USER_TPS }}</p>
            </div>
            <button
              @click="confirmLogout"
              class="flex w-8 h-8 p=[3.5px_4px_4.5px_4px] justify-center items-center flex-shrink-0 bg-white rounded-full"
            >
              <LogOut />
            </button>
          </div>
        </div>
        <div
          class="flex flex-col w-full items-start px-4 py-6 gap-[18px] rounded-t-3xl rounded-b-none bg-gray-50"
        >
          <div class="flex flex-col items-start gap-6 w-full">
            <div class="flex flex-col items-start gap-1">
              <p class="font-semibold text-2xl">Form Perolehan Suara</p>
              <p class="font-normal text-sm">Silahkan masukan hasil suara pasangan calon</p>
            </div>
            <form class="flex flex-col items-start justify-center gap-6 rounded-xl w-full">
              <div class="flex flex-col items-start gap-1 w-full">
                <div class="flex flex-col items-start gap-6 self-stretch w-full">
                  <div class="flex flex-col items-start gap-3 self-strech w-full">
                    <p class="text-lg font-semibold">Jumlah suara</p>
                    <div class="w-full">
                      <InputText
                        type="number"
                        name="suara1"
                        :use-label="true"
                        :disabled="isDataLoaded"
                        label="1. H. Eman Suherman & Dena Muhamad Ramdhan"
                        placeholder="Jumlah suara sah"
                        v-model="suara1"
                      />
                    </div>
                    <div class="w-full">
                      <InputText
                        type="number"
                        name="suara2"
                        :use-label="true"
                        :disabled="isDataLoaded"
                        label="2. Dr. H. Karna Sobahi, M.M.Pd. & Koko Suyoko"
                        placeholder="Jumlah suara sah"
                        v-model="suara2"
                      />
                    </div>
                    <div class="w-full">
                      <InputText
                        type="number"
                        name="suaraTidakSah"
                        :use-label="true"
                        :disabled="isDataLoaded"
                        label="Jumlah suara tidak sah"
                        placeholder="Jumlah suara tidak sah"
                        v-model="suaraTidakSah"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col items-start gap-3 self-strech w-full">
                    <p class="text-base font-semibold">Total suara</p>
                    <div
                      class="flex flex-col flex-1 flex-shrink-0 basis-0 px-3 py-4 justify-center items-center gap-1 shadow-sm border-gray-300 bg-white border-[1px] rounded-md w-full"
                    >
                      <p class="text-xs font-semibold">Suara Sah</p>
                      <p class="text-base font-semibold">{{ totalSuaraSah }}</p>
                    </div>
                    <div
                      class="flex flex-col flex-1 flex-shrink-0 basis-0 px-3 py-4 justify-center items-center gap-1 shadow-sm border-gray-300 bg-white border-[1px] rounded-md w-full"
                    >
                      <p class="text-sm font-medium">Total Suara Keseluruhan</p>
                      <p class="text-base font-semibold">{{ totalSuara }}</p>
                    </div>
                  </div>
                </div>
                <p class="text-sm font-medium">
                  *Sebelum melanjutkan upload form C1, pastikan bahwa data perolehan suaranya sudah
                  benar!
                </p>
              </div>
              <button
                v-if="!isDataLoaded"
                @click.prevent="submitForm"
                class="flex px-4 py-2 justify-center items-center gap-1 rounded-lg bg-red-500 w-full text-base font-semibold text-white"
              >
                Simpan Data
              </button>
              <button
                v-else
                @click.prevent="uploadFotoC1"
                class="flex px-4 py-2 justify-center items-center gap-1 rounded-lg bg-red-500 w-full text-base font-semibold text-white"
              >
                Upload Foto C1
              </button>
            </form>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="font-normal text-xs">SmartElection by Sadigit</p>
          </div>
        </div>
      </div>
    </template>
  </LayoutProvider>
  <LoadingDialog v-if="isLoading" />
  <ConfirmationDialog
    v-if="isDialogVisible"
    title="Konfirmasi"
    message="Apakah Anda yakin bahwa data perolehan suara sudah benar?"
    confirmText="Ya, Data Sudah Benar"
    cancelText="Batal"
    :onConfirm="handleConfirm"
    :onCancel="handleCancel"
  />
  <NotificationDialog
    v-if="isNotificationVisible"
    :title="notificationData.title"
    :message="notificationData.message"
    :isSuccess="notificationData.isSuccess"
  />
</template>

<script setup lang="ts">
import LayoutProvider from '@/components/LayoutProvider.vue'
import router from '@/router'
import { ElectionBox, LogOut } from '@/components/icons'
import { InputText, NotificationDialog, ConfirmationDialog, LoadingDialog } from '@/components'
import { ref, computed, onMounted } from 'vue'
import { fetchSubmit, fetchGetDataSuara } from '@/api' // Use fetchSubmit here
import { useAccountStore } from '@/stores/account'
import { useDialogStore } from '@/stores/dialog'
import { getUserdata } from '@/utils/user'

const suara1 = ref<number | string>('')
const suara2 = ref<number | string>('')
const suaraTidakSah = ref<number | string>('')
const isDataLoaded = ref(false)

const {
  USER_ID,
  USER_DAPIL_ID,
  USER_TPS_ID,
  USER_KECAMATAN_ID,
  USER_KELURAHAN_ID,
  USER_KELURAHAN,
  USER_TPS,
  USER_USERNAME
} = getUserdata()

const parseSuara = (value: string | number): number => {
  const parsed = parseInt(value as string, 10)
  return isNaN(parsed) ? 0 : parsed
}

const totalSuaraSah = computed(() => {
  const total = parseSuara(suara1.value) + parseSuara(suara2.value)
  return total > 0 ? total : '-'
})

const totalSuara = computed(() => {
  const total =
    parseSuara(suara1.value) + parseSuara(suara2.value) + parseSuara(suaraTidakSah.value)
  return total > 0 ? total : '-'
})

const isDialogVisible = ref(false)
const isNotificationVisible = ref(false)
const isLoading = ref(false)

const validateForm = (): boolean => {
  return suara1.value !== '' && suara2.value !== '' && suaraTidakSah.value !== ''
}

const submitForm = () => {
  if (!validateForm()) {
    // Show notification if form is incomplete
    notificationData.value = {
      title: 'Data Gagal Tersimpan',
      message: 'Silahkan isi semua data terlebih dahulu',
      isSuccess: false
    }

    isNotificationVisible.value = true
    setTimeout(() => {
      isNotificationVisible.value = false
    }, 2000) // Notification display duration
  } else {
    // Proceed to confirmation dialog if form is complete
    showDialog()
  }
}

const uploadFotoC1 = () => {
  router.push('/formStep2') // Pindah ke halaman formStep2
}

const showDialog = () => {
  isDialogVisible.value = true
}

const notificationData = ref({ title: '', message: '', isSuccess: true })

const handleConfirm = () => {
  isLoading.value = true // Tampilkan loading

  // Buat form data
  const formData = {
    suara_paslon_no1: parseSuara(suara1.value),
    suara_paslon_no2: parseSuara(suara2.value),
    suara_tidak_sah: parseSuara(suaraTidakSah.value),
    suara_sah: parseSuara(totalSuaraSah.value),
    total_suara: parseSuara(totalSuara.value),
    dapil_id: USER_DAPIL_ID,
    kecamatan_id: USER_KECAMATAN_ID,
    kelurahan_id: USER_KELURAHAN_ID,
    tps_id: USER_TPS_ID,
    created_by: USER_ID
  }

  // Panggil API menggunakan fetchSubmit
  fetchSubmit(formData)
    .then(() => {
      // Tentukan data notifikasi sukses
      notificationData.value = {
        title: 'Data Tersimpan',
        message: 'Form perolehan suara berhasil tersimpan',
        isSuccess: true
      }

      // Tampilkan dialog notifikasi
      isNotificationVisible.value = true

      // Navigasi ke halaman berikutnya setelah notifikasi tampil
      setTimeout(() => {
        isNotificationVisible.value = false
        window.location.reload()
      }, 2500) // Durasi tampilan notifikasi
    })
    .catch((error) => {
      console.error('Error submitting data:', error)

      // Tentukan data notifikasi gagal
      notificationData.value = {
        title: 'Data Gagal Tersimpan',
        message: 'Terjadi kesalahan saat menyimpan data',
        isSuccess: false
      }

      // Tampilkan dialog notifikasi
      isNotificationVisible.value = true
      setTimeout(() => {
        isNotificationVisible.value = false
      }, 2000) // Durasi tampilan notifikasi
    })
    .finally(() => {
      isLoading.value = false // Sembunyikan loading
    })
}

const handleCancel = () => {
  isDialogVisible.value = false
}

const dialog = useDialogStore()
const { logout } = useAccountStore()

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
  isLoading.value = true // Tampilkan loading

  // Membuat payload untuk API
  const payLoad = {
    user_id: USER_ID
  }

  // Panggil API menggunakan fetchGetDataSuara
  fetchGetDataSuara(payLoad)
    .then((response) => {
      isDataLoaded.value = true
      console.log(response.data.data.suara_paslon_no1)
      // Mengisi nilai dari respons ke variabel yang sudah ada
      suara1.value = response.data.data.suara_paslon_no1 || ''
      suara2.value = response.data.data.suara_paslon_no2 || ''
      suaraTidakSah.value = response.data.data.suara_tidak_sah || ''

      // Tampilkan notifikasi sukses jika data berhasil diambil
      notificationData.value = {
        title: 'Data Terambil',
        message: 'Form perolehan suara sudah terisi',
        isSuccess: true
      }

      isNotificationVisible.value = true

      setTimeout(() => {
        isNotificationVisible.value = false
      }, 2500)
    })
    .catch((error) => {
      console.error('Error mendapatkan data:', error)
      isDataLoaded.value = false
      //   // Tampilkan notifikasi error jika gagal mengambil data
      //   notificationData.value = {
      //     title: 'Belum ada data',
      //     message: 'Silahkan isi data',
      //     isSuccess: false
      //   }

      //   isNotificationVisible.value = true

      //   setTimeout(() => {
      //     isNotificationVisible.value = false
      //   }, 2000)
      // }
    })
    .finally(() => {
      isLoading.value = false // Sembunyikan loading setelah selesai
    })
}

// Memanggil getData pada saat komponen dimuat
onMounted(() => {
  getData()
  console.log(USER_ID)
})
</script>
