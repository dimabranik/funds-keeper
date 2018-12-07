<template>
  <!-- <div>
      <h1> hello from keep list </h1>
  </div> -->
  <div class="keep_accounts" v-bind:class="{ top: top}">
      <h1> Keep accounts: </h1>
      <hr />
      <div v-for="keep_account in keep_accounts" v-bind:key="keep_account.name"> * {{ keep_account.name }} ( {{ keep_account.curMoney }} ) </div>   
    </div>
</template>

<script>


export default {
  name: 'keep-accounts-list-component',
//   data() {
//     return {
//       keep_accounts: {},
//     };
//   },
  props: {
    keep_accounts: Object,
    top: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .keep_accounts { 
        /* margin-left: 10%; */
        /* margin-top: 50px; */


    display: inline-block;
    position: absolute;
    left: 5%;
    top: 300px;
    border: 3px solid #ef8913;
    border-radius: 20%;
    padding: 30px;
    font-size: 18px; 
  }

  .top {
      /* position: absolute; */
      top: 130px !important;
      /* background-color: red;  */
  }

  hr {
    border: 1px solid #ef8913;
  }

</style>
