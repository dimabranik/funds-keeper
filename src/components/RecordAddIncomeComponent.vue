<template>
  <div>
    <app-nav />

    <accounts-list-keep-component :keep_accounts="keep_accounts" top />
    
    <!--  -->
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add income record </h3>
        <br />


            money amount to add: 
            <input v-model="money_amount" type="number" class="input_number" min="1" /> 

            <br />

            
            <!-- {{ income }} -->

            <br />
        

            <span> select keep account: </span>
            <select v-model="selected_keep_account" name="selected_keep_account" >
                <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" > {{ keep_account.name }} </option> 
                <!--  ( {{ keep_account.curMoney }} )  -->
            </select>
            <br />
            <br />
                <!-- {{ selected_keep_account }} -->

            <!-- v-if="this.selected_keep_account" -->
            <!-- <span > keep account currency: <b style="text-transform: uppercase;"> {{  }} </b> </span> -->
            <!-- <br /> -->
            <!-- <br /> -->

            description: 
            <input v-model="description" type="text" /> 
            <br />
            <br />

            <input class="input_submit" type="submit" @click="postIncome()" />



    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import AccountsListKeepComponent from './AccountsListKeepComponent';
import { getKeepAccounts, postIncome } from '../../utils/api';
import { isNormalInteger } from '../../utils/validation';

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
    getKeepAccounts() {
      getKeepAccounts().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    // getSelectedKeepAccount() {
    //   // for (var i in keep_accounts) {
    //   //   if (keep_accounts[i].name === keepAccountName) {
    //   //     return keep_accounts[i];
    //   //   }
    //   // }
    //   // let result = {};
    //   let result = {};
    //   console.log('in keep account by name');
    //   if (this.selected_keep_account) {
    //     console.log('in keep account by name IF');
    //     let i;
    //     // let result = {};
    //     // const keepAccounts = Object.entries(this.keep_accounts)
    //     for (i = 0; i < this.keep_accounts.length; i += 0) {
    //       if (this.keep_accounts[i].name === this.selected_keep_account) {
    //         result = this.keep_accounts[i];
    //         break;
    //       }
    //     }
    //     // return result;
    //   }
    //   // return '';
    //   console.log('chosen account: ');
    //   console.log(result);
    //   return result;
    // },
    postIncome() {
      if (isNormalInteger(this.money_amount)) {
        if (this.selected_keep_account) {
          // this.base_currency = this.getSelectedKeepAccount().base_currency;
          // const string = 'Add income record into \'' + this.selected_keep_account +
          //  '\' keep account (currency: ' + this.base_currency + ')';
          // if (confirm(string)) {
          // } else {
          //   console.log('denied');
          // }
          postIncome(this.selected_keep_account,
          this.money_amount, this.description).then((resp) => {
            console.log(resp);
            this.$router.push('/home');
          });
        } else {
          alert('Invalid input (choose keep account)');
        }
      } else {
        alert('Invalid input (money amount should be integer > 0)');
      }
    },
  },
  mounted() {
    this.getKeepAccounts();
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

select {
    width: 200px;
}

</style>
