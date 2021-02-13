<template>
  <div class="w-full">
    <Header />
    <div class="md:px-12 px-4 m-auto md:mt-16 sm:mt-8 mt-32">
      <div class="flex flex-wrap items-center">
        <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full">
          <button @click="$router.go(-1)" class="bg-baits-blue px-2 py-1 text-sm text-white rounded-md">Back</button>
        </div>
      </div>
      <form @submit.prevent="editPromotion">
        <div class="flex flex-wrap bg-white pt-6 pb-4">
          <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  v-validate="'required'"
                  name="title"
                  v-model="promotion.title"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('title')">{{ errors.first('title') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  v-validate="'required'"
                  v-model="promotion.description"
                  name="description"
                  @input="checkTextLimit()"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
                <p class="text-right text-xs">{{ textRemaining }}</p>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('description')">{{ errors.first('description') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Start &amp; End Date</label>
                <date-picker v-model="date" value-type="format" format="D-MMM-YYYY" range placeholder="Select Start & End date"></date-picker>
                <input v-validate="'required'" name="date" v-model="date" v-show="false" />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('date')">{{ errors.first('date') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Status</label>
                <v-select v-model="initStatus" :options="status" label="text" :clearable="false" v-validate="'required'" name="status">
                  <template #search="{ attributes, events }">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                  </template>
                </v-select>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('status')">{{ errors.first('status') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center justify-center -mx-2">
              <button
                type="submit"
                class="my-2 py-1 px-8 focus:outline-none rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import Header from '@/components/dashboard/Header';

export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  data() {
    return {
      textLimit: 300,
      textRemaining: 300,
      date: [],
      status: [
        { text: 'Pending', value: 1 },
        { text: 'Approved', value: 2 },
        { text: 'Rejected', value: 3 },
      ],
      initStatus: {},
    };
  },
  async fetch({ store, params }) {
    await store.dispatch('promotion/getPromotionDetailById', {
      id: params.id,
    });
  },
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
    }),
  },
  mounted() {
    this.checkTextLimit();
    this.setStatus();
    this.date.push(moment.unix(this.promotion.promoStartDate).format('D-MMM-YYYY'));
    this.date.push(moment.unix(this.promotion.promoEndDate).format('D-MMM-YYYY'));
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    setStatus() {
      this.status.find((item) => {
        if (item.text === this.promotion.status) this.initStatus = item;
      });
    },
    checkTextLimit() {
      if (this.promotion.hasOwnProperty('description')) {
        if (this.promotion.description.length >= this.textLimit) {
          this.promotion.description = this.promotion.description.substring(0, this.textLimit);
        }
        this.textRemaining = this.textLimit - this.promotion.description.length;
      }
    },
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
            status: this.initStatus.value,
            title: this.promotion.title,
            description: this.promotion.description,
            promoStartDate: moment(this.date[0]).unix(),
            promoEndDate: moment(this.date[1]).unix(),
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
<style scoped>
button:focus {
  outline: none;
}

.info {
  min-width: 100%;
}

input[type='file'] {
  width: 4%;
  visibility: hidden;
}

@media (max-width: 960px) {
  .edit-info {
    flex-direction: column;
  }

  .edit-info > .col1 {
    width: 100%;
  }
}

@media (max-width: 620px) {
  .p-16 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

#previewImage {
  height: 15em;
}
input[type='date'],
.mx-input {
  height: 46px;
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight;
}

.mx-datepicker {
  @apply w-full;
}
</style>
