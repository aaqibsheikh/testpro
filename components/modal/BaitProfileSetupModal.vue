<template>
  <!-- Confirm Email Modal -->
  <modal id="bait-profile-setup-modal" :dismissible="false" v-cloak class="bait-profile-setup-modal">
    <div slot="body" class="px-10 py-10" v-if="cloak === true">
      <div slot="body">
        <div class="font-bold text-lg text-gray-700">
          Kindly make sure your
          <span class="text-baits-blue">Profile</span> is setup before you can start to cast baits.
        </div>
        <div class="text-center mt-8">
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full" @click="goToBaitProfile">Ok</button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  data() {
    return {
      cloak: false,
    };
  },
  mounted() {
    this.cloak = true;
  },
  methods: {
    goToBaitProfile() {
      this.$router.push({ path: '/dashboard/profile/general' });
    },
  },
};
</script>
<style>
.bait-profile-setup-modal > .modal-box {
  max-width: 50%;
}
</style>
