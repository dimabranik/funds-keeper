<template>
  <div>
    <app-nav location="home" />

    <br />

    nickname: {{ nickname }}

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

    <br /> <br />

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
        this.income = resp.income;
        this.expenses = resp.expenses;

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
</style>
