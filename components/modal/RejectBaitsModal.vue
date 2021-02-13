<template>
  <!-- reject-baits-modal -->
  <modal id="reject-baits-modal" v-cloak class="reject-baits-modal">
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-2xl text-baits-blue">
        Close the bait completely?
      </div>
      <div class="font-bold text-xl text-gray-700">
        Closing this bait will move this bait will close this case completely
        and move all bite (service providers) to the closed tab. If you wish to
        continue chatting with any of the bite, please click cancel.
        <br /><br />
        Continue?
      </div>
      <div class="text-center mt-4">
        <button
          class="focus:outline-none bg-baits-blue text-white font-bold py-1 px-16 rounded-full"
          @click="closeBaitsModal"
        >
          Close
        </button>
        <button
          class="focus:outline-none bg-gray-400 text-white font-bold py-1 px-16 rounded-full mt-2 sm:mt-0"
          @click="rejectBaits"
        >
          Cancel
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  props: ['id'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      _rejectBaits: 'baits/rejectBaits',
      getBaitsList: 'baits/getBaitsList',
    }),
    closeBaitsModal() {
      VoerroModal.hide('reject-baits-modal');
    },
    rejectBaits() {
      this.setLoader(true);
      this._rejectBaits({ id: this.id, routeId: this.$route.params.id })
        .then((res) => {
          this.setLoader(false);
          if (res.data.result) {
            VoerroModal.hide('reject-baits-modal');
            this.$toast.open({
              message: 'Bait rejected',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });

            this.getBaitsList({ pageNum: '', pageSize: '' });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Error',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
};
</script>
<style>
.reject-baits-modal > .modal-box {
  max-width: 50%;
}
</style>