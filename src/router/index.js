import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserPage from '@/pages/UserPage.vue'

const routes = [
  { path: '/admin', component: AdminPage },
  { path: '/login', component: LoginPage },
  { path: '/', component: UserPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
