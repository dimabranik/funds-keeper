<template>
  <div class="expense_accounts_box" v-bind:class="{ top: top}">
      <h2> Expense categories: </h2>
      <hr />
      <div v-for="expense_account in expense_accounts" v-bind:key="expense_account.name" class="expense_account text-center"> {{ expense_account.name }} </div> 
      <button class="expense_account" v-on:click="addExpenseAccount" > + </button>  
    </div>
</template>

<script>


export default {
  name: 'accounts-list-expense-component',
  props: {
    expense_accounts: Object,
    top: Boolean,
  },
  methods: {
    addExpenseAccount() {
      this.$router.push('/add_expense_account');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .expense_accounts_box { 
    display: inline-block;
    position: absolute;
    left: 75%;
    top: 300px;
    border: 3px solid #ef8913;
    border-radius: 20%;
    padding: 30px;
    width: 300px;
  }

  .expense_account { 
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    

    border: 2px solid #ef8913;
    border-radius: 20%;
    margin-bottom: 10px;
    font-size: 15px; 
    background: 0%;
  }

  .top {
      top: 130px !important;
  }

  hr {
    border: 1px solid #ef8913;
  }

</style>
