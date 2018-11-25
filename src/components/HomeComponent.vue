<template>
  <div>
    <h3 class="text-center">Home page!</h3>
    <hr/>

    <h4> User id: {{userid}}</h4>
    <FinanceComponent/>
  </div>
</template>

<script>
import { FinanceComponent } from '@/components/FinanceComponent';
import { isLoggedIn } from '../../utils/auth';
import { getUserId } from '../../utils/api';

export default {
  name: 'HomeComponent',
  data() {
    return {
      userid: '',
    };
  },
  components: {
    FinanceComponent,
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
