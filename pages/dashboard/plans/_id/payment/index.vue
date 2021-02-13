<template >
  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="pk"
      :amount="amount"
      :session-id="sessionId"
    >
      <template slot="checkout-button">
        <button @click="checkout">Shut up and take my money!</button>
      </template>
    </stripe-checkout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY;
    return {
      amount: '',
      sessionId: '',
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('payment/getPaymentSession', {
      data: { planId: params.id },
    });
  },
  computed: {
    ...mapGetters({
      session: 'payment/isSession',
    }),
  },
  mounted() {
    //if plan is invalid redirect back to plan listing
    console.log('mounted session', this.session);
    if (this.session == undefined || this.session.data.result == false) {
      console.log('mounted session1', this.session);
      console.log('mounted session2', this.session.data.result);
      this.$router.push('/dashboard/plans');
    } else {
      console.log('mounted session else', this.session.data);
      this.sessionId = this.session.data.sessionId;
      this.amount = this.session.data.amount;
      //set session
    }
  },
  methods: {
    goToPath(path) {
      this.$router.push(path);
    },
    checkout() {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>