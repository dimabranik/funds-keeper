import Vue from 'vue';
import Router from 'vue-router';
import StartComponent from '@/components/StartComponent';
import HomeComponent from '@/components/HomeComponent';
import StatisticComponent from '@/components/StatisticComponent';
import AccountComponent from '@/components/AccountComponent';
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
      path: '/statistic',
      name: 'StatisticComponent',
      beforeEnter: requireAuth,
      component: StatisticComponent,
    },
    {
      path: '/account',
      name: 'AccountComponent',
      beforeEnter: requireAuth,
      component: AccountComponent,
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
