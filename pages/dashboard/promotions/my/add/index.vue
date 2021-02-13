<template>
  <div class="w-full">
    <Header />
    <div class="md:px-12 px-4 m-auto md:mt-16 sm:mt-8 mt-32">
      <div class="flex flex-wrap">
        <button
          @click="$router.go(-1)"
          class="bg-baits-blue px-2 py-1 text-sm text-white rounded-md"
        >Back</button>
      </div>
      <form>
        <div class="flex flex-wrap bg-white p-4 mt-2 rounded-sm">
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
                  <span
                    class="caption"
                    v-if="errors.has('description')"
                  >{{ errors.first('description') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label
                  class="block tracking-wide text-gray-700 text-sm font-bold"
                >Promotion Images (Up to 5 images)</label>
                <label class="text-gray-700 text-xs mb-2">Recommended image size: 400px x 300px</label>
                <client-only>
                  <image-uploader
                    :maxWidth="500"
                    :maxHeight="400"
                    style="display: none;"
                    id="promo_picture"
                    accept="image/*"
                    :preview="false"
                    doNotResize="gif"
                    outputFormat="verbose"
                    @input="selectFile"
                  ></image-uploader>
                </client-only>
                <!-- Disable file input field if status is verfied otherwise enable it -->
                <div
                  @click="openFileSelectionBox"
                  class="cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <div v-for="(image, key) in images" :key="key" class="inline-block h-32 relative">
                    <span @click.stop.prevent="removeSelectedImage(image.name)" class="remove-btn"></span>
                    <img :ref="'image'" class="inline-block mr-2 h-32 pb-2" />
                  </div>
                  <p v-if="images.length === 0" class="py-4">Click to upload image</p>
                </div>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="imageError">The image field is required</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label
                  class="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                >Start &amp; End Date</label>
                <date-picker
                  v-model="promotion.date"
                  value-type="format"
                  format="D-MMM-YYYY"
                  range
                  placeholder="Select Start & End date"
                ></date-picker>
                <input v-validate="'required'" name="date" v-model="promotion.date" v-show="false" />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('date')">{{ errors.first('date') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap justify-around">
              <button
                @click="createPromotion"
                type="button"
                class="my-2 py-1 px-8 focus:outline-none rounded-full bg-baits-blue text-white font-bold text-lg"
              >Create</button>
              <button
                @click="previewPromotion"
                type="button"
                class="my-2 py-1 px-8 focus:outline-none rounded-full bg-baits-green text-white font-bold text-lg"
              >Preview</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <PromoDetailModal v-if="isDomReady" :detail="previewPromotionObj" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import Header from '@/components/dashboard/Header';
import PromoDetailModal from '@/components/modal/PromoDetailModal';

export default {
  layout: 'dashboard',
  components: {
    Header,
    PromoDetailModal,
  },
  data() {
    return {
      isDomReady: false,
      promotion: {
        title: '',
        description: '',
        date: null,
      },
      previewPromotionObj: {
        title: '',
        description: '',
        date: null,
      },
      images: [],
      imageError: false,
      textLimit: 300,
      textRemaining: 300,
    };
  },
  mounted() {
    this.checkTextLimit();
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    resetPromotion() {
      this.promotion = {};
      this.images = [];
      this.$validator.reset();
    },
    removeSelectedImage(name) {
      this.images = this.images.filter((image) => {
        if (image.name !== name) {
          return image;
        }
      });

      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.images[i]);
      }
    },
    openFileSelectionBox() {
      document.getElementById('promo_picture').click();
    },
    checkTextLimit() {
      if (this.promotion.hasOwnProperty('description')) {
        if (this.promotion.description.length >= this.textLimit) {
          this.promotion.description = this.promotion.description.substring(
            0,
            this.textLimit,
          );
        }
        this.textRemaining = this.textLimit - this.promotion.description.length;
      }
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
    selectFile(file) {
      if (file.type === 'application/pdf') {
        this.$toast.open({
          message: 'File type not supported',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;

        // var newFile = file;
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

      if (this.images.length < 5) {
        this.images.push(newFile);
        this.imageError = false;
      } else {
        this.$toast.open({
          message: 'You cannot select more than 5 files',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }
      // preview selected images
      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.images[i]);
      }
    },
    previewPromotion() {
      // if (this.images.length === 0) {
      //   this.imageError = true;
      // }

      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.images.length === 0) {
            return;
          } else {
            this.imageError = false;
          }
          this.previewPromotionObj.title = this.promotion.title;
          this.previewPromotionObj.description = this.promotion.description;
          this.previewPromotionObj.images = this.images;
          this.previewPromotionObj.promoStartDate = this.promotion.date[0];
          this.previewPromotionObj.promoEndDate = this.promotion.date[1];
          this.isDomReady = true;
          this.$nextTick(() => {
            VoerroModal.show('promo-detail-modal');
          });
        }
      });
    },
    async createPromotion() {
      if (this.images.length === 0) {
        this.imageError = true;
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.images.length === 0) {
            return;
          } else {
            this.imageError = false;
          }

          this.setLoader(true);

          // save promotion banner images
          let promises = [];
          let imagesId = [];
          if (this.images.length <= 5) {
            for (let i = 0; i < this.images.length; i++) {
              const formData = new FormData();
              formData.append('file', this.images[i]);
              var api = '/promotion/banner/upload';
              if (process.env.API_PROXY === '1' && process.client) {
                api = '/api' + api;
              }
              promises.push(
                this.$axios
                  .post(api, formData, {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get(
                        'baitsToken',
                      )}`,
                    },
                  })
                  .then(async (res) => {
                    if (res.data.result) {
                      imagesId.push(res.data.data.id);
                    }
                  }),
              );
            }
          }

          Promise.all(promises).then(async () => {
            var api = '/promotion';
            if (process.env.API_PROXY === '1' && process.client) {
              api = '/api' + api;
            }

            const postData = {
              title: this.promotion.title,
              description: this.promotion.description,
              documents: imagesId,
              promoStartDate: moment(this.promotion.date[0]).unix(),
              promoEndDate: moment(this.promotion.date[1]).unix(),
            };

            this.$axios
              .post(api, postData)
              .then((response) => {
                if (response.data.result) {
                  this.setLoader(false);
                  this.$toast.open({
                    message: 'Promotion created successfully',
                    type: 'success',
                    duration: 5000,
                    dismissible: true,
                  });

                  this.resetPromotion();
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

.remove-btn {
  cursor: pointer;
  color: white;
  border: 1px solid #aeaeae;
  border-radius: 30px;
  background: #605f61;
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  line-height: 0px;
  padding: 8px 3px;
  position: absolute;
  right: 5px;
}

.remove-btn:before {
  content: '×';
}
</style>
