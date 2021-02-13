<template>
  <!-- feedback modal -->
  <modal id="feedback-modal" v-cloak class="feedback-modal">
    <div slot="body" class="lg:px-10 px-6 text-gray-700 text-base text-left">
      <div class="font-bold text-xl text-baits-blue text-center">
        Close the bite?
      </div>
      <br />
      <div>
        <p>
          Closing this bite will move the bite to the “Closed” tab and no
          further action will be available.
        </p>
        <br />
        <p>
          Has {{ name }} been helpful? <br />Would you like to leave a rating
          and feedback to help improve his/her services?
        </p>
      </div>
      <div class="flex flex-wrap mt-4 items-center">
        <div class="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/5 w-full mt-3">
          Outcome
        </div>
        <div class="xl:w-5/6 lg:w-4/5 md:w-3/4 sm:w-4/5 sm:pl-2 w-full">
          <v-select
            :options="outcomes"
            label="name"
            v-model="outcomeSelected"
            :clearable="false"
            v-validate="'required'"
            data-vv-name="outcome"
          >
            <template #search="{ attributes, events }">
              <input class="vs__search" v-bind="attributes" v-on="events" />
            </template>
          </v-select>
        </div>
      </div>
      <div
        class="flex flex-wrap mt-4 items-center"
        v-if="outcomeSelected === 'Transaction Approved'"
      >
        <div class="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/5 w-full mt-3">
          Transaction Id
        </div>
        <div class="xl:w-5/6 lg:w-4/5 md:w-3/4 sm:w-4/5 sm:pl-2 w-full">
          <input
            v-model="transactionId"
            name="transactionId"
            type="text"
            class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Transaction Id"
          />
        </div>
      </div>
      <div
        class="flex flex-wrap mt-4 items-center"
        v-if="
          outcomeSelected === 'Transaction Rejected' ||
          outcomeSelected === 'Others'
        "
      >
        <div class="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/5 w-full mt-3">
          Reason
        </div>
        <div class="xl:w-5/6 lg:w-4/5 md:w-3/4 sm:w-4/5 sm:pl-2 w-full">
          <input
            v-model="reason"
            v-validate
            name="reason"
            type="text"
            class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="please specify"
          />
        </div>
      </div>
      <div class="flex flex-wrap mt-4 items-center">
        <div class="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/5 w-1/4 mt-3">Rating</div>
        <div class="xl:w-5/6 lg:w-4/5 md:w-3/4 sm:w-4/5 w-3/4 pl-2">
          <star-rating
            :increment="0.5"
            :star-size="22"
            :show-rating="false"
            v-model="rating"
          ></star-rating>
        </div>
      </div>
      <div class="flex flex-wrap mt-2 items-center">
        <div class="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/5 w-full mt-3">
          Feedback
        </div>
        <div class="xl:w-5/6 lg:w-4/5 md:w-3/4 sm:w-4/5 sm:pl-2 w-full">
          <textarea
            v-validate="'required'"
            v-model="remarks"
            name="description"
            class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('description')">{{
              errors.first('description')
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="text-center mt-6 flex flex-wrap md:flex-row flex-col justify-around"
      >
        <button
          class="focus:outline-none bg-baits-green text-white font-bold py-1 xl:px-16 px-10 md:mb-0 mb-4 rounded-full"
          @click="sendFeedback"
        >
          Feedback
        </button>
        <button
          class="focus:outline-none bg-gray-400 text-white font-bold py-1 xl:px-16 px-10 rounded-full"
          @click="noFeedback"
        >
          No Feedback
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  props: ['name', 'responseId'],
  data() {
    return {
      remarks: null,
      rating: null,
      transactionId: null,
      reason: null,
      outcomes: [
        'Transaction Approved',
        'Transaction Rejected',
        'Working with someone else',
        'User not responsive',
        'Insufficient Documents',
        'Others',
      ],
      outcomeSelected: null,
    };
  },
  created() {
    window.VoerroModalEvent.$on('show', (optionsOrId, options) => {
      this.$validator.reset();
      this.rating = null;
      this.remarks = null;
    });
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      _sendFeedback: 'baits/sendFeedbackForBait',
      _noFeedback: 'baits/noFeedbackForBait',
      getOpenBaitsList: 'baits/getOpenBaitsList',
      getBaitsDetail: 'baits/getBaitsDetail',
    }),
    noFeedback() {
      const data = {
        routeId: this.$route.params.id,
        responseId: this.responseId,
      };

      this.setLoader(true);
      this._noFeedback(data)
        .then((res) => {
          if (res.data.result) {
            this.setLoader(false);
            this.$toast.open({
              message: 'Thanks...',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });

            this.rating = null;
            this.remarks = null;
            VoerroModal.hide('feedback-modal');
            this.getOpenBaitsList({
              pageNum: '',
              pageSize: '',
              id: this.$route.params.id,
            });
            this.getBaitsDetail(this.$route.params.id);
          } else {
            this.setLoader(false);
            this.$toast.open({
              message: 'Something is wrong...!',
              type: 'error',
              duration: 5000,
              dismissible: true,
            });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Error...!',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },

    sendFeedback() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const data = {
            routeId: this.$route.params.id,
            remarks: this.remarks,
            responseId: this.responseId,
            rating: this.rating,
            outcome: this.outcomeSelected,
            transactionId: this.transactionId ?? '',
            reason: this.reason ?? '',
          };

          this.setLoader(true);
          this._sendFeedback(data)
            .then((res) => {
              if (res.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Feedback send',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });

                this.rating = null;
                this.remarks = null;
                VoerroModal.hide('feedback-modal');
                this.getOpenBaitsList({
                  pageNum: '',
                  pageSize: '',
                  id: this.$route.params.id,
                });
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Something is wrong...!',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
              }
            })
            .catch((error) => {
              this.setLoader(false);
              this.$toast.open({
                message: 'Error...!',
                type: 'error',
                duration: 5000,
                dismissible: true,
              });
            });
        }
      });
    },
  },
};
</script>
<style>
.feedback-modal > .modal-box {
  max-width: 50%;
}
</style>