<template>
  <div class="w-full pb-16">
    <Header />
    <nuxt-child />
    <!--  -->
    <PopupMessageModal dismissible="dismissible" v-if="isPopupMessageModalMounted">
      <template v-slot:content>
        <div class="text-lg font-bold text-center">
          <div class="font-bold text-lg text-gray-700">
            Kindly make sure your
            <span class="text-baits-blue">Provider Profile</span> is setup before you can receive Baits notification.
          </div>
          <div class="text-center mt-8">
            <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full" @click="goToBiteProfile">Ok</button>
          </div>
        </div>
      </template>
    </PopupMessageModal>
    <!--  -->
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PopupMessageModal from '@/components/common/PopupMessageModal';
export default {
  layout: 'dashboard',
  components: {
    Header,
    PopupMessageModal,
  },
  data() {
    return {
      dismissible: false,
      isPopupMessageModalMounted: false,
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('bite/getBitesDashboard');
  },
  computed: {
    ...mapGetters({
      bites: 'bite/getBitesDashboard',
    }),
  },
  mounted() {
    this.isPopupMessageModalMounted = true;

    // For hiding weird effect of modal on page refresh
    this.$nextTick(() => {
      if (this.bites.status === 'new') {
        VoerroModal.show('popup-message-modal');
      }
    });
  },
  methods: {
    goToBiteProfile() {
      this.$router.push({ path: '/dashboard/profile/provider' });
    },
  },
};
</script>
<style>
.vue-star-rating {
  display: block !important;
}
</style>
