<template>
  <div>
    <app-nav />

    <accounts-list-expense-component :expense_accounts="expense_accounts" top />

    <div class="box text-center"> 
        <h3 class="text-center"> Add new expense account </h3>
        <br />


            
        <table>
          <tr>
            <td>
              <span> title: </span>
            </td>

            <td>
              <input v-model="new_name" type="text" /> 
            </td>

          </tr>

          <tr>
            <td>
              <span> select base currency: </span>
            </td>

            <td>
              <select v-model="selected_base_currency" name="selected_base_currency" >
                  <option v-for="currency in currencies" v-bind:key="currency" > {{ currency }} </option> 
              </select>
            </td>

          </tr>

          <tr>
            <td>
              <span> month expenses limit (optional): </span>
            </td>

            <td>
              <input v-model="month_expenses_limit"  /> 
            </td>

          </tr>
        </table>
            <br />

            <input class="input_submit" type="submit" @click="postAccountsExpense()" />
    
    </div>

  </div>
</template>

<script>
import AppNav from './AppNav';
import AccountsListExpenseComponent from './AccountsListExpenseComponent';
import { getAccountsExpense, postAccountsExpense } from '../../utils/api';
import { isNormalInteger } from '../../utils/validation';
import { sleep } from '../../utils/sleep';


export default {
  name: 'account-add-expense-component',
  components: {
    AppNav,
    AccountsListExpenseComponent,
  },
  data() {
    return {
      new_name: '',
      selected_base_currency: '',
      month_expenses_limit: '',
      currencies: [
        'USD',
        'EUR',
        'BGN',
        'CAD',
        'BRL',
        'HUF',
        'DKK',
        'JPY',
        'ILS',
        'TRY',
        'RON',
        'GBP',
        'PHP',
        'HRK',
        'NOK',
        'ZAR',
        'MXN',
        'AUD',
        'KRW',
        'HKD',
        'ISK',
        'CZK',
        'THB',
        'MYR',
        'NZD',
        'PLN',
        'CHF',
        'SEK',
        'CNY',
        'SGD',
        'INR',
        'IDR',
        'RUB',
      ],
      expense_accounts: {},
    };
  },
  methods: {
    getAccountsExpense() {
      getAccountsExpense().then((resp) => {
        this.expense_accounts = resp;
        console.log(resp);
      });
    },
    isNewNameUnique() {
      this.getAccountsExpense();
      for (let i = 0; i < this.expense_accounts.length; i += 1) {
        if (this.expense_accounts[i].name === this.new_name) {
          return false;
        }
      }
      return true;
    },
    postAccountsExpense() {
      if (this.new_name && this.isNewNameUnique()) {
        if (this.month_expenses_limit === '' || isNormalInteger(this.month_expenses_limit)) {
          if (this.selected_base_currency) {
            postAccountsExpense(this.new_name,
            this.selected_base_currency, this.month_expenses_limit).then((resp) => {
              console.log(resp);
              sleep(500).then(() => {
                this.$router.push('/home');
              });
            });
          } else {
            alert('Invalid input (choose base currency)');
          }
        } else {
          alert('Invalid input (month expenses limit should be integer >= 0, without \'+\' at the start)');
        }
      } else {
        alert('Invalid input (enter a unique title)');
      }
    },
  },
  mounted() {
    this.getAccountsExpense();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.box {
    margin-left: calc(50% - 250px);
    width: 500px;
    border: 2px solid #ef8913;
    border-radius: 10%;
    margin-top: 50px;
    font-size: 18px;
    padding-bottom: 30px;
}

input {
  width: 200px;
}

.input_submit {
    border: 2px solid #ef8913;
    border-radius: 10%;
    background-color: white;
}

td {
  padding-left: 20px; 
  padding-top: 20px;
  padding-right: 20px;
}

select {
  width: 200px;
}


</style>
