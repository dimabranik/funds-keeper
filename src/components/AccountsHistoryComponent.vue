<template>
  <div> 
      <app-nav location="history" />

      <!-- <h4> History </h4>  -->

      <h2 class="text-center"> Select an account to view account history </h2>

      <div class="keep_accounts_list"> 
        <div class="title text-center"> Keep accounts: </div>
        <hr />
        <button v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" class="text-center" v-on:click="selectKeepAccount(keep_account.name)" > {{ keep_account.name }} </button> 
      </div>

      <div class="expense_accounts_list"> 
        <div class="title text-center"> Expense accounts: </div>
        <hr />
        <button v-for="expense_account in expense_accounts" v-bind:key="expense_account.name" class="text-center" v-on:click="selectExpenseAccount(expense_account.name)" > {{ expense_account.name }} </button> 
      </div>

      <!-- {{ selected_account_type }}  {{ selected_account_name }} -->
  </div>
</template>

<script>
import AppNav from './AppNav';
import { getAccountsKeep, getAccountsExpense } from '../../utils/api';


export default {
  name: 'accounts-history-component',
  components: {
    AppNav,
  },
  data() {
    return {
      keep_accounts: {},
      expense_accounts: {},
      selected_account_type: '',
      selected_account_name: '',
    };
  },
  methods: {
    getAccountsKeep() {
      getAccountsKeep().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    getAccountsExpense() {
      getAccountsExpense().then((resp) => {
        this.expense_accounts = resp;
        console.log(resp);
      });
    },
    selectKeepAccount(keepAccountName) {
      this.selected_account_type = 'keep';
      this.selected_account_name = keepAccountName;
      this.showHistory();
    },
    selectExpenseAccount(expenseAccountName) {
      this.selected_account_type = 'expense';
      this.selected_account_name = expenseAccountName;
      this.showHistory();
    },
    showHistory() {
      console.log(this.selected_account_type);
      console.log(this.selected_account_name);
    },
  },
  mounted() {
    this.getAccountsKeep();
    this.getAccountsExpense();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.keep_accounts_list {
  position: absolute;
  left: 50px;
  top: 150px;

  width: 400px;
  /* background-color: red; */
  font-size: 15px;
}

.expense_accounts_list {
  position: absolute;
  left: calc(100% - 450px);
  top: 150px;

  width: 400px;
  /* background-color: red; */
  font-size: 15px;
}

.title {
  font-size: 20px;
}

button {
  display: block;
  width: 300px;
  margin: auto;
  background-color: white;
  border: 1px solid #ef8913;
}

/* 
.entry {

} */

</style>
