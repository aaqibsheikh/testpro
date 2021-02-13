<template>
  <div class="w-full pb-16">
    <Header />
    <nuxt-child />
    <BaitProfileSetupModal v-if="baits.data.status === 'new' && isDomReady" />
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BaitProfileSetupModal from '@/components/modal/BaitProfileSetupModal';
export default {
  layout: 'dashboard',
  components: {
    Header,
    BaitProfileSetupModal,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('baits/getBaitsList', { pageNum: '', pageSize: '' });
  },
  computed: {
    ...mapGetters({
      baits: 'baits/isBaits',
    }),
  },
  mounted() {
    this.isDomReady = true;

    this.$nextTick(() => {
      if (this.baits.data.status === 'new') {
        VoerroModal.show('bait-profile-setup-modal');
      }
    });
  },
};
</script>
<style>
.vue-star-rating {
  display: block !important;
}
</style>
