import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/components/HomeComponent';
import PrivateComponent from '@/components/PrivateComponent';
import Callback from '@/components/callback';
import { requireAuth, requireNotAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeComponent',
      beforeEnter: requireNotAuth,
      component: HomeComponent,
    },
    {
      path: '/private',
      name: 'PrivateComponent',
      beforeEnter: requireAuth,
      component: PrivateComponent,
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
