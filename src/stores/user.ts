import { computed } from 'vue'
import { defineStore } from 'pinia'
import { readData, readDataJson } from '@/utils/storage'

import type { ComputedRef } from 'vue'
import type { UserdataModel } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const userdata: ComputedRef<UserdataModel | null> = computed(
    () => readDataJson('user_data') || null
  )

  const NAME = computed(() => readData('user_name') || 'Demo User')

  const ID = computed(() => {
    if (NAME.value === 'Demo User') return '27'

    return userdata.value?.id
  })

  const NAMA = computed(() => {
    if (NAME.value === 'Demo User') return 'Allisa Putri'

    return userdata.value?.nama
  })

  const USERNAME = computed(() => {
    if (NAME.value === 'Demo User') return '00002'

    return userdata.value?.username
  })

  const NO_HP = computed(() => {
    if (NAME.value === 'Demo User') return '085321'

    return userdata.value?.no_hp
  })

  const LEVEL_ID = computed(() => {
    if (NAME.value === 'Demo User') return '6'

    return userdata.value?.level_id
  })

  const ACTIVE = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.active
  })

  const DAPIL_ID = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.dapil_id
  })

  const KECAMATAN_ID = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.kecamatan_id
  })

  const KELURAHAN_ID = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.kelurahan_id
  })

  const TPS_ID = computed(() => {
    if (NAME.value === 'Demo User') return '4'

    return userdata.value?.tps_id
  })

  const CREATED_AT = computed(() => {
    if (NAME.value === 'Demo User') return '2024-10-19 07:47:50'

    return userdata.value?.created_at
  })

  const CREATOR_ID = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.creator_id
  })

  const UPDATE_AT = computed(() => {
    if (NAME.value === 'Demo User') return '2024-10-19 07:48:25'

    return userdata.value?.update_at
  })

  const UPDATED_ID = computed(() => {
    if (NAME.value === 'Demo User') return '1'

    return userdata.value?.updated_id
  })

  const DAPIL = computed(() => {
    if (NAME.value === 'Demo User') return 'DAPIL 1'

    return userdata.value?.dapil
  })

  const KECAMATAN = computed(() => {
    if (NAME.value === 'Demo User') return 'Kecamatan Majalengka'

    return userdata.value?.kecamatan
  })

  const KELURAHAN = computed(() => {
    if (NAME.value === 'Demo User') return 'Munjul'

    return userdata.value?.kelurahan
  })

  const TPS = computed(() => {
    if (NAME.value === 'Demo User') return 'TPS 004'

    return userdata.value?.tps
  })

  const KABUPATEN = computed(() => {
    if (NAME.value === 'Demo User') return 'Majalengka'

    return userdata.value?.kabupaten
  })

  return {
    NAME,
    ID,
    NAMA,
    USERNAME,
    NO_HP,
    LEVEL_ID,
    ACTIVE,
    DAPIL_ID,
    KECAMATAN_ID,
    KELURAHAN_ID,
    TPS_ID,
    CREATED_AT,
    CREATOR_ID,
    UPDATE_AT,
    UPDATED_ID,
    DAPIL,
    KECAMATAN,
    KELURAHAN,
    TPS,
    KABUPATEN
  }
})
