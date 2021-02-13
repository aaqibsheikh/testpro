<template>
  <div>
    <div class="flex flex-wrap items-center justify-center h-screen">
      <div>
        <div class="w-full mb-2">
          <img src="~/static/images/logo_blue.png" class="w-48 inline-block" />
        </div>
        <div class="w-full text-md text-baits-gray">
          <p>Payment in progress...</p>
          <p>Please do no close this window</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.getPaymentStatus();
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      _getPaymentStatus: 'payment/getPaymentStatus',
    }),
    async getPaymentStatus() {
      this.interval = setInterval(() => {
        console.log('abc');
        // this.setLoader(true);
        // this._getPaymentStatus().then((res) => {
        //   this.setLoader(false);
        // });
      }, 1000);
      // clearInterval(this.interval);
    },
  },
};
</script>