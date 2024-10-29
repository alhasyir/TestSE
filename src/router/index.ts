import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import FormStep1 from '@/views/FormStep1.vue'
import FormStep2 from '@/views/FormStep2.vue'
import { useAccountStore } from '@/stores/account'
import NotFound from '@/views/NotFound.vue'
import { getUserdata } from '@/utils/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      alias: '/',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/formStep1',
      name: 'formstep1',
      component: FormStep1
    },
    {
      path: '/formStep2',
      name: 'formstep2',
      component: FormStep2
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const account = useAccountStore()
//   const { UPLOAD_PHOTO } = getUserdata()

//   // Jika rute tidak ditemukan, arahkan ke /404
//   if (to.matched.length === 0) {
//     next('/404')
//   } else if (account.isAuthenticated) {
//     // Jika pengguna sudah login
//     if (to.path === '/login' || to.path === '/') {
//       // Jika ke /login atau / diarahkan ke /formStep1
//       next('/formStep1')
//     } else if (
//       UPLOAD_PHOTO &&
//       (to.path === '/formStep1' || to.path === '/formStep2' || to.path === '/')
//     ) {
//       // Jika UPLOAD_PHOTO aktif, arahkan /, /formStep1, atau /formStep2 ke /home
//       next('/home')
//     } else {
//       // Izinkan akses ke halaman lainnya
//       next()
//     }
//   } else {
//     // Jika pengguna belum login
//     if (to.path !== '/login') {
//       // Arahkan ke /login jika mencoba akses halaman lain
//       next('/login')
//     } else {
//       // Izinkan akses ke /login
//       next()
//     }
//   }
// })

export default router
