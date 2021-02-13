<template>
  <div class="w-full">
    <Header />
    <EditGeneralProfile
      v-if="page === 'generalProfile'"
      :user="user"
      :userProfile="userProfile"
      :biteProfile="biteProfile"
      :baitSettings="baitSettings"
      :biteSettings="biteSettings"
    />

    <EditProviderProfile
      v-if="page === 'providerProfile'"
      :user="user"
      :userProfile="userProfile"
      :biteProfile="biteProfile"
      :baitSettings="baitSettings"
      :biteSettings="biteSettings"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import EditGeneralProfile from '@/components/dashboard/EditGeneralProfile';
import EditProviderProfile from '@/components/dashboard/EditProviderProfile';
export default {
  layout: 'dashboard',
  components: {
    Header,
    EditGeneralProfile,
    EditProviderProfile,
  },
  async fetch({ app, params, store }) {
    if (store.state.user.user.hasOwnProperty('roles') && store.state.user.user.roles.includes('consumer')) {
      await store.dispatch('baits/getBaitsSettings');
      await store.dispatch('baits/getBaitProfile');
    }
    await store.dispatch('profile/getUserProfile');
    if (store.state.user.user.hasOwnProperty('roles') && store.state.user.user.roles.includes('provider')) {
      await store.dispatch('bite/getBiteSettings');
      await store.dispatch('bite/getBiteProfile');
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      tab: 'profile/getActiveTab',
      userProfile: 'profile/isUserProfile',
      biteProfile: 'bite/isBiteProfile',
      baitSettings: 'baits/isBaitSettings',
      biteSettings: 'bite/isBiteSettings',
    }),
    page() {
      return this.$route.query.e;
    },
  },
  methods: {},
};
</script>