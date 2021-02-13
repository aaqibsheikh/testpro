<template>
  <div class="w-full">
    <Header />
    <EditProviderProfile :biteProfile="providerProfile" :biteSettings="providerSettings" />
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
    await store.dispatch('profile/getProviderSettings');
    await store.dispatch('profile/getProviderProfile');
  },
  computed: {
    ...mapGetters({
      providerProfile: 'profile/isProviderProfile',
      providerSettings: 'profile/isProviderSettings',
    }),
    page() {
      return this.$route.query.e;
    },
  },
  methods: {},
};
</script>

<style scoped>
.title-color {
  color: #536577;
}

.breadcrumb li {
  position: relative;
  color: rgba(83, 101, 119, 0.7);
}

.active {
  color: unset;
  color: rgba(83, 101, 119, 1) !important;
}

.breadcrumb li::after {
  content: ' > ';
  position: absolute;
  top: 0;
  left: 105%;
}

.breadcrumb li:last-child::after {
  content: '';
}

.btn-save {
  background-color: #2fcc71;
  color: white;
  padding: 15px 21px;
  border-radius: 40px;
  line-height: 24px;
  width: 150px;
}

.user-avatar {
  width: 124px;
}
</style>
