<template>
  <!-- success-message-for-bite-the-bait-modal -->
  <modal
    id="success-message-for-bite-the-bait-modal"
    v-cloak
    class="success-message-for-bite-the-bait-modal"
  >
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-gray-700">
        Thank you for responding to the bait. Please wait for the customer to
        approve the connection. You will be notified via email once the customer
        approves the connection.
      </div>
      <div class="text-center mt-4">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="closeSucessForBiteTheBaitModal"
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
    closeSucessForBiteTheBaitModal() {
      VoerroModal.hide('success-message-for-bite-the-bait-modal');
    },
  },
};
</script>
<style>
.success-message-for-bite-the-bait-modal > .modal-box {
  max-width: 50%;
}
</style>