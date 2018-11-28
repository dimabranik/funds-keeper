<template>
</template>
<script>

import { setIdToken, setAccessToken } from '../../utils/auth';
import { login } from '../../utils/api';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      login();
      window.location.href = '/';
    });
  },
};
</script>
