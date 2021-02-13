<template>
  <!-- close-bite-modal -->
  <modal id="close-bite-modal" v-cloak class="close-bite-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-baits-blue">
        Close the bite?
        <br /><br />
      </div>
      <br />
      <div class="font-bold text-xl text-gray-700">
        Closing the bite will move this bite to the "Closed" tab and no further
        action will be available.
        <br /><br />
        Continue?
        <br /><br />
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="closeBaitHandler"
        >
          Close Bait
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  props: ['biteId', 'responseId'],
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      closeBait: 'bite/closeBait',
      getOpenBitesList: 'bite/getOpenBitesList',
    }),
    closeBaitHandler() {
      this.setLoader(true);
      this.closeBait({ biteId: this.biteId, responseId: this.responseId }).then(
        (response) => {
          if (response.status === 201) {
            this.getOpenBitesList({ pageNum: '', pageSize: '' });
            VoerroModal.hide('close-bite-modal');
            this.setLoader(false);
            this.$toast.open({
              message: 'Bait close successfully!',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
          }
        },
      );
    },
  },
};
</script>
<style>
.close-bite-modal > .modal-box {
  max-width: 50%;
}
</style>
