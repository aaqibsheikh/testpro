<template>
  <!-- optional-edit-baits-profile-modal -->
  <modal id="optional-edit-baits-profile-modal" v-cloak class="optional-edit-baits-profile-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-gray-700">Your <span class="text-baits-blue">Profile</span> is updated! <br /><br /></div>
      <div class="text-center mt-8">
        <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full" @click="closeOptionalEditBaitsProfileModal">Ok</button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeOptionalEditBaitsProfileModal() {
      VoerroModal.hide('optional-edit-baits-profile-modal');
    },
  },
};
</script>
<style>
.optional-edit-baits-profile-modal > .modal-box {
  max-width: 50%;
}
</style>
