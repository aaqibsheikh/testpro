<template>
  <div class="w-full">
    <Header />
    <div class="w-full md:px-12 px-4 m-auto md:mt-16 sm:mt-8 mt-32">
      <div class="flex flex-wrap mb-6">
        <template>
          <a
            @click="toggleTab('profile')"
            href="javascript:void(0)"
            :class="[tab === 'profile' ? 'text-baits-green' : 'text-gray-600']"
            class="block py-0 md:text-xl text-base font-bold pr-2 border-r-2 border-gray-600"
            >Profile</a
          >
          <a
            v-if="
              user.hasOwnProperty('roles') && user.roles.includes('consumer')
            "
            @click="toggleTab('baitProfile')"
            href="javascript:void(0)"
            :class="[
              tab === 'baitProfile' ? 'text-baits-green' : 'text-gray-600',
              user.roles.includes('provider') ? 'border-r-2' : '',
            ]"
            class="block py-0 md:text-xl text-base font-bold pl-2 pr-2 border-gray-600"
            >Baits Profile</a
          >
          <a
            v-if="
              user.hasOwnProperty('roles') && user.roles.includes('provider')
            "
            @click="toggleTab('biteProfile')"
            href="javascript:void(0)"
            :class="[
              tab === 'biteProfile' ? 'text-baits-green' : 'text-gray-600',
            ]"
            class="block py-0 md:text-xl text-base font-bold pl-2"
            >Bites Profile</a
          >
        </template>
      </div>
      <div v-if="tab === 'profile'">
        <ProfileForm />
      </div>
      <div
        v-if="tab === 'biteProfile' && (user.hasOwnProperty('roles') && user.roles.includes('provider'))"
      >
        <BiteProfileForm />
      </div>
      <div
        v-if="tab === 'baitProfile' && (user.hasOwnProperty('roles') && user.roles.includes('consumer'))"
      >
        <BaitProfileForm />
      </div>
      <!--  -->
      <!-- Bite Modal -->
      <!--  -->
      <BiteProfileModal v-if="cloak">
        <template v-slot:content>
          <template v-if="!biteRequestSent && !isHideAfterConfirm">
            <p class="font-bold text-xl text-center text-baits-gray-dark pb-10">
              You currently do not have a
              <span class="text-baits-blue">Bite</span> profile, Whould you like
              to apply to be one of our service provider?
            </p>
            <p class="font-bold text-xl text-center text-baits-gray-dark pb-10">
              Click "Confirm" to proceed?
            </p>
            <div class="text-center">
              <button
                class="btn py-2 px-12 rounded-full border-2 border-baits-green bg-baits-green text-white font-bold text-xl m-auto"
                @click="confirm"
              >
                Confirm
              </button>
            </div>
          </template>
          <template v-if="biteRequestSent && !isHideAfterConfirm">
            <p class="font-bold text-xl text-center text-baits-gray-dark pb-10">
              Thank you for applying to be a service provider. Your
              <span class="text-baits-blue">Bite</span> profile will be unlock
              once your application is approved.
            </p>
            <div class="text-center">
              <button
                class="btn py-2 px-12 rounded-full border-2 border-baits-green bg-baits-green text-white font-bold text-xl m-auto"
                @click="hideAfterConfirm"
              >
                Ok
              </button>
            </div>
          </template>
          <template v-if="biteRequestSent && isHideAfterConfirm">
            <p class="font-bold text-xl text-center text-baits-gray-dark">
              Unable to unlock
              <span class="text-baits-blue">Bite</span> profile.
            </p>
            <p class="font-bold text-xl text-center text-baits-gray-dark pb-10">
              Your application is still under review.
            </p>
            <div class="text-center">
              <button
                class="btn py-2 px-12 rounded-full border-2 border-baits-green bg-baits-green text-white font-bold text-xl m-auto"
                @click="hide"
              >
                Ok
              </button>
            </div>
          </template>
        </template>
      </BiteProfileModal>
      <!--  -->
      <!--  -->
      <!--  -->
    </div>
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import ProfileForm from '@/components/dashboard/ProfileForm';
import BiteProfileForm from '@/components/dashboard/BiteProfileForm';
import BaitProfileForm from '@/components/dashboard/BaitProfileForm';
import BiteProfileModal from '@/components/modal/BiteProfileModal';
import { mapGetters, mapMutations } from 'vuex';
export default {
  layout: 'dashboard',
  components: {
    Header,
    ProfileForm,
    BiteProfileForm,
    BiteProfileModal,
    BaitProfileForm,
  },
  data() {
    return {
      biteRequestSent: false,
      isHideAfterConfirm: false,
      cloak: false,
    };
  },
  async fetch({ app, params, store }) {
    if (
      store.state.user.user.hasOwnProperty('roles') &&
      store.state.user.user.roles.includes('consumer')
    ) {
      await store.dispatch('baits/getBaitsSettings');
      await store.dispatch('baits/getBaitProfile');
    }
    await store.dispatch('profile/getUserProfile');
    if (
      store.state.user.user.hasOwnProperty('roles') &&
      store.state.user.user.roles.includes('provider')
    ) {
      await store.dispatch('bite/getBiteSettings');
      await store.dispatch('bite/getBiteProfile');
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      tab: 'profile/getActiveTab',
    }),
  },
  mounted() {
    this.cloak = true;
    if (this.$route.query.tab == undefined) {
      this.toggleTab('profile');
    }

    if (this.$route.query.tab == 'bait') {
      this.toggleTab('baitProfile');
    }

    if (this.$route.query.tab == 'bite') {
      this.toggleTab('biteProfile');
    }
  },
  methods: {
    ...mapMutations({
      setTab: 'profile/setTab',
    }),

    toggleTab(tab) {
      this.setTab(tab);
    },
    show() {
      VoerroModal.show('bite-profile-modal');
    },
    hide() {
      VoerroModal.hide('bite-profile-modal');
    },
    hideAfterConfirm() {
      this.hide();
      this.isHideAfterConfirm = true;
    },
    confirm() {
      this.biteRequestSent = true;
    },
  },
};
</script>
