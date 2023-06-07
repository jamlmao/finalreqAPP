import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import login from '../views/LoginPage.vue'
import register from '../views/register.vue'
import MainPage from '../views/Mainpage.vue'
import ViewPage from '../views/Viewpage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/reg',
    name: 'register',
    component: register
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/view/:id',
    name: 'View',
    component: ViewPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
