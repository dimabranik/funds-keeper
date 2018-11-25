<template>
  <div id="app">
    <app-nav/>
    <router-view/>
  </div>
</template>

<script>
import AppNav from './components/AppNav';

export default {
  name: 'app',
  components: {
    AppNav,
  },
};
</script>

<style>
</style>
