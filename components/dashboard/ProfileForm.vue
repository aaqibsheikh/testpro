<template>
  <div class="w-full lg:w-8/12">
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">First Name</label>
        <input
          v-model="userProfile.firstName"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="First Name"
        />
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <input
          v-model="userProfile.lastName"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Last Name"
        />
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Contact No</label>
        <div class="flex items-center relative">
          <ContactExtension className="country_prefix_profile absolute l-p-1 bg-gray-200" :default="userProfile.mobilePrefix" :disabled="true" />
          <input
            disabled
            v-model="userProfile.mobile"
            class="border-l-none rounded-l-none cursor-not-allowed appearance-none flex-grow bg-gray-200 text-gray-700 border border-gray-200 rounded pl-2 py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 px-3 mt-0 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Email ID</label>
        <div class="relative">
          <input
            disabled
            v-model="userProfile.email"
            class="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Message By</label>
        <div class="relative">
          <select
            v-model="userProfile.messagePreference"
            name="messagePreference"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="Telegram">Telegram</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6" v-if="userProfile.messagePreference === 'WhatsApp'">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">WhatsApp Contact No</label>
        <input
          disabled
          name="waMobile"
          v-model="userProfile.waMobile"
          class="cursor-not-allowed appearance-none w-4/5 inline-block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder
        />
        <button
          class="focus:outline-none bg-baits-blue w-1/6 inline-block hover:bg-baits-blue border-baits-blue hover:border-baits-blue text-sm border-4 text-white ml-1 py-1 px-2 rounded"
          type="button"
          @click="goToWhatsapp(userProfile.waMobile, userProfile.firstName)"
        >
          Test
        </button>
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6" v-if="userProfile.messagePreference === 'telegram'">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Telegram Username</label>
        <input
          name="telegramUserId"
          v-model="userProfile.telegramUserId"
          v-validate="{
            required: userProfile.messagePreference === 'telegram',
          }"
          data-vv-as="Telegram Username"
          class="appearance-none w-4/5 inline-block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
        <button
          class="focus:outline-none bg-baits-blue w-1/6 inline-block hover:bg-baits-blue border-baits-blue hover:border-baits-blue text-sm border-4 text-white ml-1 py-1 px-2 rounded"
          type="button"
          @click="goToTelegram(userProfile.telegramUserId)"
        >
          Test
        </button>
        <div class="validate-error-msg text-red-500 text-sm">
          <span class="caption" v-if="errors.has('telegramUserId')">{{ errors.first('telegramUserId') }}</span>
        </div>
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6">
        <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Referral Code</label>
        <div class="relative">
          <input
            disabled
            v-model="userProfile.referralCode"
            class="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder
          />
        </div>
      </div>

      <div class="px-3 mb-6 text-baits-gray-dark text-sm italic">
        <span class="caption">Note: To change Contact, WhatsApp or Email, please use settings menu.</span>
      </div>

      <div class="w-full px-3 mb-6" v-if="userProfile.providerProfileStatus == 'na'">
        <input v-model="provider" id="become_customer" type="checkbox" name="become_customer" class="hidden" />
        <label for="become_customer" class="cursor-pointer">
          <span class="w-5 h-5 inline-block mr-1 border border-grey"></span>
          I would also like to apply for a
          <span class="text-baits-blue font-bold inline-block">Bite Profile</span>
          to bite.
        </label>
      </div>
      <!--  -->
      <div class="w-full px-3 mb-6" v-if="userProfile.consumerProfileStatus == 'na'">
        <input v-model="consumer" id="become_customer" type="checkbox" name="become_customer" class="hidden" />
        <label for="become_customer" class="cursor-pointer">
          <span class="w-5 h-5 inline-block mr-1 border border-grey"></span>
          I would also like to apply for a
          <span class="text-baits-blue font-bold inline-block">Baits Profile</span>
          to cast bait.
        </label>
      </div>
    </div>

    <div class="flex pl-2 pb-2">
      <button
        class="focus:outline-none btn py-2 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="addUserProfile"
      >
        Save
      </button>
    </div>
    <template v-if="isMounted">
      <PopupMessageModal v-if="userProfile.providerProfileStatus == 'na'">
        <template v-slot:content>
          <div class="text-lg font-bold text-center">
            <div>
              Are you sure you would like to apply for a
              <span class="text-baits-blue">Bite Profile</span> ?
            </div>
            <div class="mt-8">Click “Confirm” to proceed?</div>
            <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="createBiteProfile">Confirm</button>
          </div>
        </template>
      </PopupMessageModal>
      <PopupMessageModal v-if="userProfile.consumerProfileStatus == 'na'">
        <template v-slot:content>
          <div class="text-lg font-bold text-center">
            <div>
              Are you sure you would like to apply for a
              <span class="text-baits-blue inline-block">Baits Profile</span>?
            </div>
            <div class="mt-8">Click “Confirm” to proceed?</div>
            <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="createBaitsProfile">Confirm</button>
          </div>
        </template>
      </PopupMessageModal>
    </template>
  </div>
