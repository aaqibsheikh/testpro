<template>
  <!-- Edit Promotion Modal -->
  <modal id="edit-promotion-modal" class="edit-promotion-modal">
    <div slot="body">
      <form @submit.prevent="editPromotion">
        <div class="flex flex-wrap justify-center bg-white pt-6 pb-4">
          <div class="md:w-4/5 w-full">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Title</label
                >
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  v-validate="'required'"
                  name="title"
                  v-model="promotion.title"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('title')">{{
                    errors.first('title')
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Description</label
                >
                <textarea
                  v-validate="'required'"
                  v-model="promotion.description"
                  name="description"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('description')">{{
                    errors.first('description')
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-1/2 mb-4 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Start Date</label
                >
                <date-picker
                  v-model="promotion.promoStartDate"
                  value-type="format"
                  format="D-MMM-YYYY"
                  placeholder="Start date"
                ></date-picker>
                <input
                  v-validate="'required'"
                  data-vv-as="start date"
                  name="startDate"
                  v-model="promotion.promoStartDate"
                  v-show="false"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('startDate')">{{
                    errors.first('startDate')
                  }}</span>
                </div>
              </div>
              <div class="w-1/2 mb-4 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >End Date</label
                >
                <date-picker
                  v-model="promotion.promoEndDate"
                  value-type="format"
                  format="D-MMM-YYYY"
                  placeholder="End date"
                ></date-picker>
                <input
                  v-validate="'required'"
                  data-vv-as="end date"
                  name="endDate"
                  v-model="promotion.promoEndDate"
                  v-show="false"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('endDate')">{{
                    errors.first('endDate')
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <button
                type="submit"
                class="w-full my-2 py-1 px-8 focus:outline-none rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import moment from 'moment';

export default {
  props: {
    promotion: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      user: 'profile/isUserProfile',
    }),
  },
  created() {
    window.VoerroModalEvent.$on('show', (optionsOrId, options) => {
      this.$validator.reset();
    });
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getPromotionListForAdmin: 'promotion/getPromotionListForAdmin',
    }),
    editPromotion() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setLoader(true);
          var api = `/promotion/${this.promotion.id}`;
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }

          const postData = {
            id: this.promotion.id,
            status: this.promotion.status,
            title: this.promotion.title,
            description: this.promotion.description,
            promoStartDate: moment(this.promotion.promoStartDate).unix(),
            promoEndDate: moment(this.promotion.promoEndDate).unix(),
          };

          this.$axios
            .post(api, postData)
            .then((response) => {
              if (response.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Promotion updated successfully',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
                // update promotion list
                this.getPromotionListForAdmin({
                  pageNum: '',
                  pageSize: '',
                });

                VoerroModal.hide('edit-promotion-modal');
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Failed to update promotion.',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
              }
            })
            .catch((error) => {
              this.setLoader(false);
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
<style>
.edit-promotion-modal > .modal-box {
  max-width: 50%;
}

input[type='date'],
.mx-input {
  height: 46px;
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight;
}

.mx-datepicker {
  @apply w-full;
}

.vs__dropdown-toggle {
  height: 46px;
  @apply bg-gray-200 text-gray-700 border border-gray-200;
}
</style>
