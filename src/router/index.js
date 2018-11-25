import Vue from 'vue';
import Router from 'vue-router';
import StartComponent from '@/components/StartComponent';
import HomeComponent from '@/components/HomeComponent';
import Callback from '@/components/callback';
import { requireAuth, requireNotAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StartComponent',
      beforeEnter: requireNotAuth,
      component: StartComponent,
    },
    {
      path: '/home',
      name: 'HomeComponent',
      beforeEnter: requireAuth,
      component: HomeComponent,
    },
    {
      path: '/callback',
      component: Callback,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});
