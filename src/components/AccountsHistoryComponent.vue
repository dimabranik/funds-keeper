<template>
  <div> 
      <app-nav location="history" />

      <h4> History </h4> 
    </div>
</template>

<script>
import AppNav from './AppNav';

export default {
  name: 'accounts-history-component',
  components: {
    AppNav,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
