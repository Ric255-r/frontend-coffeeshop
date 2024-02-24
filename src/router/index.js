import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import store from './store'
import Pesanan from '@/components/Pages/Pesanan.vue'
import BarangDetail from '@/components/Pages/BarangDetail.vue'
import Checkout from '@/components/Pages/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: AuthView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pesanan',
    name: 'PesananView',
    component: Pesanan,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/detailCoffee/:id',
    name: 'BarangDetail',
    component: BarangDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Ini Buat Looping router
router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token');
  // console.log("tokennya aldh" + store.state.token);
  // console.log(token);
  // cek apa routerny butuh authentikasi
  if(to.meta.requiresAuth) {
    // cek kalo user dah login atau blm di router/store.js
    if(store.state.token){
      // Kalo user dh login, lanjut ke router selanjutny
      next();
    }else{
      // klo nd, redirect dia.
      alert('Anda Belum Login');
      next({ name: 'login' });
    }
  }else{
    // else ini ngecek kalo routerny g butuh otentikasi ya tinggal lanjut saja
    next();
  }
});

export default router
