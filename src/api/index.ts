import { useAccountStore } from '@/stores/account'
import { readData } from '@/utils/storage'
import axios from 'axios'

const instance = axios.create({
  // baseURL: `http://192.168.18.13/api-quick-count`,
  baseURL: `http://10.8.0.83/api-quick-count`,

  headers: {
    Authorization: `Bearer ${readData('token')}`
  }
})
// console.log('token:', readData('token'))
instance.interceptors.request.use(
  (config) => {
    const token = readData('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors and logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Call logout to clear all data before redirecting
      const accountStore = useAccountStore()
      accountStore.logout() // This will clear data and redirect to login
    }
    return Promise.reject(error)
  }
)

const createAuth = async (data: object) => {
  return instance.post('/login', data)
}

const fetchSubmit = async (data: object) => {
  return instance.post('/smartelection/submit', data)
}

const fetchGetDataSuara = async (data: object) => {
  return instance.post('/smartelection/get_by_id_user', data)
}

const fetchUploadPhoto = async (data: object) => {
  return instance.post('/smartelection/upload_photo', data)
}

export { createAuth, fetchSubmit, fetchGetDataSuara, fetchUploadPhoto }
