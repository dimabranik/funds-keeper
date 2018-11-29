<template>
  <div>
    <app-nav location="home" />

    <!-- <br /> -->

    <!-- nickname: {{ nickname }}

    <br /> <br />

    idToken: <br />
     {{ idToken }} 

    <br /> <br />

    token: <br />
    
    {{ token }} 

    <br /> <br />

    income: <br />
     {{ income }} 

    <br /> <br />

    expenses: <br />
     {{ expenses }} 

    <br /> <br /> -->


     
      <h2 class="text-center"> {{ nickname }} </h2>
      <br />

    <div class="circle text-center">
      <button class="plus"> + </button>
      <!-- v-on="click" {} -->
      Income: {{ income }}
      <hr />
      <button class="minus"> - </button>
      Expenses: {{ expenses }}
    </div>

    <div class="money text-center">
      Money amoung: 4000

      <!-- <span v-bind=""  if sum < 0 color red -->
    </div>

  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn, getIdToken, getAccessToken } from '../../utils/auth';
import { getUserInfo } from '../../utils/api';

export default {
  name: 'home-component',
  data() {
    return {
      nickname: '',
      idToken: '',
      income: 0,
      expenses: 0,
    };
  },
  components: {
    AppNav,
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getUserInfo() {
      getUserInfo().then((resp) => {
        // maybe here we can use some map() func
        this.nickname = resp.nickname;
        this.income = resp.accounts.income;
        this.expenses = resp.accounts.expenses;

        console.log(resp);
      });
    },
    getIdToken() {
      this.idToken = getIdToken();
      this.token = getAccessToken();
    },
  },
  mounted() {
    this.getUserInfo();
    this.getIdToken();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .circle {
    /* border-radius: 100%;
    width: 50%;
    height: calc(width);
    background-color: coral; */
    margin: auto; 

    border-radius: 50%;
    width: 400px;
    height: 400px;
    padding-top: 145px;
    font-size: 25px;
    background-color: #ef8913;  
    margin-top: 50px;
    /* margin-left: calc(50% - 200px); */
    /* display: inline-block; */
  }

  .money {
    position: absolute;
    width: 240px;
    height: 240px;
    left: calc(100% - 350px);
    top: 250px;
    background-color: #048eff; 
    font-size: 20px;
    /* background-color: #da950d; */

    padding-top: 100px;
    border-radius: 50%;
    
  }

  hr {
    border: 3px solid white;
  }

  button {
    /* margin-right: 55px !important; */
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .plus {
    background-color:rgb(58, 236, 4); 
  }

  .minus {
    background-color:rgb(216, 50, 21); 
  }

</style>
