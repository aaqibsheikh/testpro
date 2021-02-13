<template>
  <!-- cast-draft-bait-modal -->
  <modal id="cast-draft-bait-modal" v-cloak class="cast-draft-bait-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-lg text-baits-blue">
        Congratulations
        <br /><br />
      </div>
      <br />
      <div class="font-bold text-lg text-gray-700">
        Your Bait has been successfully casted. You can cast additional baits
        using the "New Bait" button.
        <br /><br />
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-lg text-white font-bold py-1 px-16 rounded-full"
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
      VoerroModal.hide('cast-draft-bait-modal');
    },
  },
};
</script>
<style>
.cast-draft-bait-modal > .modal-box {
  max-width: 50%;
}
</style>
