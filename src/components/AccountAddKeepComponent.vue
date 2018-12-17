<template>
  <div>
    <app-nav />

    <accounts-list-keep-component :keep_accounts="keep_accounts" top />

    <div class="box text-center"> 
        <h3 class="text-center"> Add new keep account </h3>
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

            <!-- <br /> -->
            <!-- <br /> -->
          <tr>
            <td>
              <span> initial balance (optional): </span>
            </td>

            <td>
              <input v-model="initial_balance"  /> 
              <!-- type="number" min="0" couses problems, becouse return 0 if some left input and 
                                                i can't catch that situation to alert user --> 
            </td>

          </tr>
        </table>
            <br />

            <input class="input_submit" type="submit" @click="postAccountsKeep()" />



    
    </div>

  </div>
</template>

<script>
import AppNav from './AppNav';
import AccountsListKeepComponent from './AccountsListKeepComponent';
import { getAccountsKeep, postAccountsKeep } from '../../utils/api';
import { isNormalInteger } from '../../utils/validation';
import { sleep } from '../../utils/sleep';


export default {
  name: 'account-add-keep-component',
  components: {
    AppNav,
    AccountsListKeepComponent,
  },
  data() {
    return {
      new_name: '',
      selected_base_currency: '',
      initial_balance: '',
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
      keep_accounts: {},
    };
  },
  methods: {
    getAccountsKeep() {
      getAccountsKeep().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    isNewNameUnique() {
      this.getAccountsKeep();
      for (let i = 0; i < this.keep_accounts.length; i += 1) {
        if (this.keep_accounts[i].name === this.new_name) {
          return false;
        }
      }
      return true;
    },
    postAccountsKeep() {
      if (this.new_name && this.isNewNameUnique()) {
        if (this.initial_balance === '') {
          this.initial_balance = '0';
        }

        if (isNormalInteger(this.initial_balance)) {
          if (this.selected_base_currency) {
            postAccountsKeep(this.new_name,
            this.selected_base_currency, this.initial_balance).then((resp) => {
              console.log(resp);
              sleep(500).then(() => {
                this.$router.push('/home');
              });
            });

            // console.log('everything is OK.');
            // console.log(this.new_name);
            // console.log(this.selected_base_currency);
            // console.log(this.initial_balance);

            // console.log('\n\n');

            // sleep(500).then(() => {
            //   this.$router.push('/home');
            // });
          } else {
            alert('Invalid input (choose base currency)');
          }
        } else {
          alert('Invalid input (initial balance should be integer >= 0, without \'+\' at the start)');
        }
      } else {
        alert('Invalid input (enter a unique title)');
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
