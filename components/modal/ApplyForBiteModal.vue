<template>
  <!-- Apply for a bite modal -->
  <modal id="apply-for-bite-modal" v-cloak class="apply-for-bite-modal">
    <div slot="body" class="px-10">
      <div class="font-bold text-xl text-baits-blue text-center">
        Going for a Bite?
      </div>
      <br />
      <div class="text-xl font-bold text-gray-700 mb-1 text-left">
        Why not propose something to have a higher chance for a
        <span class="text-baits-blue">"Baitsbite"</span>?
      </div>
      <div class="text-base text-gray-700 text-left mt-3">
        Proposal (optional):
      </div>
      <div>
        <textarea
          v-model="description"
          name="description"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
      <div class="mt-5 text-sm text-gray-700 italic">
        <span class="text-baits-blue">1 baitsbite token</span> will be used up
        if your bite is accepted
      </div>
      <div class="text-center mt-6">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="openConfirmApplyForBiteModal"
        >
          Confirm
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  props: ['biteId'],
  data() {
    return {
      description: null,
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      goingForBite: 'bite/goingForBite',
      getPoolBitesList: 'bite/getPoolBitesList',
    }),
    openConfirmApplyForBiteModal() {
      this.setLoader(true);
      const data = {
        proposal: this.description,
        biteId: this.biteId,
      };
      this.goingForBite(data).then((response) => {
        VoerroModal.hide('apply-for-bite-modal');
        this.getPoolBitesList({ pageNum: '', pageSize: '' });
        VoerroModal.show('success-message-for-bite-the-bait-modal');
        this.description = null;
        this.setLoader(false);
        this.$toast.open({
          message: 'Bite Successfully!',
          type: 'success',
          duration: 5000,
          dismissible: true,
        });
      });
    },
  },
};
</script>
<style>
.apply-for-bite-modal > .modal-box {
  max-width: 50%;
}
</style>
