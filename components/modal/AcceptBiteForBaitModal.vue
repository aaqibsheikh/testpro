<template>
  <!-- accept-bite-for-bait-modal -->
  <modal
    id="accept-bite-for-bait-modal"
    v-cloak
    class="accept-bite-for-bait-modal"
  >
    <div slot="body" class="text-center px-10 py-10">
      <div class="font-bold text-xl text-baits-blue">
        Accept the bite?
        <br /><br />
      </div>
      <br />
      <div class="font-bold text-xl text-gray-700">
        Accepting this bite will move the bite to the "Open" tab and allow you
        to communicate with him/her.
        <br /><br />
        Continue?
        <br /><br />
      </div>
      <div class="text-center mt-8">
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full"
          @click="acceptBiteForBait"
        >
          Accept
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
      _acceptBiteForBait: 'baits/acceptBiteForBait',
      getPendingBaitsList: 'baits/getPendingBaitsList',
    }),
    acceptBiteForBait() {
      this.setLoader(true);
      this._acceptBiteForBait({ id: this.id, routeId: this.$route.params.id })
        .then((res) => {
          this.setLoader(false);
          if (res.data.result) {
            VoerroModal.hide('accept-bite-for-bait-modal');
            this.$toast.open({
              message: 'Bite accepted for bait',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
            this.getPendingBaitsList({
              pageNum: '',
              pageSize: '',
              id: this.$route.params.id,
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
.accept-bite-for-bait-modal > .modal-box {
  max-width: 50%;
}
</style>
