<template>
  <LayoutProvider>
    <template #content>
      <div class="inline-flex pt-4 flex-col justify-between items-center min-h-screen w-full gap-6">
        <!-- Header Section -->
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
              class="flex w-8 h-8 justify-center items-center flex-shrink-0 bg-white rounded-full"
            >
              <LogOut />
            </button>
          </div>
        </div>

        <!-- Content and Footer within the same flexbox container -->
        <div
          class="flex flex-col flex-grow w-full px-4 py-6 gap-[18px] items-start justify-between bg-gray-50 rounded-t-3xl"
        >
          <!-- Main content -->
          <div class="flex flex-col items-center w-full">
            <div class="flex flex-col items-start gap-[18px] w-full">
              <div class="flex flex-col items-start gap-1">
                <p class="font-semibold text-2xl">Form Perolehan Suara</p>
                <p class="font-normal text-sm">Silahkan masukan foto C1 Plano</p>
              </div>
              <form
                ref="fileUploadForm"
                class="flex flex-col justify-center items-start gap-4 w-full"
              >
                <div class="flex flex-col items-start gap-3 w-full" id="file-drag">
                  <p class="text-lg font-semibold">Upload Foto C1</p>
                  <button
                    class="flex flex-col w-full items-center gap-1 p-6 bg-white rounded-md border-[1px] border-dashed border-gray-400"
                    @click.prevent="triggerFileInput"
                  >
                    <AddImage class="size-12" />
                    <p class="text-sm font-medium text-red-500">Upload a file</p>
                    <p class="text-xs font-normal text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </button>
                  <div v-if="imageUrl" class="w-full flex relative items-start">
                    <div class="relative inline-block">
                      <img :src="imageUrl" alt="Preview" class="object-contain h-40" />
                      <button
                        @click.stop="removeImage"
                        class="absolute top-0 right-0 rounded-full p-1"
                      >
                        <RemoveImage class="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <input
                    ref="fileInput"
                    type="file"
                    class="hidden"
                    @change="handleFileChange"
                    accept="image/*"
                  />
                  <p class="text-sm font-medium">
                    *Pastikan foto terlihat jelas sebelum menekan tombol upload!
                  </p>
                </div>
                <button
                  class="flex px-4 py-2 justify-center items-center gap-1 rounded-lg bg-red-500 w-full text-base font-semibold text-white"
                  @click.prevent="showDialog"
                >
                  Upload Foto C1
                </button>
              </form>
            </div>
          </div>

          <!-- Footer at the bottom of the same container -->
          <footer class="w-full flex justify-center items-center mt-5">
            <p class="font-normal text-xs">SmartElection by Sadigit</p>
          </footer>
        </div>
      </div>
    </template>
  </LayoutProvider>
  <LoadingDialog v-if="isLoading" />

  <ConfirmationDialog
    v-if="isDialogVisible"
    title="Konfirmasi"
    message="Apakah Anda yakin bahwa foto sudah terlihat dengan jelas?"
    confirmText="Ya, Foto Jelas"
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
import { ref, onMounted } from 'vue'
import LayoutProvider from '@/components/LayoutProvider.vue'
import { ElectionBox, LogOut, AddImage, RemoveImage } from '@/components/icons'
import { NotificationDialog, ConfirmationDialog } from '@/components'
import router from '@/router'
import { fetchUploadPhoto } from '@/api'
import LoadingDialog from '@/components/LoadingDialog.vue'
import { useDialogStore } from '@/stores/dialog'
import { useAccountStore } from '@/stores/account'
import { getUserdata } from '@/utils/user'

const fileInput = ref<HTMLInputElement | null>(null)
const imageUrl = ref<string | null>(null)
const selectedFile = ref<File | null>(null) // Untuk menyimpan file gambar
const isDialogVisible = ref(false)
const isNotificationVisible = ref(false)
const notificationData = ref({ title: '', message: '', isSuccess: true })
const isLoading = ref(false)
const { USER_ID, USER_KELURAHAN, USER_TPS } = getUserdata()

// This part handles file change and assigns the raw file to selectedFile.
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file.type.startsWith('image/')) {
      previewImage(file) // Just for preview
      selectedFile.value = file // Assign raw file object here
      console.log(selectedFile.value)
    } else {
      alert('Silakan unggah file gambar (PNG, JPG, JPEG).')
      target.value = '' // Reset input file
    }
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const previewImage = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  imageUrl.value = null
  selectedFile.value = null // Reset file yang dipilih
}

const showDialog = () => {
  isDialogVisible.value = true
}

const handleConfirm = () => {
  if (!selectedFile.value) {
    notificationData.value = {
      title: 'Upload Gagal',
      message: 'Harap unggah foto terlebih dahulu sebelum melanjutkan.',
      isSuccess: false
    }
    isNotificationVisible.value = true
    setTimeout(() => {
      isNotificationVisible.value = false
    }, 2000)
    return
  }

  if (!USER_ID) {
    notificationData.value = {
      title: 'Upload Gagal',
      message: 'USER ID tidak valid. Pastikan Anda telah login dengan benar.',
      isSuccess: false
    }
    isNotificationVisible.value = true
    setTimeout(() => {
      isNotificationVisible.value = false
    }, 2000)
    return
  }

  isLoading.value = true

  const formData = new FormData()
  formData.append('photo', selectedFile.value)
  formData.append('user_id', USER_ID)

  fetchUploadPhoto(formData)
    .then(() => {
      notificationData.value = {
        title: 'Upload Berhasil',
        message: 'Form perolehan suara berhasil terupload',
        isSuccess: true
      }

      isNotificationVisible.value = true

      setTimeout(() => {
        isNotificationVisible.value = false
        router.push('/home')
      }, 2500)
    })
    .catch((error) => {
      console.error('Error submitting data:', error)

      notificationData.value = {
        title: 'Upload Gagal',
        message: 'Form perolehan suara gagal terupload',
        isSuccess: false
      }

      isNotificationVisible.value = true
      setTimeout(() => {
        isNotificationVisible.value = false
      }, 2000)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const handleCancel = () => {
  isDialogVisible.value = false
}

// const testLogout = () => {
//   router.push('/')
// }

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

// Initialize the file upload drag-and-drop feature on mount
onMounted(() => {
  const fileDrag = document.getElementById('file-drag')

  fileDrag?.addEventListener('dragover', (e) => {
    e.preventDefault()
    fileDrag.classList.add('hover')
  })

  fileDrag?.addEventListener('dragleave', () => {
    fileDrag.classList.remove('hover')
  })

  fileDrag?.addEventListener('drop', (e) => {
    e.preventDefault()
    fileDrag.classList.remove('hover')
    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      const file = files[0]
      // Pastikan file yang diunggah adalah gambar
      if (file.type.startsWith('image/')) {
        previewImage(file)
        selectedFile.value = file // Simpan file yang dijatuhkan
      } else {
        alert('Silakan unggah file gambar (PNG, JPG, JPEG).')
      }
    }
  })
})
</script>
