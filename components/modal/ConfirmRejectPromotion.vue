<template>
  <!-- confirm-reject-promotion-modal -->
  <modal
    id="confirm-reject-promotion-modal"
    v-cloak
    class="confirm-reject-promotion-modal"
  >
    <div slot="body" class="px-10">
      <div class="font-bold text-xl text-baits-blue text-center">
        Do you want to reject promotion?
      </div>
      <div class="text-base text-gray-700 text-left mt-3">Reason:</div>
      <div>
        <textarea
          v-model="description"
          name="description"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
      <div class="mt-6 text-center">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="rejectPromoition"
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
      _rejectPromotion: 'promotion/rejectPromotion',
    }),

    rejectPromoition() {
      // this.setLoader(true);
      const data = {
        comment: [this.description],
        id: this.$route.params.id,
      };

      this._rejectPromotion(data)
        .then((res) => {
          this.setLoader(false);
          this.description = null;
          if (res.data.result) {
            VoerroModal.hide('confirm-reject-promotion-modal');
            this.$toast.open({
              message: 'Promotion Rejected',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
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
.confirm-reject-promotion-modal > .modal-box {
  max-width: 50%;
}
</style>