</template>
<script>
import PopupMessageModal from '@/components/common/PopupMessageModal';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import WaMobileMessageModal from '@/components/modal/WaMobileMessageModal';
import ContactExtension from '@/components/common/ContactExtension';

export default {
  layout: 'dashboard',
  components: {
    PopupMessageModal,
    WaMobileMessageModal,
    ContactExtension,
  },
  data() {
    return {
      provider: false,
      consumer: false,
      isMounted: false,
      //selectedExt: '',
      //messagePreference: 'telegram',
    };
  },

  computed: {
    ...mapGetters({
      userProfile: 'profile/isUserProfile',
      tab: 'profile/getActiveTab',
      user: 'user/getUser',
    }),
  },
  mounted() {
    this.isMounted = true;
    // this.messagePreference =
    //   this.userProfile.messagePreference === ''
    //     ? 'telegram'
    //     : this.userProfile.messagePreference;
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setTab: 'profile/setTab',
    }),
    ...mapActions({
      saveUserProfile: 'profile/saveUserProfile',
      getBiteProfile: 'bite/getBiteProfile',
      getBaitProfile: 'baits/getBaitProfile',
      getBaitsSettings: 'baits/getBaitsSettings',
      getBiteSettings: 'bite/getBiteSettings',
    }),
    // passExtensionHandler(val) {
    //   this.selectedExt = val;
    // },
    goToWhatsapp(number, firstName) {
      if (number === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    },
    goToTelegram(telegramUserId) {
      if (telegramUserId !== '') {
        window.open(`https://telegram.me/${telegramUserId}`, '_blank');
      }
    },
    show() {
      VoerroModal.show('bite-profile-modal');
    },
    hide() {
      VoerroModal.hide('bite-profile-modal');
    },
    async createBiteProfile() {
      await this.userProfileSave();
      //
      await this.getBiteSettings();
      await this.getBiteProfile();
      VoerroModal.hide('popup-message-modal');
      if (this.user.hasOwnProperty('roles') && !this.user.roles.includes('provider')) this.user.roles.push('provider');
      this.$router.push({ path: '/dashboard/profile', query: { tab: 'bite' } });
      this.setTab('biteProfile');
    },
    async createBaitsProfile() {
      await this.userProfileSave();
      //
      await this.getBaitsSettings();
      await this.getBaitProfile();

      VoerroModal.hide('popup-message-modal');
      if (this.user.hasOwnProperty('roles') && !this.user.roles.includes('consumer')) this.user.roles.push('consumer');
      this.$router.push({ path: '/dashboard/profile', query: { tab: 'bait' } });
      this.setTab('baitProfile');
    },
    async addUserProfile() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          if (this.provider || this.consumer) {
            VoerroModal.show('popup-message-modal');
          } else {
            this.userProfileSave();
          }
        }
      });
    },
    async userProfileSave() {
      let userProfileData = {
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        waMobile: this.userProfile.waMobile,
        application: [],
        messagePreference: this.userProfile.messagePreference,
        telegramUserId: this.userProfile.telegramUserId,
      };

      if (this.provider) {
        userProfileData.application = ['provider'];
      }

      if (this.consumer) {
        userProfileData.application = ['consumer'];
      }

      this.setLoader(true);
      const response = await this.saveUserProfile({ data: userProfileData });
      if (response.status === 201) {
        this.setLoader(false);
      }
    },
  },
};
</script>
<style scoped>
.l-p-1 {
  left: 0.5rem;
}

.position-right-2 {
  right: 1rem;
}
</style>
