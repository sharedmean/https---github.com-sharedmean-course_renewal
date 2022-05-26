import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "../components/MainPage";
import ProfilePage from "../components/ProfilePage";
import UsersPage from "../components/UsersPage";
import TutorPage from "../components/TutorPage";
import OrganizationsPage from "../components/OrganizationsPage";
import CoursesPage from "../components/CoursesPage"; 
import LoginPage from '../components/LoginPage.vue';
import CalendarPage from '../components/CalendarPage.vue';

import store from '/src/store/index'

Vue.use(VueRouter)


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const ifAdmin = (to, from, next) => {
  if (store.getters.getProfile.role_id == 1) {
    next()
    return
  }
  next('/main')
}

const ifTutor = (to, from, next) => {
  if (store.getters.getProfile.role_id == 2) {
    next()
    return
  }
  next('/main')
}

const routes = [
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      beforeEnter: ifAuthenticated
  },
  {
      path: '/users',
      name: 'users',
      component: UsersPage,
      beforeEnter: ifAdmin
  },
  {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage,
  },
  {
    path: '/tutor',
    name: 'tutor',
    component: TutorPage,
    beforeEnter: ifTutor
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: OrganizationsPage,
    beforeEnter: ifAdmin
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesPage,
    beforeEnter: ifAdmin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
