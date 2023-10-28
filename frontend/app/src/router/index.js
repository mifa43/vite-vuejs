import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import RootView from "../views/RootView.vue"
import RegistrationAndSigninView from "../views/RegistrationAndSigninView.vue"
import ProfileView from "../views/ProfileView.vue"
import FirstSteps from "../views/FirstStepView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'root',
      component: RootView
    },
    {
      path: '/registration-and-signin',
      name: 'registration-and-signin',
      component: RegistrationAndSigninView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/first-steps',
      name: 'first-steps',
      component: FirstSteps
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },

  ]
})

export default router
