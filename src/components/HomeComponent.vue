<template>
  <div>
    <h3 class="text-center">Home</h3>
    <hr/>

    <p class="text-center"> Login to get to the private page. </p>

  </div>
</template>

<script>
import { isLoggedIn } from '../../utils/auth';
import { getUserId } from '../../utils/api';

export default {
  name: 'HomeComponent',
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
