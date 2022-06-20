import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/Login/Login.vue'
import Layout from '@/components/Layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    // redirect: 'login',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "patient" */ '@/views/Patient.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
