import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const onConfirm = ref<Function>()
  const onCancel = ref<Function>()

  const confirmText = ref('')
  const cancelText = ref('')
  const open = ref(false)
  const title = ref('')
  const content = ref('')
  const type = ref('normal')
  const showCancelButton = ref(true)
  const dismissOnAction = ref(true)

  const timer = ref<any>()
  watch(open, (value) => {
    if (!value) {
      // check if timer is set
      if (timer.value) {
        clearTimeout(timer.value)
      }

      timer.value = setTimeout(() => {
        onConfirm.value = () => {}
        onCancel.value = () => {}
        dismissOnAction.value = true
        showCancelButton.value = true
      }, 2000)
    } else {
      if (timer.value) {
        clearTimeout(timer.value)
      }
    }
  })

  return {
    showCancelButton,
    dismissOnAction,
    onConfirm,
    onCancel,
    title,
    content,
    type,
    open,
    confirmText,
    cancelText
  }
})
