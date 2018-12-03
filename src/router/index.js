import Vue from 'vue';
import Router from 'vue-router';
import StartComponent from '@/components/StartComponent';
import HomeComponent from '@/components/HomeComponent';
import StatisticComponent from '@/components/StatisticComponent';
import AccountComponent from '@/components/AccountComponent';
import IncomeAddRecordComponent from '@/components/IncomeAddRecordComponent';
import ExpenseAddRecordComponent from '@/components/ExpenseAddRecordComponent';
import Callback from '@/components/callback';
import { requireAuth, requireNotAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      beforeEnter: requireNotAuth,
      component: StartComponent,
    },
    {
      path: '/home',
      name: 'Home',
      beforeEnter: requireAuth,
      component: HomeComponent,
    },
    {
      path: '/statistic',
      name: 'Statistic',
      beforeEnter: requireAuth,
      component: StatisticComponent,
    },
    {
      path: '/income',
      name: 'Income',
      beforeEnter: requireAuth,
      component: IncomeAddRecordComponent,
    },
    {
      path: '/expense',
      name: 'Expense',
      beforeEnter: requireAuth,
      component: ExpenseAddRecordComponent,
    },
    {
      path: '/account',
      name: 'Account',
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
