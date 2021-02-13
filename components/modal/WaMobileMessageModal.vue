<template>
  <!-- wamobile-message-modal -->
  <modal id="wamobile-message-modal" v-cloak class="wamobile-message-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-lg text-gray-700">
        Messaging is not supported for this user
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  methods: {
    close() {
      VoerroModal.hide('wamobile-message-modal');
    },
  },
};
</script>
<style>
.wamobile-message-modal > .modal-box {
  max-width: 50%;
}
</style>