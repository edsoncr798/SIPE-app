import { createRouter, createWebHistory } from 'vue-router'
import type  { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
      noAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      noAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/SignInPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('../views/JobPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory( ),
  routes
});

// router.beforeEach((to, from, next) => {
//   const noAuth = to.matched.some(record => record.meta.noAuth);
//   const user = localStorage.getItem('user');
//   if (!user && !noAuth) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// });

export default router
