<template>
  <div
    class="w-full lg:w-1/2 px-6 lg:pb-0 pb-4 lg:order-first order-last lg:shadow-none shadow-lg lg:mx-0 mx-4"
  >
    <h2 class="md:text-4xl text-3xl font-bold text-gray-800 text-left mt-10">
      Need help logging in?
    </h2>
    <p class="mt-5 pt-4 text-xl">Forgot your password?</p>
    <p class="text-xl text-baits-blue cursor-pointer" @click="resetEmail">
      Reset here
    </p>
    <p class="mt-5 text-xl mt-5">Don't have an account?</p>
    <p class="text-xl">
      <a
        href="javascript:void(0)"
        class="text-baits-blue"
        @click="onToggleTab('signup')"
        >Sign up now for free</a
      >
    </p>
    <p class="mt-5 text-xl mt-10">For more information please visit our</p>
    <p class="text-xl">
      <nuxt-link
        :to="{ path: '/how-it-works', hash: '#faq' }"
        class="text-baits-blue"
        >FAQ.</nuxt-link
      >
    </p>
    <div id="login">
      <ResetPasswordModal v-if="isDomReady" />
    </div>
  </div>
</template>
<script>
import ResetPasswordModal from '@/components/modal/ResetPasswordModal';
export default {
  components: {
    ResetPasswordModal,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    onToggleTab(tab) {
      this.$emit('onToggleTab', tab);
    },
    resetEmail() {
      VoerroModal.show('reset-password-modal');
    },
  },
};
</script>
