<template>
  <!-- Update Mobile Number Modal -->
  <modal id="change-mobile-number-modal" v-cloak ref="change-mobile-number-modal">
    <div slot="title" class="sm:px-8">
      <h2 class="font-bold text-xl text-gray-700">Update Mobile / Whatsapp</h2>
    </div>
    <div slot="body" class="sm:px-8 text-gray-700">
      <form @submit.prevent="updateMobileNumber">
        <div class="flex flex-wrap items-center">
          <div class="md:w-1/2 w-full">
            <div class="my-4">
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">Current Mobile</label>
                <div class="flex items-center relative">
                  <ContactExtension className="country_prefix_profile" class="absolute l-p-1" :default="currentMobilePrefix" />
                  <!-- class="baits-input appearance-none block w-full py-1 pl-25 pr-6" -->
                  <input name="mobile" class="baits-input appearance-none block w-full py-1 pl-25 pr-6" type="text" :value="user.mobile" readonly />
                </div>
                <div class="px-3 mt-1 mb-6 md:mb-0 text-baits-gray-dark text-sm italic" v-if="!showWhatsappBox">
                  <span class="caption">
                    Click
                    <span @click="showWhatsappBox = true" class="text-baits-blue cursor-pointer">here</span>
                    if you have a different number for WhatsApp
                  </span>
                </div>
              </div>
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">New Mobile</label>
                <div class="flex items-center relative">
                  <ContactExtension
                    class="absolute l-p-1"
                    className="country_prefix_profile"
                    @passExtension="passMobileExtensionHandler"
                    :default="selectedMobilePrefix"
                  />
                  <input
                    class="baits-input appearance-none block w-full py-1 pl-25 pr-6"
                    type="tel"
                    name="newMobileNumber"
                    data-vv-as="mobile number"
                    ref="newMobileNumber"
                    v-validate="{
                      required: newWaMobile ? false : true,
                      regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                    }"
                    v-model="newMobileNumber"
                    placeholder=""
                  />
                </div>
                <div class="validate-error-msg text-sm italic">
                  <span class="caption" v-if="errors.has('newMobileNumber')">{{ errors.first('newMobileNumber') }}</span>
                </div>
                <!-- <div
                  class="validate-error-msg text-sm text-red-500 italic"
                  v-if="hasMobileExtError"
                >
                  <span class="caption">
                    The extension field is required
                  </span>
                </div> -->
              </div>
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">Confirm New Mobile</label>
                <div class="flex items-center relative">
                  <ContactExtension
                    class="absolute l-p-1"
                    className="country_prefix_profile"
                    @passExtension="passMobileExtensionHandler"
                    :default="selectedMobilePrefix"
                  />
                  <input
                    v-model="confirmNewMobileNumber"
                    v-validate="{
                      required: newWaMobile ? false : true,
                      regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      confirmed: newMobileNumber,
                    }"
                    data-vv-as="confirm mobile number"
                    name="confirmNewMobileNumber"
                    class="baits-input appearance-none block w-full py-1 pl-25 pr-6"
                    type="tel"
                    placeholder=""
                  />
                </div>
                <div class="validate-error-msg text-sm italic">
                  <span class="caption" v-if="errors.has('confirmNewMobileNumber')">{{ errors.first('confirmNewMobileNumber') }}</span>
                </div>
                <!-- <div
                  class="validate-error-msg text-sm text-red-500 italic"
                  v-if="hasMobileExtError"
                >
                  <span class="caption">
                    The extension field is required
                  </span>
                </div> -->
              </div>
            </div>
          </div>
          <div class="md:w-1/2 w-full" v-show="showWhatsappBox">
            <div class="my-4">
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">Current WhatsApp</label>
                <div class="flex items-center relative">
                  <ContactExtension class="absolute l-p-1" className="country_prefix_profile" :default="currentWaPrefix" />
                  <input
                    name="newMobileNumber"
                    class="baits-input appearance-none block w-full py-1 pl-25 pr-6"
                    type="number"
                    :value="user.waMobile"
                    readonly
                  />
                </div>
                <div class="px-3 mt-1 mb-6 md:mb-0 text-baits-gray-dark text-sm italic" :class="[!showWhatsappBox ? 'customNoteHeight' : '']">
                  <span class="caption"></span>
                </div>
              </div>
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">New WhatsApp</label>
                <div class="flex items-center relative">
                  <ContactExtension
                    class="absolute l-p-1"
                    className="country_prefix_profile"
                    @passExtension="passWaExtensionHandler"
                    :default="selectedWaPrefix"
                  />
                  <!-- class="appearance-none inline-block w-4/5 bg-gray-200 text-gray-700 border border-l-0 border-gray-200 rounded rounded-l-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" -->
                  <input
                    class="baits-input appearance-none block w-full py-1 pl-25 pr-16"
                    type="tel"
                    name="newWaMobile"
                    data-vv-as="mobile number"
                    ref="newWaMobile"
                    v-validate="{
                      required: newMobileNumber ? false : true,
                      decimal: true,
                      regex: /^(?:[1-9][0-9]*|0)$/,
                    }"
                    v-model="newWaMobile"
                  />
                  <button
                    class="absolute position-right-2 focus:outline-none bg-baits-blue inline-block hover:bg-baits-blue border-baits-blue hover:border-baits-blue border-4 text-white text-xs ml-1 px-1 rounded"
                    type="button"
                    @click="openWhatsapp()"
                  >
                    Test
                  </button>
                </div>
                <div class="validate-error-msg text-sm italic">
                  <span class="caption" v-if="errors.has('newWaMobile')">{{ errors.first('newWaMobile') }}</span>
                </div>
                <!-- <div
                  class="validate-error-msg text-sm text-red-500 italic"
                  v-if="hasWaExtError"
                >
                  <span class="caption">
                    The extension field is required
                  </span>
                </div> -->
              </div>
              <div class="pr-3 mb-4">
                <label class="block tracking-wide mb-2">Confirm New WhatsApp</label>
                <div class="flex items-center relative">
                  <ContactExtension
                    class="absolute l-p-1"
                    className="country_prefix_profile"
                    @passExtension="passWaExtensionHandler"
                    :default="selectedWaPrefix"
                  />
                  <input
                    v-model="confirmNewWaMobile"
                    v-validate="{
                      required: newMobileNumber ? false : true,
                      decimal: true,
                      regex: /^(?:[1-9][0-9]*|0)$/,
                      confirmed: newWaMobile,
                    }"
                    data-vv-as="confirm mobile number"
                    name="confirmNewWaMobile"
                    class="baits-input appearance-none block w-full py-1 pl-25 pr-6"
                    type="tel"
                  />
                </div>
                <div class="validate-error-msg text-sm italic">
                  <span class="caption" v-if="errors.has('confirmNewWaMobile')">{{ errors.first('confirmNewWaMobile') }}</span>
                </div>
                <!-- <div
                  class="validate-error-msg text-sm text-red-500 italic"
                  v-if="hasWaExtError"
                >
                  <span class="caption">
                    The extension field is required
                  </span>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="w-full block mb-2">
          <div class="px-3 mt-1 mb-6 md:mb-0 text-baits-gray-dark text-sm italic">
            <span class="caption">Notes:</span>
            <br />
            <span class="caption">1) For mobile number, please omit any space, - or ( ). Eg. 12345678</span>
            <br />
            <br />
            <span class="caption">2) The WhatsApp number will be automatically generated based on the current mobile</span>
            <!-- <br />
            <br />
            <span
              class="caption"
            >3) For Whatsapp number, please enter number omit space, +, - or ( ). Also omit 0 in front of country code or area code. Eg. 6512345678</span>-->
          </div>
          <p class="pt-3">
            <button type="submit" class="btn baits-btn baits-btn-blue px-12 py-1">Update</button>
          </p>
          <!-- <p class="pt-3">
            <button
              @click="openWhatsapp()"
              class="btn py-2 px-12 focus:outline-none rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl"
            >Test WhatsApp</button>
          </p>-->
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { convertToWhatsappFormat } from '@/services/index';
import ContactExtension from '@/components/common/ContactExtension';

