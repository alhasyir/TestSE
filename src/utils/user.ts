import { readDataJson, readData } from '@/utils/storage'
import type { UserdataModel } from '@/types/user'

const getUserdata = () => {
  const username: string | null = readData('user_name') || null
  const userdata: UserdataModel = readDataJson('user_data')

  if (username === null) {
    return {
      USER_ID: '27',
      USER_NAMA: 'Allisa Putri',
      USER_USERNAME: '00002',
      USER_NO_HP: '085321',
      USER_LEVEL_ID: '6',
      USER_ACTIVE: '1',
      USER_DAPIL_ID: '1',
      USER_KECAMATAN_ID: '1',
      USER_KELURAHAN_ID: '1',
      USER_TPS_ID: '4',
      USER_CREATED_AT: '2024-10-19 07:47:50',
      USER_CREATOR_ID: '1',
      USER_UPDATE_AT: '2024-10-19 07:48:25',
      USER_UPDATED_ID: '1',
      USER_DAPIL: 'DAPIL 1',
      USER_KECAMATAN: 'Kecamatan Majalengka',
      USER_KELURAHAN: 'Munjul',
      USER_TPS: 'TPS 004',
      USER_KABUPATEN: 'Majalengka',
      UPLOAD_PHOTO: false
    }
  } else {
    return {
      USER_ID: userdata.id,
      USER_NAMA: userdata.nama || null,
      USER_USERNAME: userdata.username || null,
      USER_NO_HP: userdata.no_hp || null,
      USER_LEVEL_ID: userdata.level_id || null,
      USER_ACTIVE: userdata.active || null,
      USER_DAPIL_ID: userdata.dapil_id || null,
      USER_KECAMATAN_ID: userdata.kecamatan_id || null,
      USER_KELURAHAN_ID: userdata.kelurahan_id || null,
      USER_TPS_ID: userdata.tps_id || null,
      USER_CREATED_AT: userdata.created_at || null,
      USER_CREATOR_ID: userdata.creator_id || null,
      USER_UPDATE_AT: userdata.update_at || null,
      USER_UPDATED_ID: userdata.updated_id || null,
      USER_DAPIL: userdata.dapil || null,
      USER_KECAMATAN: userdata.kecamatan || null,
      USER_KELURAHAN: userdata.kelurahan || null,
      USER_TPS: userdata.tps || null,
      USER_KABUPATEN: userdata.kabupaten || null,
      UPLOAD_PHOTO: userdata.upload_photo || null
    }
  }
}

export { getUserdata }
