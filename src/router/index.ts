import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import login from '../views/LoginPage.vue'
import register from '../views/register.vue'
import MainPage from '../views/Mainpage.vue'
import AvailableCars from '../views/AvailableCars.vue'
import RentPage from '../views/RentPage.vue'
import RequestPage from '../views/RequestPage.vue'
import Profile from '../views/Profile.vue'
import rentpaged from '../views/rentpaged.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/reg',
    name: 'Register',
    component: register
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/rent/:id',
    name: 'RentPage',
    component: RentPage
  },
  {
    path: '/rent',
    name: 'AvailableCars',
    component: AvailableCars
  },
   {
    path: '/:catchAll(.*)',
    redirect: '/main'
  }, 
  {
    path: '/request',
    name: 'RequestPage',
    component: RequestPage
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  
  if (to.name !== 'Register' && to.name !== 'Login' && token == null) {
    next({ name: 'Login' });
  } else if (to.name == 'Login' && token !== null) {
    next({ name: 'Main' });
  } else {
    next();
  }
}) 



export default router
