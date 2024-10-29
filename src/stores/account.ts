import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { readData, readDataJson, removeData, writeData, writeDataJson } from '@/utils/storage'

interface AccountModel {
  name: string
  username: string
}

export const useAccountStore = defineStore('account', () => {
  const username = ref('')
  const password = ref('')

  const saveUsername = (username: string) => {
    writeData('username', username)
  }

  const getUsername = (): string | null => {
    return readData('username')
  }

  const getAccountData = (): AccountModel | null => {
    const accountString = readDataJson('account')
    let account: AccountModel | null = null

    if (accountString) {
      try {
        account = JSON.parse(accountString) as AccountModel
      } catch (error) {
        account = accountString as AccountModel
      }
    }
    return account
  }

  const account = ref<AccountModel | null>(getAccountData())

  const isAuthenticated = computed(() =>
    readData('isAuthenticated') == undefined ? false : readData('isAuthenticated') == true
  )

  const logout = () => {
    removeData('isAuthenticated')
    removeData('account')
    removeData('token')
    removeData('expired_at')
    removeData('user_data')
    removeData('user_name')

    const url = window.location.origin
    window.location.href = url + '/login'
  }

  // Automatic logout when token expires

  const saveAccount = (accountData: AccountModel, expired_at: number) => {
    writeData('isAuthenticated', true)
    writeDataJson('account', accountData)
    writeData('expired_at', expired_at)
  }

  const setAuthenticated = (value: boolean) => {
    writeData('isAuthenticated', value)
  }

  computed(() => {
    account.value = getAccountData()

    return account.value
  })

  onMounted(() => {
    if (getAccountData() == null) {
      const isAuthenticated = readData('isAuthenticated')
      if (isAuthenticated == true) {
        logout()
      }
    }
  })
  return {
    isAuthenticated,
    setAuthenticated,
    logout,
    account,
    saveAccount,
    saveUsername,
    getUsername,
    username,
    password
  }
})
