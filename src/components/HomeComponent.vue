<template>
  <div class="home">
    <app-nav location="home" />

    <keep-accounts-list-component :keep_accounts="keep_accounts" />

    <h2 class="text-center"> {{ nickname }} </h2>
    <br />

    <div class="monthbox text-center">
      Current month:
      <div class="roundData"> {{ curMonth }} </div>
    </div>

    <div class="moneybox text-center">
      Total money:
      <div class="roundData"> {{ totalMoney }} </div>
    </div>

    <div class="circle text-center">

      <button class="plus" v-on:click="addIncome"> + </button>

      Income: {{ incomeCurMonth }}
      <hr />
      <button class="minus"  v-on:click="addExpense"> - </button>
      Expenses: {{ expensesCurMonth }}

    </div>


    <div class="month-about text-center"> For information about other months or to view income and expenses by categories, go to the <a href="/statistic"> Statistic </a> </div>


  </div>
</template>

<script>
import AppNav from './AppNav';
import KeepAccountsListComponent from './KeepAccountsListComponent';
import { isLoggedIn, getIdToken, getAccessToken } from '../../utils/auth';
import { getUserInfo, getKeepAccounts, getExpenseAccounts } from '../../utils/api';

export default {
  name: 'home-component',
  data() {
    return {
      nickname: '',
      idToken: '',
      incomeCurMonth: 0,
      expensesCurMonth: 0,
      curMonth: '',
      keep_accounts: {},
      expense_accounts: {},
    };
  },
  components: {
    AppNav,
    KeepAccountsListComponent,
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getUserInfo() {
      getUserInfo().then((resp) => {
        // maybe here we can use some map() func
        this.nickname = resp.nickname;
        this.totalMoney = resp.totalMoney;
        this.incomeCurMonth = resp.totalIncomeCurMonth;
        this.expensesCurMonth = resp.totalExpenseCurMonth;
        console.log(resp);
      });
    },
    getKeepAccounts() {
      getKeepAccounts().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    getExpenseAccounts() {
      getExpenseAccounts().then((resp) => {
        this.expense_accounts = resp;
        console.log(resp);
      });
    },
    getIdToken() {
      this.idToken = getIdToken();
      this.token = getAccessToken();
    },
    getCurMonthName() {
      const locale = 'en-us';
      this.curMonth = (new Date()).toLocaleString(locale, {
        month: 'long',
      });
    },
    addIncome() {
      this.$router.push('/income');
    },
    addExpense() {
      this.$router.push('/expense');
    },
  },
  mounted() {
    this.getUserInfo();
    this.getIdToken();
    // this.curMonth = (new Date()).getMonth();
    this.getCurMonthName();
    this.getKeepAccounts();
    this.getExpenseAccounts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .circle {
    margin-left: calc(50% - 200px); 
    border-radius: 50%;
    width: 400px;
    height: 400px;
    padding-top: 120px;
    font-size: 25px;
    border: 5px solid #ef8913;
  }


  .monthbox {
    display: inline-block;
    font-size: 20px;
    width: 400px;
    /* margin-left: 100px; */
    margin-left: 10%;
  }

  .moneybox {
    width: 240px;
    height: 100px;
    margin-left: calc(50% - 240px);
    font-size: 20px;
    display: inline-block;
  }

  .roundData {
    margin-top: 10px;
    background-color: #ef8913;
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10%;
    font-size: 30px;
  }

  hr {
    border: 3px solid #ef8913;
  }

  button {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    color: white;
    border: 3px solid #ef8913;
  }

  .plus {
    background-color:rgb(56, 201, 12); 
  }

  .minus {
    background-color:rgb(218, 39, 7); 
  }

  .month-about {
    font-size: 15px;
    width: 400px;
    margin-top: 50px;
    /* margin-bottom: 50px; */
    /* padding-bottom: 50px; */
    margin-left: 10%;
  }


  .home {
    /* background:  */
    /* background-image: url('../../static/background.jpg'); */
    /* background-repeat: no-repeat; */
    /* background-size: cover; */

    background: url('../../static/background.jpg') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    padding-bottom: 20px; 
  }

  

  div {
    /* background-color: green;  */
  }


</style>
