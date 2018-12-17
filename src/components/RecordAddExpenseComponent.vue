<template>
  <div>
    <app-nav />
    
    <accounts-list-keep-component :keep_accounts="keep_accounts" top />

    <accounts-list-expense-component :expense_accounts="expense_accounts" top />

    <!--  -->
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add expense record </h3>
        <table>
          

            <!-- <br /> -->

            
            <!-- {{ income }} -->

            <!-- <br /> -->
        
          <tr>
            <td>
              <span> select keep account: </span>
            </td>
            <td>
              <select v-model="selected_keep_account" name="selected_keep_account" >
                <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.name"> {{ keep_account.name }} </option>
                <!-- ( {{ keep_account.curMoney }}) -->
              </select>
            </td>
          </tr>
            <!-- <br /> -->
                <!-- {{ selected_keep_account }} -->

          <tr>
            <td>
              <span> select expense category: </span>
            </td>
            <td>
              <select v-model="selected_expense_account" name="selected_expense_account" >
                <option v-for="expense_account in expense_accounts" v-bind:key="expense_account.name"> {{ expense_account.name }} </option>
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <span> money amount to spend (in keep account currency): </span>
            </td>
            <td>
              <input v-model="money_amount" type="number" min="1" />
              <!-- class="input_number" -->
            </td>
          </tr>


          <tr>
            <td>
              <span> description: </span>
            </td>
            <td>
              <input v-model="description" type="text" /> 
            </td>
          </tr>


        </table>

        <br />
        <input class="input_submit" type="submit" @click="postExpenses()" />



    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import AccountsListKeepComponent from './AccountsListKeepComponent';
import AccountsListExpenseComponent from './AccountsListExpenseComponent';
import { getAccountsKeep, getAccountsExpense, postExpenses } from '../../utils/api';
import { isPositiveInteger } from '../../utils/validation';
import { sleep } from '../../utils/sleep';

export default {
  name: 'record-add-expense-component',
  components: {
    AppNav,
    AccountsListKeepComponent,
    AccountsListExpenseComponent,
  },
  data() {
    return {
      money_amount: '', // in keep account base currency
      selected_expense_account: '',
      selected_keep_account: '',
      expense_accounts: {},
      keep_accounts: {},
      description: '',
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
    postExpenses() {
      let flag = false;
      console.log('this.money_amount:');
      console.log(this.money_amount);
      if (isPositiveInteger(this.money_amount)) {
        if (this.selected_keep_account) {
          if (this.selected_expense_account) {
            // if selected keep and if selected expense
            this.getAccountsKeep();

            for (let i = 0; i < this.keep_accounts.length; i += 1) {
              if (this.keep_accounts[i].name === this.selected_keep_account) {
                if (this.keep_accounts[i].balance >= this.money_amount) {
                  postExpenses(this.selected_keep_account,
                  this.selected_expense_account, this.money_amount).then((resp) => {
                    console.log(resp);
                  });
                  flag = true;
                } else {
                  alert('Selected keep account does NOT have such money.');
                }
                break;
              }
            }
            if (flag) {
              // await sleep(2000);
              sleep(500).then(() => {
                this.$router.push('/home');
              });
            }
          } else {
            alert('Invalid input (choose expense account)');
          }
        } else {
          alert('Invalid input (choose keep account)');
        }
      } else {
        alert('Invalid input (money amount should be integer > 0, without \'+\' at the start)');
      }
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

.box {
    margin-left: calc(50% - 250px);
    width: 500px;
    border: 2px solid #ef8913;
    border-radius: 10%;
    margin-top: 50px;
    font-size: 18px;
    /* background-color: red; */
    padding-bottom: 30px;
}

/* .input_number {
    width: 200px;
} */

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
