<template>
  <!-- confirm-reject-blog-modal -->
  <modal
    id="confirm-reject-blog-modal"
    v-cloak
    class="confirm-reject-blog-modal"
  >
    <div slot="body" class="px-10">
      <div class="font-bold text-xl text-baits-blue text-center">
        Do you want to reject blog?
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
          @click="rejectBlog"
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
      _rejectBlog: 'blog/rejectBlog',
    }),

    rejectBlog() {
      // this.setLoader(true);
      const data = {
        comment: [this.description],
        id: this.$route.params.id,
      };

      this._rejectBlog(data)
        .then((res) => {
          this.setLoader(false);
          this.description = null;
          if (res.data.result) {
            VoerroModal.hide('confirm-reject-blog-modal');
            this.$toast.open({
              message: 'Blog Rejected',
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
.confirm-reject-blog-modal > .modal-box {
  max-width: 50%;
}
</style>