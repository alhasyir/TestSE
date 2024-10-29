<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => 'text' | 'password' | 'email' | 'phone' | 'number',
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  },
  useLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: 50
  },
  isFullWidth: {
    type: Boolean,
    default: false
  },
  uppercase: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value'])

const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:value', value)
}

const model = defineModel()
</script>

<template>
  <div
    class="flex flex-col items-start gap-2 self-stretch w-full"
    :class="[isFullWidth ? 'flex-1' : '']"
  >
    <label v-if="useLabel" class="text-sm font-medium ml-1">
      {{ label }}
    </label>
    <input
      v-model="model"
      autocomplete="off"
      :type="type"
      :placeholder="placeholder"
      @input="updateValue($event)"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="type === 'phone' ? 15 : maxlength"
      class="flex w-full items-center gap-1 px-3 py-2 text-base font-normal text-black bg-white border-[1px] border-gray-300 shadow-sm rounded-lg disabled:bg-gray-200 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-0"
      :class="[props.class, uppercase ? 'uppercase' : '']"
    />
  </div>
</template>
