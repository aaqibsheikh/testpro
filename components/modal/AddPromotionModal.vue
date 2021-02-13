<template>
  <!-- Promotion Modal -->
  <modal id="promotion-modal" class="promotion-modal">
    <div slot="body">
      <form @submit.prevent="createPromotion">
        <div class="flex flex-wrap justify-center bg-white pt-6 pb-4">
          <div class="md:w-4/5 w-full">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  <span class="caption" v-if="errors.has('title')">
                    {{ errors.first('title') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Description</label
                >
                <textarea
                  v-validate="'required'"
                  v-model="promotion.description"
                  name="description"
                  @input="checkTextLimit()"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
                <p class="text-right text-xs">{{ textRemaining }}</p>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('description')">
                    {{ errors.first('description') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Promo Picture</label
                >
                <client-only>
                  <image-uploader
                    :maxWidth="1024"
                    :maxHeight="1024"
                    style="display: none"
                    id="promo_picture"
                    accept=".pdf, image/*"
                    :preview="false"
                    doNotResize="gif"
                    outputFormat="verbose"
                    @input="selectFile"
                  ></image-uploader>
                </client-only>
                <!-- Disable file input field if status is verfied otherwise enable it -->
                <div
                  @click="openFileSelectionBox"
                  class="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <svg
                    fill="#939393"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                  >
                    <path
                      d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
                    />
                  </svg>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="imageError"
                    >The image field is required</span
                  >
                </div>
                <div class="text-gray-700" v-if="!imageError && image">
                  {{ image.name }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-1/2 mb-4 px-2">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  <span class="caption" v-if="errors.has('startDate')">
                    {{ errors.first('startDate') }}
                  </span>
                </div>
              </div>
              <div class="w-1/2 mb-4 px-2">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  <span class="caption" v-if="errors.has('endDate')">
                    {{ errors.first('endDate') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <button
                type="submit"
                class="w-full my-2 py-1 px-8 focus:outline-none rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      promotion: {},
      image: null,
      imageError: false,
      textLimit: 200,
      textRemaining: 200,
    };
  },
  computed: {
    ...mapGetters({
      user: 'profile/isUserProfile',
    }),
  },
  created() {
    window.VoerroModalEvent.$on('show', (optionsOrId, options) => {
      this.$validator.reset();
      this.imageError = false;
    });
  },
  mounted() {
    this.checkTextLimit();
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    openFileSelectionBox() {
      document.getElementById('promo_picture').click();
    },
    checkTextLimit() {
      if (this.promotion.hasOwnProperty('description')) {
        if (this.promotion.description.length >= this.textLimitIntro) {
          this.promotion.description = this.promotion.description.substring(
            0,
            this.textLimitIntro,
          );
        }
        this.textRemaining = this.textLimit - this.promotion.description.length;
      }
    },
    selectFile(file) {
      if (file.type === 'application/pdf') {
        var newFile = file;
      } else {
        if (!file.hasOwnProperty('info')) {
          this.$toast.open({
            message: 'File type not supported',
            type: 'error',
            duration: 3000,
            dismissible: true,
          });
          return;
        }
        var newFile = this.dataURLtoFile(file.dataUrl, file.info.name);
      }
      if (newFile.size > 1000000) {
        this.$toast.open({
          message: 'File is too big!',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }

      this.image = newFile;
      this.imageError = false;
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    createPromotion() {
      if (this.image === null) {
        this.imageError = true;
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.image === null) {
            return;
          } else {
            this.imageError = false;
          }

          this.setLoader(true);
          var api = '/promotion';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }

          const postData = {
            title: this.promotion.title,
            description: this.promotion.description,
            // image: this.image,
            promoStartDate: moment(this.promotion.promoStartDate).unix(),
            promoEndDate: moment(this.promotion.promoEndDate).unix(),
          };

          this.$axios
            .post(api, postData)
            .then((response) => {
              if (response.data.result) {
                const promotionId = response.data.data.id;

                const formData = new FormData();
                formData.append('file', this.image);

                api = `/promotion/${promotionId}/banner`;
                if (process.env.API_PROXY === '1' && process.client) {
                  api = '/api' + api;
                }

                this.$axios
                  .post(api, formData, {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get(
                        'baitsToken',
                      )}`,
                    },
                  })
                  .then((res) => {
                    if (res.data.result) {
                      this.setLoader(false);
                      this.$toast.open({
                        message: 'Promotion created successfully',
                        type: 'success',
                        duration: 5000,
                        dismissible: true,
                      });
                      VoerroModal.hide('promotion-modal');
                    } else {
                      this.setLoader(false);
                      this.$toast.open({
                        message: 'Failed to create promotion.',
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
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Failed to create promotion.',
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
.promotion-modal > .modal-box {
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
