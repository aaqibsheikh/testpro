<template>
  <div class="w-full">
    <Header />
    <div class="w-full px-12 m-auto sm:mt-12 md:mt-20 mt-32">
      <h2 class="font-bold text-3xl text-baits-blue">Settings</h2>
      <h3 class="text-xl mt-10 text-baits-blue">Login & Security</h3>
      <div class="mt-2">
        <div class="block py-2 text-gray-600 px-3 text-md cursor-pointer hover:text-baits-blue" @click="changeEmail">Change Email</div>
        <div class="block py-2 text-gray-600 px-3 text-md cursor-pointer hover:text-baits-blue" @click="changePassword">Change Password</div>
        <div class="block py-2 text-gray-600 px-3 text-md cursor-pointer hover:text-baits-blue" @click="changeMobileNo">Change Contact / Whatsapp</div>
      </div>
    </div>
    <ChangeEmailModal v-if="isDomReady" />
    <ChangeEmailConfirmationModal v-if="isDomReady" />
    <ChangePasswordModal v-if="isDomReady" />
    <ChangeMobileNumberModal v-if="isDomReady" />
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import ChangeEmailModal from '@/components/dashboard/settings/ChangeEmailModal';
import ChangeEmailConfirmationModal from '@/components/dashboard/settings/ChangeEmailConfirmationModal';
import ChangePasswordModal from '@/components/dashboard/settings/ChangePasswordModal';
import ChangeMobileNumberModal from '@/components/dashboard/settings/ChangeMobileNumberModal';

export default {
  layout: 'dashboard',
  components: {
    Header,
    ChangeEmailModal,
    ChangeEmailConfirmationModal,
    ChangePasswordModal,
    ChangeMobileNumberModal,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('profile/getUserProfile');
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    changeEmail() {
      VoerroModal.show('change-email-modal');
    },
    changePassword() {
      VoerroModal.show('change-password-modal');
    },
    changeMobileNo() {
      VoerroModal.show('change-mobile-number-modal');
    },
  },
};
</script>
