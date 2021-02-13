<template>
  <div class="w-full">
    <Header />
    <div
      v-if="plans.result == false"
      class="grid md:grid-cols-3 grid-cols-1 gap-4 px-4 md:py-0 py-12 md:mt-8 sm:mt-0 mt-16"
    >
      {{ plans.error }}
    </div>
    <div
      v-else
      class="grid md:grid-cols-3 grid-cols-1 gap-4 px-4 md:py-0 py-12 md:mt-8 sm:mt-0 mt-16"
    >
      <div class="md:shadow-none shadow-3xl box-grid">
        <div class="md:px-0 px-8">
          <div
            class="py-8 xl:px-20 lg:px-8 sm:py-4 md:border-r border-r-0 border-gray-300 price-box"
          >
            <h2 class="text-center font-bold text-black text-2xl">Free</h2>
            <div class="my-3 text-center">
              <div class="px-5">
                <span
                  class="text-gray-700 relative"
                  style="font-size: 35px; top: -15px; right: 0"
                  >$</span
                >
                <span class="text-black font-bold text-6xl">0</span>
              </div>
            </div>
            <p class="text-center text-gray-800 text-xs">
              For teams wanting to try out baitsbite for an unlimited period of
              time
            </p>
          </div>
          <div class="md:py-20 py-0 xl:px-12 lg:px-8">
            <button
              class="w-full px-12 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none border-2 border-gray-300"
              @click="goToPath(`/dashboard/plans/${plans.data[0].id}/payment`)"
            >
              Your current plan
            </button>
            <h2 class="font-bold text-sm text-black mt-6">Free includes</h2>
            <p class="text-xs text-gray-500">All of these great features:</p>
            <hr class="my-3 border-gray-300" />
            <div>
              <ul class="list-disc text-xs text-gray-500 px-4">
                <li>
                  Searchable message achieves, up to 10K of your team's most
                  recent messages
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="md:shadow-none shadow-3xl box-grid">
        <div class="md:px-0 px-8">
          <div
            class="py-8 xl:px-20 lg:px-8 sm:py-4 md:border-r border-r-0 border-gray-300 price-box"
          >
            <h2 class="text-center font-bold text-black text-2xl">Standard</h2>
            <div class="text-center my-3">
              <div class="px-5">
                <span
                  class="text-gray-700 relative"
                  style="font-size: 35px; top: -15px; right: 0"
                  >$</span
                >
                <span class="text-black font-bold text-6xl">6</span>
                <span
                  class="text-black text-md relative"
                  style="font-size: 20px; top: -15px"
                  >67</span
                >
              </div>
            </div>
            <p class="text-center text-gray-800 text-xs">
              per active user, per month billed annually
              <br />
              <br />$8 billed monthly
            </p>
          </div>
          <div class="md:py-20 py-0 xl:px-12 lg:px-8">
            <button
              class="w-full px-12 py-2 text-sm text-white bg-baits-blue rounded-md focus:outline-none border-2 border-gray-300"
              @click="goToPath(`/dashboard/plans/${plans.data[1].id}/payment`)"
            >
              Upgrade Now
            </button>
            <h2 class="font-bold text-sm text-black mt-6">Standard includes</h2>
            <p class="text-xs text-gray-500">
              Everything in
              <span class="font-bold">Free</span> and:
            </p>
            <hr class="my-3 border-gray-300" />
            <div>
              <ul class="list-disc text-xs text-gray-500 px-4">
                <li>Unlimited searchable message archives</li>
                <li>Unlimited apps and service integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="md:shadow-none shadow-3xl box-grid">
        <div class="md:px-0 px-8">
          <div class="py-8 xl:px-20 lg:px-8 sm:py-4 price-box">
            <h2 class="text-center font-bold text-black text-2xl">Plus</h2>
            <div class="text-center my-3">
              <div class="px-5">
                <span
                  class="text-gray-700 relative"
                  style="font-size: 35px; top: -15px; right: 0"
                  >$</span
                >
                <span class="text-black font-bold text-6xl">12</span>
                <span
                  class="text-black text-md relative"
                  style="font-size: 20px; top: -15px"
                  >50</span
                >
              </div>
            </div>
            <p class="text-center text-gray-800 text-xs">
              per active user, per monthly billed annually
              <br />
              <br />$15 billed monthly
            </p>
          </div>
          <div class="md:py-20 py-0 xl:px-12 lg:px-8">
            <button
              class="w-full px-12 py-2 text-sm text-white bg-baits-blue rounded-md focus:outline-none border-2 border-gray-300"
              @click="goToPath(`/dashboard/plans/${plans.data[2].id}/payment`)"
            >
              Upgrade Now
            </button>
            <h2 class="font-bold text-sm text-black mt-6">Plus includes</h2>
            <p class="text-xs text-gray-500">
              Everything in
              <span class="font-bold">Standard</span> and:
            </p>
            <hr class="my-3 border-gray-300" />
            <div>
              <ul class="list-disc text-xs text-gray-500 px-4">
                <li>SAML-based single sign-on (SSO)</li>
                <li>Compliance Exports of all messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  data() {
    return {};
  },
  async fetch({ app, params, store }) {
    await store.dispatch('payment/getPaymentplan');
  },
  computed: {
    ...mapGetters({
      plans: 'payment/isPlans',
    }),
  },
  methods: {
    goToPath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
.price-box {
  height: 370px;
}

.box-grid {
  padding: 0px;
}

@media (max-width: 768px) and (min-width: 320px) {
  .price-box {
    height: 300px;
  }

  .box-grid {
    padding: 30px 10px 60px 10px;
  }
}
</style>
