<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <div class="text-center title text-gold" > FundsKeeper </div>

      <router-link to="/" class="navbar-brand" v-bind:class="{ active: location === 'home'}" v-show="isLoggedIn()" > Home </router-link>

      <router-link to="/statistic" class="navbar-brand" v-bind:class="{ active: location === 'statistic' }"  v-show="isLoggedIn()" > Statistic </router-link>

      <router-link to="/account" class="navbar-brand" v-bind:class="{ active: location === 'account' }"  v-show="isLoggedIn()" > Account </router-link>
    </div>

    <ul class="nav navbar-nav navbar-right logout">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '../../utils/auth';

export default {
  name: 'app-nav',
  props: {
    location: String,
    hidden: Boolean,
  },
  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right {margin-right: 0px !important;}

.log {
  margin: 5px 10px 0 0;
}

.title {
  position: absolute;
  margin-left: calc(50% - 60px); 
  font-size: 30px; 

  /* display: inline; */
  /* width: 40%;  */
  /* background-color: red;   */

  /* margin: auto; */
  /* width: 50%; */

}

.active {
  border: 1px solid black;
  border-radius: 30px;
}

.text-gold {
  color: #da950d;
}

</style>
