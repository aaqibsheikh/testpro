<template>
  <modal
    id="reject-pending-provider-modal"
    v-cloak
    class="reject-pending-provider-modal"
  >
    <div slot="body" class="px-10">
      <div class="font-bold text-xl text-baits-gray-dark text-center">
        Why is this
        <span class="text-baits-blue">Bite Profile</span> rejected? <br />This
        message will be sent to the user.
      </div>
      <br />
      <div class="flex flex-wrap pt-6">
        <div class="w-full">
          <div class="grid gap-6 md:grid-cols-2 grid-cols-1">
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="The image is not clear"
                name="q1"
                id="q1"
                class="hidden"
              />
              <label for="q1" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                The image is not clear
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="Missing a document"
                name="q2"
                id="q2"
                class="hidden"
              />
              <label for="q2" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                Missing a document
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="The image is not the required document"
                name="q3"
                id="q3"
                class="hidden"
              />
              <label for="q3" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                The image is not the required document
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="Other reason A"
                name="q4"
                id="q4"
                class="hidden"
              />
              <label for="q4" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                Other reason A
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="The email on the document does not match with work email in Bite profile."
                name="q5"
                id="q5"
                class="hidden"
              />
              <label for="q5" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                The email on the document does not match with work email in Bite
                profile.
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                v-model="selectCheckboxes"
                value="Other reason B"
                name="q6"
                id="q6"
                class="hidden"
              />
              <label for="q6" class="cursor-pointer">
                <span
                  class="w-5 h-5 inline-block mr-1 border border-grey"
                ></span>
                Other reason B
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex pt-6">
        <div class="w-full">
          <label class="text-xl text-baits-gray-dark">Additional remarks</label>
        </div>
      </div>
      <textarea
        class="border rounded focus:outline-none focus:shadow-outline mt-1 block w-full p-2"
        rows="5"
        v-model="remarksText"
      ></textarea>
      <div
        class="text-center mt-6 text-left flex flex-wrap md:flex-row flex-col justify-around"
      >
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 xl:px-16 px-10 md:mb-0 mb-4 rounded-full"
          @click="rejectPendingProviderHandler"
        >
          Reject
        </button>
        <button
          class="focus:outline-none bg-gray-400 text-white font-bold py-1 xl:px-16 px-10 rounded-full"
          @click="close"
        >
          Cancel
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
      remarksText: null,
      selectCheckboxes: [],
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      rejectPendingProvider: 'users/rejectPendingProvider',
    }),
    close() {
      VoerroModal.hide('reject-pending-provider-modal');
    },
    rejectPendingProviderHandler() {
      if (this.remarksText) {
        this.selectCheckboxes.push(this.remarksText);
      }

      this.setLoader(true);
      const data = {
        id: this.$route.params.id,
        comment: this.selectCheckboxes,
      };
      this.rejectPendingProvider(data)
        .then((response) => {
          VoerroModal.hide('reject-pending-provider-modal');
          this.remarksText = null;
          this.selectCheckboxes = [];
          this.setLoader(false);
          this.$toast.open({
            message: 'Reject pending provider Successfully!',
            type: 'success',
            duration: 5000,
            dismissible: true,
          });
          window.location.reload();
        })
        .catch((error) => {
          this.remarksText = null;
          this.selectCheckboxes = [];
          this.setLoader(false);
          VoerroModal.hide('reject-pending-provider-modal');
          this.$toast.open({
            message: 'Reject pending provider failed!',
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
.reject-pending-provider-modal > .modal-box {
  max-width: 50%;
}
</style>