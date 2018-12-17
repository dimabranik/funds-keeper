<template>
  <div>
    <app-nav />

    <accounts-list-keep-component :keep_accounts="keep_accounts" top />
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add income record </h3>
        <br />

        <table>
          <tr>
            <td>
              <span> select keep account: </span>
            </td>

            <td>
              <select v-model="selected_keep_account" name="selected_keep_account" >
                  <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" > {{ keep_account.name }} </option> 
              </select>
            </td>

          </tr>
          <tr>
            <td>
              <span> money amount to add (in keep account currency): </span>
            </td>

            <td>
              <input v-model="money_amount" type="number" min="1" /> 
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

            <input class="input_submit" type="submit" @click="postIncomes()" />
    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import AccountsListKeepComponent from './AccountsListKeepComponent';
import { getAccountsKeep, postIncomes } from '../../utils/api';
import { isPositiveInteger } from '../../utils/validation';
import { sleep } from '../../utils/sleep';

export default {
  name: 'record-add-income-component',
  components: {
    AppNav,
    AccountsListKeepComponent,
  },
  data() {
    return {
      money_amount: '',
      selected_keep_account: '',
      keep_accounts: {},
      description: '',
      // base_currency: '',
    };
  },
  methods: {
    getAccountsKeep() {
      getAccountsKeep().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    postIncomes() {
      if (isPositiveInteger(this.money_amount)) {
        if (this.selected_keep_account) {
          postIncomes(this.selected_keep_account,
          this.money_amount, this.description).then((resp) => {
            console.log(resp);
            sleep(500).then(() => {
              this.$router.push('/home');
            });
          });
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

.input_number {
    width: 200px;
}

.input_submit {
    border: 2px solid #ef8913;
    border-radius: 10%;
    background-color: white;
}

select {
    width: 200px;
}

input {
  width: 200px;
}

span {
  width: 200px;
}

td {
  padding-left: 20px; 
  padding-top: 20px;
  padding-right: 20px;
}

</style>
