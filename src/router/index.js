import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/loginCheck.vue'
import Home from '../components/home.vue'
import User from '../components/user.vue'
import car from '../components/car.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/user',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/user',
        name: "用户界面",
        component: User
      },
      {
        path: '/car',
        name: '车辆界面',
        component: car
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
