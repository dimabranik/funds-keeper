<template>
  <div>
    <app-nav />
    
    <keep-accounts-list-component :keep_accounts="keep_accounts" top />

    <!--  -->
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add expense record </h3>
                <table>
          <tr>
            <td>
              money amount to spend: 
            </td>
            <td>
              <input v-model="income" type="number" class="input_number" min="1" />
            </td>
          </tr>

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
        </table>

        <br />
        <input class="input_submit" type="submit" @click="postExpense(selected_keep_account, selected_expense_account, income)" />



    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import KeepAccountsListComponent from './KeepAccountsListComponent';
import { getKeepAccounts, getExpenseAccounts, postExpense } from '../../utils/api';
import { isNormalInteger } from '../../utils/validation';

export default {
  name: 'income-add-record-component',
  components: {
    AppNav,
    KeepAccountsListComponent,
  },
  data() {
    return {
      income: '',
      selected_expense_account: '',
      selected_keep_account: '',
      expense_accounts: {},
      keep_accounts: {},
    };
  },
  methods: {
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
    postExpense(keepAccountName, expenseAccountName, amount) {
      let flag = false;
      if (isNormalInteger(amount)) {
        this.getKeepAccounts();

        for (let i = 0; i < this.keep_accounts.length; i += 1) {
          if (this.keep_accounts[i].name === this.selected_keep_account) {
            if (this.keep_accounts[i].curMoney >= amount) {
              postExpense(keepAccountName, expenseAccountName, amount).then((resp) => {
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
          this.$router.push('/home');
        }
      } else {
        alert('Invalid input (it should be integer >= 0)');
      }
    },
  },
  mounted() {
    this.getKeepAccounts();
    this.getExpenseAccounts();
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
    font-size: 20px;
    /* background-color: red; */
    padding-bottom: 30px;
}

.input_number {
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
}

select {
  width: 200px;
}

</style>
