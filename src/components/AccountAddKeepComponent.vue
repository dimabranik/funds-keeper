<template>
  <div>
    <app-nav />

    <div class="box text-center"> 
        <h3 class="text-center"> Add new keep account </h3>
        <br />


            
        <table>
          <tr>
            <td>
              <span> name: </span>
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
              <span> initial balance: </span>
            </td>

            <td>
              <input v-model="initial_balance" type="number" min="1" /> 
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
// import { postAccountsKeep } from '../../utils/api';
import { isNormalInteger } from '../../utils/validation';


export default {
  name: 'account-add-keep-component',
  components: {
    AppNav,
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
    isNewNameUnique() {

    },
    postAccountsKeep() {
      // TODO: validation by name (get all keep accounts and
      // check if there is no with the same name)
      // TODO: check if initial balance there. also could be = 0


      console.log(this.new_name);
      console.log(this.selected_base_currency);
      console.log(this.initial_balance);
      console.log(isNormalInteger(this.initial_balance));

      // postAccountsKeep().then((resp) => {
      //   this.keep_accounts = resp;
      //   console.log(resp);
      // });
    },
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
