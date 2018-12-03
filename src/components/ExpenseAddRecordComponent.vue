<template>
  <div>
    <app-nav />
    
    <!--  -->
    
    <div class="box text-center"> 
        <h3 class="text-center"> Add expense record </h3>
        <br />


            money amount to spend: 
            <input v-model="income" type="number" class="input_number" min="1" />

            <br />

            
            <!-- {{ income }} -->

            <br />
        

            <span> Select keep account: </span>
            <select v-model="selected_keep_account" name="selected_keep_account" >
                <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.value"> {{ keep_account }} </option>
            </select>
            <br />
                <!-- {{ selected_keep_account }} -->

            <span> Select expense category: </span>
            <select v-model="selected_expense_category" name="selected_expense_category" >
                <option v-for="expense_category in expense_categories" v-bind:key="expense_category.value"> {{ expense_category }} </option>
            </select>
            <br />
                <!-- {{ selected_expense_category }} -->

            <br />
            <input class="input_submit" type="submit" />



    
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import { getKeepAccounts, getExpenseCategories } from '../../utils/api';

export default {
  name: 'income-add-record-component',
  components: {
    AppNav,
  },
  data() {
    return {
      income: '',
      selected_category: '',
      selected_expense_category: '',
      selected_keep_account: '',
      expense_categories: [],
      keep_accounts: [],
    };
  },
  methods: {
    getKeepAccounts() {
      getKeepAccounts().then((resp) => {
        this.keep_accounts = resp;
        console.log(resp);
      });
    },
    getExpenseCategories() {
      getExpenseCategories().then((resp) => {
        this.expense_categories = resp;
        console.log(resp);
      });
    },

  },
  mounted() {
    this.getKeepAccounts();
    this.getExpenseCategories();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.box {
    margin-left: calc(50% - 300px);
    width: 600px;
    border: 2px solid #ef8913;
    border-radius: 10%;
    margin-top: 50px;
    font-size: 20px;
    /* background-color: red; */
    padding-bottom: 30px;
}

.input_number {
    /* width: 200px; */
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
