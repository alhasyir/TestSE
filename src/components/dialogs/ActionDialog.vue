<script setup lang="ts">
import { ErrorIcon, SuccessIcon, WarningIcon } from '@/components'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed, ref } from 'vue'

const props = defineProps({
  open: Boolean,
  title: String,
  message: String,
  cancelText: {
    type: String,
    default: 'Batal'
  },
  confirmText: {
    type: String,
    default: 'Oke'
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'normal'
  },
  dismissOnAction: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['onClose', 'onCancel', 'onConfirm'])

const open = ref(computed(() => props.open))
const title = ref(computed(() => props.title))
const message = ref(computed(() => props.message))
const cancelText = ref(computed(() => props.cancelText))
const confirmText = ref(computed(() => props.confirmText))
const type = ref(computed(() => props.type))

const close = () => {
  emits('onClose', false)
}

const handleOnCancel = () => {
  emits('onCancel')
  if (props.dismissOnAction) {
    close()
  }
}

const handleOnConfirm = () => {
  emits('onConfirm')
  if (props.dismissOnAction) {
    close()
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40 flex items-center justify-center">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              v-if="type !== 'progress'"
              class="flex flex-col w-[300px] p-4 gap-3 items-center bg-white rounded-3xl shadow-lg"
            >
              <!-- Body Section -->
              <div>
                <div class="flex items-center justify-center mx-auto rounded-full w-14 h-14">
                  <ErrorIcon v-if="type === 'error'" class="w-full h-full text-red-500" />
                  <WarningIcon v-else-if="type === 'warning'" class="w-full h-full" />
                  <SuccessIcon v-else class="w-full h-full" />
                </div>
                <div class="mt-3 text-center">
                  <DialogTitle as="h1" class="text-xl font-bold text-center text-dark">
                    {{ title }}
                  </DialogTitle>
                  <div class="mt-1">
                    <p class="text-base text-center text-dark">
                      {{ message }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- Footer Section -->
              <div
                v-if="type === 'error' || type === 'warning'"
                class="w-full flex flex-col justify-between pt-4 space-y-4"
              >
                <button
                  v-if="type == 'error'"
                  type="button"
                  class="inline-flex justify-center flex-1 w-full px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg"
                  @click="handleOnConfirm()"
                >
                  {{ confirmText }}
                </button>
                <button
                  v-if="showCancelButton"
                  type="button"
                  class="inline-flex justify-center flex-1 w-full px-4 py-2 text-sm font-bold text-gray-800 rounded-lg bg-gray-200"
                  @click="handleOnCancel()"
                  ref="cancelButtonRef"
                >
                  {{ cancelText }}
                </button>
                <button
                  v-else-if="type == 'warning'"
                  type="button"
                  class="inline-flex justify-center flex-1 w-full px-4 py-2 text-sm font-bold text-white rounded-lg bg-red-500"
                  @click="handleOnConfirm()"
                >
                  {{ confirmText }}
                </button>
              </div>
              <div v-else class="flex pt-4">
                <button
                  type="button"
                  :class="[
                    'bg-red-500',
                    'inline-flex flex-1 justify-center w-full px-4 py-2 text-sm font-bold text-white rounded-lg'
                  ]"
                  @click="handleOnConfirm()"
                >
                  {{ confirmText }}
                </button>
              </div>
            </DialogPanel>
            <DialogPanel
              v-else
              class="relative transition-all transform bg-transparent rounded-full"
            >
              <svg class="w-14 h-14 text-primary-900 animate-spin" fill="none" viewBox="0 0 24 24">
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
