<template>
  <div>
    <app-nav hidden=true />
    <!-- <h1 class="text-center text-gold"> FundsKeeper </h1> -->
    <!-- <hr /> -->

    <h4 class="text-center"> Start using the FundsKeeper right now! Click `Log In`! </h4>

  </div>
</template>

<script>
import { isLoggedIn } from '../../utils/auth';
import { getUserId } from '../../utils/api';
import AppNav from './AppNav';

export default {
  name: 'start-component',
  data() {
    return {
      user: '',
    };
  },
  components: {
    AppNav,
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getUserId() {
      getUserId().then((resp) => {
        console.log(resp);
      });
    },
  },
  // mounted() {
    // this.getUserId();
  // },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* hr { */
  /* border: none; */
  /* height: 1px; */
  /* Set the hr color */
  /* color: #da950d; old IE */
  /* background-color: #da950d; Modern Browsers */
/* } */

/* .text-gold { */
  /* color: #da950d; Modern Browsers */
/* } */

</style>
