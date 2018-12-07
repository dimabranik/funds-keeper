<template>
  <div>
    <app-nav />

    <keep-accounts-list-component :keep_accounts="keep_accounts" top />
    
    <!--  -->
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add income record </h3>
        <br />


            money amount to add: 
            <input v-model="income" type="number" class="input_number" min="1" />

            <br />

            
            <!-- {{ income }} -->

            <br />
        

            <span> select keep account: </span>
            <select v-model="selected_keep_account" name="selected_keep_account" >
                <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" > {{ keep_account.name }} </option>
                <!--  ( {{ keep_account.curMoney }} )  -->
            </select>
            <br />
                <!-- {{ selected_keep_account }} -->

            <br />
            <input class="input_submit" type="submit" @click="postIncome(selected_keep_account, income)" />



    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import KeepAccountsListComponent from './KeepAccountsListComponent';
import { getKeepAccounts, postIncome } from '../../utils/api';
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
      selected_keep_account: '',
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
    postIncome(accountName, amount) {
      if (isNormalInteger(amount)) {
        postIncome(accountName, amount).then((resp) => {
          console.log(resp);
        });
        this.$router.push('/home');
      } else {
        alert('Invalid input');
      }
    },
  },
  mounted() {
    console.log('try to get keep accounts list');
    this.getKeepAccounts();
    console.log('after getting keep accounts list');
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
