import Vue from 'vue';
import Router from 'vue-router';
import StartComponent from '@/components/StartComponent';
import HomeComponent from '@/components/HomeComponent';
import AccountsHistoryComponent from '@/components/AccountsHistoryComponent';
import RecordAddIncomeComponent from '@/components/RecordAddIncomeComponent';
import RecordAddExpenseComponent from '@/components/RecordAddExpenseComponent';
import AccountAddKeepComponent from '@/components/AccountAddKeepComponent';
import AccountAddExpenseComponent from '@/components/AccountAddExpenseComponent';
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
      path: '/history',
      name: 'AccountsHistoryComponent',
      beforeEnter: requireAuth,
      component: AccountsHistoryComponent,
    },
    {
      path: '/income',
      name: 'Income',
      beforeEnter: requireAuth,
      component: RecordAddIncomeComponent,
    },
    {
      path: '/expense',
      name: 'Expense',
      beforeEnter: requireAuth,
      component: RecordAddExpenseComponent,
    },
    {
      path: '/callback',
      component: Callback,
    },
    {
      path: '/add_keep_account',
      beforeEnter: requireAuth,
      component: AccountAddKeepComponent,
    },
    {
      path: '/add_expense_account',
      beforeEnter: requireAuth,
      component: AccountAddExpenseComponent,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});
