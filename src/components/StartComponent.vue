<template>
  <div>
    <h3 class="text-center">Start Page</h3>
    <hr/>

    <h4 class="text-center"> Start using the FundsKeeper right now! Click `Log In`! </h4>

  </div>
</template>

<script>
import { isLoggedIn } from '../../utils/auth';
import { getUserId } from '../../utils/api';

export default {
  name: 'StartComponent',
  data() {
    return {
      user: '',
    };
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
</style>
