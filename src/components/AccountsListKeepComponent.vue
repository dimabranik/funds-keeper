<template>
  <!-- <div>
      <h1> hello from keep list </h1>
  </div> -->
  <div class="keep_accounts_box" v-bind:class="{ top: top}">
      <h2> Keep accounts: </h2>
      <hr />
      <div v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" class="keep_account text-center" > {{ keep_account.name }} ( {{ keep_account.balance}} {{ keep_account.base_currency.toUpperCase() }} ) </div>
      <button class="keep_account" v-on:click="addKeepAccount" > + </button>
       <!-- (add new keep account) -->
    </div>
</template>

<script>


export default {
  name: 'accounts-list-keep-component',
//   data() {
//     return {
//       keep_accounts: {},
//     };
//   },
  props: {
    keep_accounts: Object,
    top: Boolean,
  },
  methods: {
    addKeepAccount() {
      this.$router.push('/add_keep_account');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .keep_accounts_box { 
    display: block;
    position: absolute;
    left: 5%;
    top: 300px;
    border: 3px solid #ef8913;
    border-radius: 20%;
    padding: 30px;
    width: 300px;
  }

  .keep_account {
    border: 2px solid #ef8913;
    border-radius: 20%;
    margin-bottom: 10px;
    font-size: 15px; 
    /* width: 240px; */
    background: 0%;

    margin-left: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
  }

  .top {
      top: 130px !important;
  }

  hr {
    border: 1px solid #ef8913;
  }

</style>
