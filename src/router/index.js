import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      drawer:true,
      auth: false
    }
  },
  {
    path: '/DaftarUMKM',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      drawer:true,
      auth: false
    }
  },
  {
    path: '/PendaftaranBerhasil',
    name: 'SuccessRegister',
    component: () => import('../views/SuccessRegister.vue'),
    meta: {
      drawer:true,
      auth: false
    }
  },
  {
    path: '/loginAdmin',
    name: 'LoginAdmin',
    component: () => import('../views/Login.vue'),
    meta: {
      drawer:false,
      auth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      drawer:false,
      auth: true
    }
  },
  {
    path: '/dashboardArticle',
    name: 'DashboardArticle',
    component: () => import('../views/AdminArticle.vue'),
    meta: {
      drawer:false,
      auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