export default {
  components: {
    ContactExtension,
  },
  data() {
    return {
      showWhatsappBox: false,
      newMobileNumber: '',
      confirmNewMobileNumber: '',
      newWaMobile: '',
      confirmNewWaMobile: '',
      currentMobilePrefix: '',
      selectedMobilePrefix: '',
      selectedMobileOption: '',
      currentWaPrefix: '',
      selectedWaPrefix: '',
      selectedWaOption: '',
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
    });
  },
  mounted() {
    if (this.user.waMobile !== '' && convertToWhatsappFormat(this.user.mobile) !== this.user.waMobile) {
      this.showWhatsappBox = true;
    }
    console.log('this.user.mobilePrefix', this.user.mobilePrefix);
    console.log('this.user.waPrefix', this.user.waPrefix);
    if (this.user.mobilePrefix) {
      this.currentMobilePrefix = this.user.mobilePrefix;
      this.selectedMobilePrefix = this.user.mobilePrefix;
    }
    if (this.user.waPrefix) {
      this.currentWaPrefix = this.user.waPrefix;
      this.selectedWaPrefix = this.user.waPrefix;
    } else {
      this.currentWaPrefix = this.user.mobilePrefix;
      this.selectedWaPrefix = this.user.mobilePrefix;
    }
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getUserProfile: 'profile/getUserProfile',
    }),
    passMobileExtensionHandler(val) {
      this.selectedMobileOption = val;
      this.selectedMobilePrefix = val.countryPrefix;
    },
    passWaExtensionHandler(val) {
      this.selectedWaOption = val;
      this.selectedWaPrefix = val.countryPrefix;
    },
    updateMobileNumber() {
      this.$validator.validateAll().then((result) => {
        if (result && !this.hasMobileExtError && !this.hasWaExtError) {
          this.setLoader(true);

          var api = '/user/updateMobile';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }
          const response = this.$axios
            .post(api, {
              newMobile: `${this.newMobileNumber}`,
              newMobilePrefix: `${this.selectedMobilePrefix}`,
              newWaMobile: `${this.newWaMobile}`,
              newWaMobilePrefix: `${this.selectedWaPrefix}`,
            })
            .then((res) => {
              if (res.data.result) {
                this.getUserProfile();
                this.setLoader(false);
                this.$toast.open({
                  message: 'Mobile number successfully updated',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });

                this.newMobileNumber = '';
                this.confirmNewMobileNumber = '';
                this.newWaMobile = '';
                this.confirmNewWaMobile = '';
                this.$validator.reset();
                // VoerroModal.hide('change-mobile-number-modal');
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Failed to update mobile number.',
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
    openWhatsapp() {
      var number = this.newWaMobile || convertToWhatsappFormat(this.newMobileNumber) || this.user.waMobile || convertToWhatsappFormat(this.user.mobile) || '';
      window.open(`https://wa.me/${number}`, '_blank');
    },
  },
};
</script>
<style scoped>
.l-p-1 {
  left: 0.5rem;
}

.pl-25 {
  padding-left: 6.5rem;
}

.position-right-2 {
  right: 1rem;
}
</style>
