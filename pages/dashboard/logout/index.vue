<template>
  <div></div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  mounted() {
    this.userLogout().then(response => {
      if (response) {
        this.setLoader(false);
        this.$router.push('/account?tab=login');
      }
    }).catch(error => {
      this.setLoader(false);
      this.$router.push('/account?tab=login');
    });

  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader'
    }),
    ...mapActions({
      userLogout: 'user/userLogout'
    }),
  }
}

</script>
