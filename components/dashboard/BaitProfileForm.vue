<template>
  <div class="w-full lg:w-8/12">
    <h3 class="text-gray-700 text-xl font-bold mb-3">Personal Details</h3>
    <div class="border border-gray-400 px-6 pt-6 rounded">
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Gender</label>
          <div class="relative">
            <select
              v-validate="'required'"
              v-model="baitProfile.gender"
              name="gender"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('gender')">
              {{ errors.first('gender') }}
            </span>
          </div>
        </div>
        <!--  -->
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <date-picker
            :disabled-date="disableDataAfterToday"
            v-model="baitProfile.dateOfBirth"
            value-type="format"
            format="D-MMM-YYYY"
            placeholder="Select date"
          ></date-picker>
          <input v-validate="'required'" name="dateOfBirth" data-vv-as="date of birth" v-model="baitProfile.dateOfBirth" v-show="false" />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('dateOfBirth')">
              {{ errors.first('dateOfBirth') }}
            </span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Nationality</label>
          <div class="relative">
            <v-select :options="baitSettings.citizen" label="name" v-model="baitProfile.nationality" v-validate="'required'" data-vv-name="nationality">
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('nationality')">
              {{ errors.first('nationality') }}
            </span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Residing Country</label>
          <div class="relative">
            <v-select :options="baitSettings.country" label="name" v-model="baitProfile.country" v-validate="'required'" data-vv-name="country">
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('country')">
              {{ errors.first('country') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <h3 class="text-gray-700 text-xl font-bold my-3">Employment Status</h3>
    <div class="border border-gray-400 px-6 pt-6 rounded mb-3">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Industry</label>
          <div class="relative">
            <v-select :options="baitSettings.industry" label="name" v-model="baitProfile.industry" v-validate="'required'" data-vv-name="industry">
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('industry')">
              {{ errors.first('industry') }}
            </span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <input
            v-validate="'required'"
            v-model="baitProfile.companyName"
            data-vv-as="company name"
            name="companyName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('companyName')">
              {{ errors.first('companyName') }}
            </span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Designation</label>
          <input
            v-validate="'required'"
            v-model="baitProfile.designation"
            name="designation"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('designation')">
              {{ errors.first('designation') }}
            </span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">I am a</label>
          <div class="relative">
            <select
              v-validate="'required'"
              v-model="baitProfile.employmentStatus"
              name="employmentStatus"
              data-vv-as="employment status"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option>Employee</option>
              <option>Business Owner</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="validate-error-msg">
            <span class="caption" v-if="errors.has('employmentStatus')">
              {{ errors.first('employmentStatus') }}
            </span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if="baitProfile.employmentStatus === 'Business Owner'">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Date of Establishment (For Business Owner)</label>
          <date-picker
            :disabled-date="disableDataAfterToday"
            v-model="baitProfile.companyDateEstablishment"
            value-type="format"
            format="D-MMM-YYYY"
            placeholder="Select date"
          ></date-picker>
          <input
            v-validate="'required'"
            data-vv-as="date of establishment"
            name="companyDateEstablishment"
            v-model="baitProfile.companyDateEstablishment"
            v-show="false"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('companyDateEstablishment')">{{ errors.first('companyDateEstablishment') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if="baitProfile.employmentStatus === 'Employee'">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Date of Employment (For employee)</label>
          <date-picker
            :disabled-date="disableDataAfterToday"
            v-model="baitProfile.dateOfEmployment"
            value-type="format"
            format="D-MMM-YYYY"
            placeholder="Select date"
          ></date-picker>
          <input v-validate="'required'" name="dateOfEmployment" data-vv-as="date of joined" v-model="baitProfile.dateOfEmployment" v-show="false" />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('dateOfEmployment')">
              {{ errors.first('dateOfEmployment') }}
            </span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0"></div>
      </div>
    </div>
    <!--  -->
    <div class="flex mb-20">
      <button
        class="focus:outline-none btn py-1 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="show"
        v-if="baitProfile.status == 'new'"
      >
        Setup
      </button>
      <button
        class="focus:outline-none btn py-1 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="baitsProfileSave"
        v-if="baitProfile.status == 'pending'"
      >
        Pending
      </button>
      <button
        class="focus:outline-none btn py-1 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="baitsProfileSave"
        v-if="baitProfile.status == 'verified'"
      >
        Save
      </button>
    </div>
    <!--  -->
    <PopupMessageModal>
      <template v-slot:content v-if="baitProfile.status == 'verified'">
        <div class="text-xl font-bold text-center">
          <div>
            Your
            <span class="text-baits-blue">Profile</span> is setup!
          </div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="hide">Ok</button>
        </div>
      </template>
      <template v-slot:content v-else>
        <div class="text-lg font-bold text-center">
          <div>
            Kindly make sure your information provided is correct before you setup your
            <span class="text-baits-blue">Profile</span> ?
          </div>
          <div class="mt-8">Click “Confirm” to proceed?</div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="baitsProfileSave">Confirm</button>
        </div>
      </template>
    </PopupMessageModal>
    <OptionalEditBaitsProfileModal />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PopupMessageModal from '@/components/common/PopupMessageModal';
import OptionalEditBaitsProfileModal from '@/components/modal/OptionalEditBaitsProfileModal';

import moment from 'moment';

const today = new Date();
today.setHours(0, 0, 0, 0);
export default {
  components: {
    PopupMessageModal,
    OptionalEditBaitsProfileModal,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      baitProfile: 'baits/isBaitProfile',
      baitSettings: 'baits/isBaitSettings',
    }),
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      saveBaitsProfile: 'baits/saveBaitsProfile',
      getBaitProfile: 'baits/getBaitProfile',
    }),
    disableDataAfterToday(date) {
      return date > today;
    },
    show() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          VoerroModal.show('popup-message-modal');
        }
      });
    },
    hide() {
      VoerroModal.hide('popup-message-modal');
      // if new user came first time, then rediret to baits list after profile setup
      this.$router.push('/dashboard/baits');
    },
    async baitsProfileSave() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          let country = '';
          let industry = '';
          let nationality = '';
          // check for industry on edit bait profile
          if (this.baitProfile.industry.hasOwnProperty('name')) industry = this.baitProfile.industry.name;
          else industry = this.baitProfile.industry;

          // check for industry on edit bait profile
          if (this.baitProfile.nationality.hasOwnProperty('name')) nationality = this.baitProfile.nationality.name;
          else nationality = this.baitProfile.nationality;

          // check for country on edit bait profile
          if (this.baitProfile.country.hasOwnProperty('name')) country = this.baitProfile.country.name;
          else country = this.baitProfile.country;

          let baitProfileData = {
            gender: this.baitProfile.gender,
            dateOfBirth: moment(this.baitProfile.dateOfBirth).unix(),
            companyDateEstablishment: this.baitProfile.employmentStatus === 'Business Owner' ? moment(this.baitProfile.companyDateEstablishment).unix() : 0,
            dateOfEmployment: this.baitProfile.employmentStatus === 'Employee' ? moment(this.baitProfile.dateOfEmployment).unix() : 0,
            companyName: this.baitProfile.companyName,
            employmentStatus: this.baitProfile.employmentStatus,
            country: country,
            industry: industry,
            nationality: nationality,
            designation: this.baitProfile.designation,
          };

          this.setLoader(true);
          const response = await this.saveBaitsProfile({
            data: baitProfileData,
          });
          if (response.status === 201) {
            if (this.baitProfile.status == 'verified') {
              // show updated message modal only if it is a verified account being updated
              VoerroModal.show('optional-edit-baits-profile-modal');
            }
            this.setLoader(false);
            this.baitProfile.status = response.data.data.status;
            this.getBaitProfile();
          }
        }
      });
    },
  },
};
</script>
<style>
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
