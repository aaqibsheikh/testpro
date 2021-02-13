<template>
  <!-- signup-success-modal -->
  <modal id="signup-success-modal" v-cloak class="signup-success-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-baits-blue">
        Welcome to Baitsbite!
        <br /><br />
      </div>
      <br />
      <div class="font-bold text-xl text-gray-700">
        Please check your email to verify your account
        <br /><br />
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="close"
        >
          Ok
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  methods: {
    close() {
      VoerroModal.hide('signup-success-modal');
    },
  },
};
</script>
<style>
.signup-success-modal > .modal-box {
  max-width: 50%;
}
</style>