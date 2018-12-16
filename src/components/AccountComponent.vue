<template>
  <div>
    <app-nav location="account" />

    <h2> Account </h2>
    <!-- userid = {{ userid }} -->
  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn } from '../../utils/auth';
// import { getUserId } from '../../utils/api';

export default {
  name: 'account-component',
  data() {
    return {
      userid: '',
    };
  },
  components: {
    AppNav,
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    // getUserId() {
    //   getUserId().then((resp) => {
    //     this.userid = resp.userid;
    //     console.log('Response from server on /api/userid :');
    //     console.log(resp);
    //   });
    // },
  },
  mounted() {
    // this.getUserId();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
