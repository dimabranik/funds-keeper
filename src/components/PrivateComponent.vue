<template>
  <div>
    <h3 class="text-center">Private page!</h3>
    <hr/>
  </div>
</template>

<script>
import { isLoggedIn } from '../../utils/auth';
import { getUserId } from '../../utils/api';

export default {
  name: 'PrivateComponent',
  data() {
    return {
      userid: '',
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getUserId() {
      getUserId().then((resp) => {
        this.userid = resp.userid;
        console.log(resp);
        console.log('hello from get user id');
      });
    },
  },
  mounted() {
    this.getUserId();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
