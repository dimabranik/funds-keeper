<template>
  <nav class="navbar navbar-default custom-navbar">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand" v-bind:class="{ active: location === 'home'}" v-show="isLoggedIn()" > Home </router-link>

      <router-link to="/history" class="navbar-brand" v-bind:class="{ active: location === 'history' }"  v-show="isLoggedIn()" > History </router-link>

    </div>

    <ul class="nav navbar-nav navbar-right logout">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      </li>
    </ul>

    <div class="text-center title text-gold" > <a href="/home" class="text-center title text-gold"> FundsKeeper </a> </div>
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
  margin: auto;
  font-size: 30px;
  width: 200px;
}

a:hover { 
    text-decoration: none;
}

.active {
  border: 1px solid black;
  border-radius: 30px;
}

.text-gold {
  color: #ef8913;
}

.custom-navbar {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
}

</style>
