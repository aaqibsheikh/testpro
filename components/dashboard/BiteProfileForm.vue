<template>
  <div class="w-full lg:w-8/12">
    <h3 class="text-gray-700 text-xl font-bold mb-3">
      Work Details
      <template v-if="biteProfile.status === 'verified'">
        <font-awesome-icon :icon="['fas', 'edit']" class="float-right cursor-pointer w-4 h-4" @click="enableMandatoryFields" />
      </template>
      <template v-if="biteProfile.status === 'pending'">
        <font-awesome-icon :icon="['fas', 'edit']" class="float-right cursor-pointer w-4 h-4" />
      </template>
    </h3>
    <div class="border border-gray-400 px-6 pt-6 rounded" :class="[mandatoryFieldsDisabled === true ? 'bg-gray-100 cursor-not-allowed' : '']">
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Service Categories</label>
          <div class="relative">
            <v-select
              @input="
                switchCompany();
                compulsoryChange = true;
              "
              :clearable="false"
              :selectable="() => !mandatoryFieldsDisabled"
              :options="biteSettings.industry"
              label="name"
              v-model="biteProfile.industry"
              :reduce="(industry) => industry.name"
              v-validate="'required'"
              name="industry"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('industry')">{{ errors.first('industry') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Bank/Institution/Agency</label>
          <div class="relative">
            <v-select
              :clearable="false"
              @input="compulsoryChange = true"
              :selectable="() => !mandatoryFieldsDisabled"
              :options="companyList"
              label="name"
              v-model="biteProfile.companyName"
              :reduce="(company) => company.name"
              v-validate="'required'"
              data-vv-as="company name"
              name="companyName"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('companyName')">{{ errors.first('companyName') }}</span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Designation</label>
          <input
            :disabled="mandatoryFieldsDisabled"
            v-validate="'required'"
            v-model="biteProfile.designation"
            name="designation"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            @change="compulsoryChange = true"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('designation')">{{ errors.first('designation') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Work Email</label>
          <input
            :disabled="mandatoryFieldsDisabled"
            v-validate="'required|email'"
            v-model="biteProfile.workEmail"
            data-vv-as="work email"
            name="workEmail"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            @change="compulsoryChange = true"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('workEmail')">{{ errors.first('workEmail') }}</span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if="biteProfile.industry === 'Property'">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">CEA No</label>
          <input
            :disabled="mandatoryFieldsDisabled"
            v-validate="'required'"
            v-model="biteProfile.ceaNumber"
            name="ceaNumber"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            @change="compulsoryChange = true"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('ceaNumber')">{{ errors.first('ceaNumber') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Date Joined</label>
          <date-picker
            :disabled="mandatoryFieldsDisabled"
            :disabled-date="disableDataAfterToday"
            v-model="biteProfile.dateJoin"
            value-type="format"
            format="D-MMM-YYYY"
            placeholder="Select date"
            @change="compulsoryChange = true"
          ></date-picker>
          <input
            v-validate="'required'"
            data-vv-as="date of establishment"
            name="dateJoin"
            v-model="biteProfile.dateJoin"
            v-show="false"
            @change="compulsoryChange = true"
          />
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('dateJoin')">{{ errors.first('dateJoin') }}</span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Office Location</label>
          <div class="relative">
            <v-select
              :clearable="false"
              @input="compulsoryChange = true"
              :selectable="() => !mandatoryFieldsDisabled"
              :options="biteSettings.country"
              label="name"
              v-model="biteProfile.country"
              :reduce="(country) => country.name"
              v-validate="'required'"
              name="country"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('country')">{{ errors.first('country') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Name Card</label>
          <client-only>
            <image-uploader
              :maxWidth="1024"
              :maxHeight="1024"
              style="display: none"
              id="bite_file_upload"
              accept=".pdf, image/*"
              :preview="false"
              doNotResize="gif"
              outputFormat="verbose"
              @input="selectFile"
            ></image-uploader>
          </client-only>
          <!-- Disable file input field if status is verfied otherwise enable it -->
          <div
            v-if="!mandatoryFieldsDisabled"
            @click="openFileSelectionBox"
            class="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <svg fill="#939393" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
              <path
                d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
              />
            </svg>
          </div>
          <div
            v-else
            class="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <svg fill="#939393" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
              <path
                d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
              />
            </svg>
          </div>
          <!-------------------------------------------------------------------------------------------------->
          <div v-if="biteProfile.documents.length > 0">
            <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file, index) in biteProfile.documents" :key="index">
              <div class="text-lg text-baits-blue font-bold" @click="downloadDocument(file)">
                {{ file.fileName }}
              </div>
              <div v-if="!mandatoryFieldsDisabled" class="text-lg ml-4 font-bold text-gray-600" @click="removeSelectedFile(index, true)">X</div>
              <div v-else class="text-lg ml-4 font-bold text-gray-600">X</div>
            </div>
          </div>
          <div v-if="documents.length > 0">
            <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file, index) in documents" :key="index">
              <div class="text-lg text-baits-blue font-bold" @click="downloadDocument(file)">
                {{ file.name }}
              </div>
              <div v-if="!mandatoryFieldsDisabled" class="text-lg ml-4 font-bold text-gray-600" @click="removeSelectedFile(index, false)">X</div>
              <div v-else class="text-lg ml-4 font-bold text-gray-600">X</div>
            </div>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="documentsError">The document field is required</span>
          </div>
        </div>
      </div>
    </div>
    <h3 class="text-gray-700 text-xl font-bold my-3">About me</h3>
    <div class="border border-gray-400 px-6 pt-6 rounded">
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Introduction</label>
          <textarea
            v-validate="'required'"
            v-model="biteProfile.descIntro"
            data-vv-as="description"
            name="descIntro"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            @input="checkTextLimitIntro()"
            @change="optionalChange = true"
          ></textarea>
          <p class="text-right text-xs">{{ textRemainingIntro }}</p>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('descIntro')">{{ errors.first('descIntro') }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Skills & Expertise 1</label>
          <div class="relative">
            <v-select
              @input="optionalChange = true"
              :options="expertise1Filtered"
              label="specialisation"
              v-model="expertise1Comput"
              :reduce="(expertise) => expertise.specialisation"
              v-validate="'required'"
              name="expertise1"
              data-vv-as="expertise"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('expertise1')">{{ errors.first('expertise1') }}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Skills & Expertise 2</label>
          <div class="relative">
            <v-select
              @input="optionalChange = true"
              :options="expertise2Filtered"
              label="specialisation"
              v-model="expertise2Comput"
              :reduce="(expertise) => expertise.specialisation"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Skills & Expertise 3</label>
          <div class="relative">
            <v-select
              @input="optionalChange = true"
              :options="expertise3Filtered"
              label="specialisation"
              v-model="expertise3Comput"
              :reduce="(expertise) => expertise.specialisation"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Awards/ Accreditations / Achievements</label>
          <textarea
            v-validate="'required'"
            v-model="biteProfile.descAwards"
            name="descAwards"
            data-vv-as="description awards"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            @input="checkTextLimitAwards()"
            @change="optionalChange = true"
          ></textarea>
          <p class="text-right text-xs">{{ textRemainingAwards }}</p>
          <div class="validate-error-msg text-red-500 text-sm">
            <span class="caption" v-if="errors.has('descAwards')">{{ errors.first('descAwards') }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="validate-error-msg text-red-500 text-sm">
      <span class="caption" v-if="responseError">{{ responseError }}</span>
    </div>
    <div class="flex mb-20 mt-3">
      <button
        class="focus:outline-none btn py-2 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="show"
        v-if="biteProfile.status === 'new'"
      >
        Setup
      </button>
      <button
        class="focus:outline-none cursor-not-allowed btn py-2 px-12 rounded-full border-2 border-gray-400 bg-gray-400 text-white font-bold text-xl md:m-0 m-auto"
        @click="biteProfileSave"
        v-if="biteProfile.status === 'pending'"
      >
        Pending
      </button>
      <button
        class="focus:outline-none btn py-2 px-12 rounded-full border-2 border-baits-blue bg-baits-blue text-white font-bold text-xl md:m-0 m-auto"
        @click="showEditBiteProfileModal"
        v-if="biteProfile.status === 'verified'"
      >
        Save
      </button>
    </div>
    <!--  -->
    <PopupMessageModal v-if="isDomReady">
      <template v-slot:content v-if="biteProfile.status === 'new'">
        <div class="text-lg font-bold text-center">
          <div>
            Kindly make sure your information provided is correct before you setup your
            <span class="text-baits-blue">Provider Profile</span> ?
          </div>
          <div class="mt-8">Click “Confirm” to proceed?</div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="biteProfileSave">Confirm</button>
        </div>
      </template>
      <template v-slot:content v-else>
        <div class="text-xl font-bold text-center">
          <div class="text-2xl">Your Bites Profile has been submitted for approval!</div>
          <div class="mt-4">You will receive an email notification once your profile is approved.</div>
          <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="hide">Ok</button>
        </div>
      </template>
    </PopupMessageModal>
    <MandatoryFieldsEnableModal v-if="isDomReady" @handleMandatoryFieldsValue="onEnableMandatoryFields" />
    <ConfirmEditBitesProfileModal v-if="isDomReady" @handleEditMandatoryFieldsValue="onEditMandatoryFieldsValue" />
    <OptionalEditBitesProfileModal v-if="isDomReady" />
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PopupMessageModal from '@/components/common/PopupMessageModal';
import MandatoryFieldsEnableModal from '@/components/modal/MandatoryFieldsEnableModal';
import ConfirmEditBitesProfileModal from '@/components/modal/ConfirmEditBitesProfileModal';
import OptionalEditBitesProfileModal from '@/components/modal/OptionalEditBitesProfileModal';

const today = new Date();
today.setHours(0, 0, 0, 0);
export default {
  components: {
    PopupMessageModal,
    MandatoryFieldsEnableModal,
    ConfirmEditBitesProfileModal,
    OptionalEditBitesProfileModal,
  },
  data() {
    return {
      expertise1: null,
      expertise2: null,
      expertise3: null,
      documents: [],
      optionalChange: false,
      compulsoryChange: false,
      isDomReady: false,
      documentsError: false,
      mandatoryFieldsDisabled: false,
      companies: [],
      textLimitIntro: 3000,
      textRemainingIntro: 3000,
      textLimitAwards: 3000,
      textRemainingAwards: 3000,
      responseError: null,
    };
  },
  computed: {
    ...mapGetters({
      biteSettings: 'bite/isBiteSettings',
      biteProfile: 'bite/isBiteProfile',
    }),
    companyList() {
      this.biteSettings.industry.filter((ind, key) => {
        if (ind.name === this.biteProfile.industry) {
          this.companies = this.biteSettings.industry[key].companies;
        }
      });
      return this.companies;
    },
    expertise1Comput: {
      get() {
        return this.expertise1 === null ? this.biteProfile.expertise[0] : this.expertise1;
      },
      set(val) {
        this.expertise1 = val;
      },
    },

    expertise1Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise2Comput && skill.specialisation != this.expertise3Comput && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise2Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise1Comput && skill.specialisation != this.expertise3Comput && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise3Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise1Comput && skill.specialisation != this.expertise2Comput && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise2Comput: {
      get() {
        return this.expertise2 === null ? this.biteProfile.expertise[1] : this.expertise2;
      },
      set(val) {
        this.expertise2 = val;
      },
    },
    expertise3Comput: {
      get() {
        return this.expertise3 === null ? this.biteProfile.expertise[2] : this.expertise3;
      },
      set(val) {
        this.expertise3 = val;
      },
    },
  },
  mounted() {
    this.isDomReady = true;
    // mandatory fields disabled if status is verified
    if (this.biteProfile.status === 'verified' || this.biteProfile.status === 'pending') this.mandatoryFieldsDisabled = true;
    this.checkTextLimitIntro();
    this.checkTextLimitAwards();
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      saveBiteProfile: 'bite/saveBiteProfile',
      saveBiteProfilePending: 'bite/saveBiteProfilePending',
      getBiteProfile: 'bite/getBiteProfile',
    }),
    switchCompany() {
      this.companies = null;
      this.biteSettings.industry.filter((ind, key) => {
        if (ind.name === this.biteProfile.industry) {
          this.companies = this.biteSettings.industry[key].companies;
        }
      });
    },
    openFileSelectionBox() {
      document.getElementById('bite_file_upload').click();
    },
    downloadDocument(fileObj) {
      var url = fileObj.path;
      var fileName = url.split('/').pop();
      var api = `/user/profile/bite/document/${fileName}`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }

      this.$axios
        .get(api, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileObj.fileName); //or any other extension

          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          this.setLoader(false);
          console.log(error);
        });
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

      if (this.documents.length < 1) {
        this.compulsoryChange = true;
        this.documents.push(newFile);
        this.documentsError = false;
      } else {
        this.$toast.open({
          message: 'You cannot select more than 1 file',
          type: 'error',
          duration: 3000,
          dismissible: true,
        });
        return;
      }
    },
    removeSelectedFile(index, bool) {
      if (bool) {
        this.biteProfile.documents.splice(index, 1);
      } else {
        this.documents.splice(index, 1);
      }
    },
    disableDataAfterToday(date) {
      return date > today;
    },
    show() {
      if (this.compulsoryChange) {
        // Custom validation error for document field
        this.documentsError = this.documents.length === 0 && this.biteProfile.documents.length === 0 ? true : false;
      }
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          if (this.compulsoryChange) {
            if (this.documents.length === 0 && this.biteProfile.documents.length === 0) {
              return;
            }
          }
          VoerroModal.show('popup-message-modal');
        }
      });
    },
    hide() {
      VoerroModal.hide('popup-message-modal');
    },
    async biteProfileSave() {
      // Custom validation error for document field
      if (this.compulsoryChange) {
        this.documentsError = this.documents.length === 0 && this.biteProfile.documents.length === 0 ? true : false;
      }

      this.$validator.validateAll().then(async (result) => {
        if (result) {
          if (this.compulsoryChange) {
            if (this.documents.length === 0 && this.biteProfile.documents.length === 0) {
              return;
            }
          }

          this.setLoader(true);
          if (this.compulsoryChange) {
            // save bite profile pending attached documents
            let promises = [];
            let documentsId = [];
            if (this.documents.length > 0 && this.documents.length < 2) {
              for (let i = 0; i < this.documents.length; i++) {
                const formData = new FormData();
                formData.append('file', this.documents[i]);
                var api = '/user/profile/bite/pendingDocument';
                if (process.env.API_PROXY === '1' && process.client) {
                  api = '/api' + api;
                }
                promises.push(
                  this.$axios
                    .post(api, formData, {
                      headers: {
                        Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
                      },
                    })
                    .then(async (res) => {
                      if (res.data.result) {
                        documentsId.push(res.data.data.id);
                      }
                    }),
                );
              }
            }

            Promise.all(promises).then(async () => {
              // Combine previous and new documents attached IDs
              let tempArray = [];
              this.biteProfile.documents.forEach((file) => {
                tempArray.push(file.id);
              });

              let arrayCombine = documentsId.concat(tempArray);
              let finalArray = arrayCombine.filter((item, pos) => arrayCombine.indexOf(item) === pos);

              let biteProfileData = {};

              if (this.biteProfile.industry === 'Property') {
                biteProfileData.ceaNumber = this.biteProfile.ceaNumber;
              }

              biteProfileData.documents = finalArray;
              biteProfileData.country = this.biteProfile.country;
              biteProfileData.industry = this.biteProfile.industry;
              biteProfileData.descIntro = this.biteProfile.descIntro;
              biteProfileData.descAwards = this.biteProfile.descAwards;
              biteProfileData.workEmail = this.biteProfile.workEmail;
              biteProfileData.companyName = this.biteProfile.companyName;
              biteProfileData.designation = this.biteProfile.designation;
              biteProfileData.dateJoin = moment(this.biteProfile.dateJoin).unix();
              biteProfileData.expertise = [this.expertise1Comput, this.expertise2Comput, this.expertise3Comput];

              const response = await this.saveBiteProfilePending({
                data: biteProfileData,
              });
              if (response.status === 201) {
                this.setLoader(false);
                this.biteProfile.status = response.data.data.status;

                this.expertise1 = response.data.data.expertise[0];
                this.expertise2 = response.data.data.expertise[1];
                this.expertise3 = response.data.data.expertise[2];
                this.mandatoryFieldsDisabled = true;
                this.documents = [];
                this.getBiteProfile();
              }
            });
          } else if (this.optionalChange) {
            let biteProfileData = {
              descIntro: this.biteProfile.descIntro,
              descAwards: this.biteProfile.descAwards,
              expertise: [this.expertise1Comput, this.expertise2Comput, this.expertise3Comput],
            };
            const response = await this.saveBiteProfile({
              data: biteProfileData,
            });
            if (response.status === 201) {
              this.setLoader(false);
              if (response.data.result) {
                if (this.biteProfile.status === 'verified') {
                  VoerroModal.show('optional-edit-bites-profile-modal');
                }
                // this.biteProfile.status = response.data.data.status;
                // this.biteProfile.documents = response.data.data.documents;
                this.mandatoryFieldsDisabled = true;
                //this.getBiteProfile();
              } else if (response.data.error) {
                this.responseError = response.data.error;
              }
            }
          } else {
            this.setLoader(false);
          }
        }
      });
    },
    enableMandatoryFields() {
      VoerroModal.show('mandatory-fields-enable-modal');
    },
    onEnableMandatoryFields() {
      this.mandatoryFieldsDisabled = false;
      VoerroModal.hide('mandatory-fields-enable-modal');
    },
    showEditBiteProfileModal() {
      if (this.compulsoryChange) {
        // Custom validation error for document field

        this.documentsError = this.documents.length === 0 && this.biteProfile.documents.length === 0 ? true : false;
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            if (this.compulsoryChange) {
              if (this.documents.length === 0 && this.biteProfile.documents.length === 0) {
                return;
              }
            }

            VoerroModal.show('confirm-edit-bites-profile-modal');
          }
        });
      } else {
        this.biteProfileSave();
      }
    },
    onEditMandatoryFieldsValue() {
      VoerroModal.hide('confirm-edit-bites-profile-modal');
      this.biteProfileSave();
    },
    checkTextLimitIntro() {
      if (this.biteProfile.descIntro.length >= this.textLimitIntro) {
        this.biteProfile.descIntro = this.biteProfile.descIntro.substring(0, this.textLimitIntro);
      }
      this.textRemainingIntro = this.textLimitIntro - this.biteProfile.descIntro.length;
    },
    checkTextLimitAwards() {
      if (this.biteProfile.descAwards.length >= this.textLimitAwards) {
        this.biteProfile.descAwards = this.biteProfile.descAwards.substring(0, this.textLimitAwards);
      }
      this.textRemainingAwards = this.textLimitAwards - this.biteProfile.descAwards.length;
    },
  },
};
</script>
<style>
.vs__selected {
  color: #4a5568;
}
input[type='date'],
.mx-input {
  height: 46px;
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight;
}

.mx-datepicker {
  @apply w-full;
}

/* ========================================================================================================================================== */
/* ========================================================================================================================================== */
/* ========================================================================================================================================== */
/* Vue 2 Date Picker CSS */
.mx-icon-left:before,
.mx-icon-right:before,
.mx-icon-double-left:before,
.mx-icon-double-right:before,
.mx-icon-double-left:after,
.mx-icon-double-right:after {
  content: '';
  position: relative;
  top: -1px;
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  border-style: solid;
  border-color: currentColor;
  border-width: 2px 0 0 2px;
  border-radius: 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transform-origin: center;
  transform-origin: center;
  -webkit-transform: rotate(-45deg) scale(0.7);
  transform: rotate(-45deg) scale(0.7);
}

.mx-icon-double-left:after {
  left: -4px;
}

.mx-icon-double-right:before {
  left: 4px;
}

.mx-icon-right:before,
.mx-icon-double-right:before,
.mx-icon-double-right:after {
  -webkit-transform: rotate(135deg) scale(0.7);
  transform: rotate(135deg) scale(0.7);
}

.mx-btn {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 15px;
  margin: 0;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #73879c;
  white-space: nowrap;
}

.mx-btn:hover {
  border-color: #1284e7;
  color: #1284e7;
}

.mx-btn-text {
  border: 0;
  padding: 0 4px;
  text-align: left;
  line-height: inherit;
}

.mx-scrollbar {
  height: 100%;
}

.mx-scrollbar:hover .mx-scrollbar-track {
  opacity: 1;
}

.mx-scrollbar-wrap {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.mx-scrollbar-track {
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  width: 6px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  -webkit-transition: opacity 0.24s ease-out;
  transition: opacity 0.24s ease-out;
}

.mx-scrollbar-track .mx-scrollbar-thumb {
  position: absolute;
  width: 100%;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}

.mx-zoom-in-down-enter-active,
.mx-zoom-in-down-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.mx-zoom-in-down-enter,
.mx-zoom-in-down-leave-to {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}

.mx-datepicker {
  position: relative;
  display: inline-block;
  width: 210px;
}

.mx-datepicker svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.mx-datepicker-range {
  width: 320px;
}

.mx-datepicker-inline {
  width: auto;
}

.mx-input-wrapper {
  position: relative;
}

.mx-input-wrapper .mx-icon-clear {
  display: none;
}

.mx-input-wrapper:hover .mx-icon-clear {
  display: block;
}

.mx-input-wrapper:hover .mx-icon-clear + .mx-icon-calendar {
  display: none;
}

.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.mx-input:hover,
.mx-input:focus {
  border-color: #409aff;
}

.mx-input:disabled,
.mx-input.disabled {
  color: #000;
  background-color: #edf1f7;
  border: none;
  cursor: auto;
}

.mx-input:focus {
  outline: none;
}

.mx-input::-ms-clear {
  display: none;
}

.mx-icon-calendar,
.mx-icon-clear {
  position: absolute;
  top: 50%;
  right: 8px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
}

.mx-icon-clear {
  cursor: pointer;
}

.mx-icon-clear:hover {
  color: rgba(0, 0, 0, 0.8);
}

.mx-datepicker-main {
  font: 14px/1.5 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', sans-serif;
  color: #73879c;
  background-color: #fff;
  border: 1px solid #e8e8e8;
}

.mx-datepicker-popup {
  position: absolute;
  margin-top: 1px;
  margin-bottom: 1px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  z-index: 2001;
}

.mx-datepicker-sidebar {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100px;
  padding: 6px;
  overflow: auto;
}

.mx-datepicker-sidebar + .mx-datepicker-content {
  margin-left: 100px;
  border-left: 1px solid #e8e8e8;
}

.mx-datepicker-body {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.mx-btn-shortcut {
  display: block;
  padding: 0 6px;
  line-height: 24px;
}

.mx-range-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

@media (max-width: 750px) {
  .mx-range-wrapper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

.mx-datepicker-header {
  padding: 6px 8px;
  border-bottom: 1px solid #e8e8e8;
}

.mx-datepicker-footer {
  padding: 6px 8px;
  text-align: right;
  border-top: 1px solid #e8e8e8;
}

.mx-calendar {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 248px;
  padding: 6px 12px;
}

.mx-calendar + .mx-calendar {
  border-left: 1px solid #e8e8e8;
}

.mx-calendar-header,
.mx-time-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
  text-align: center;
  overflow: hidden;
}

.mx-btn-icon-left,
.mx-btn-icon-double-left {
  float: left;
}

.mx-btn-icon-right,
.mx-btn-icon-double-right {
  float: right;
}

.mx-calendar-header-label {
  font-size: 14px;
}

.mx-calendar-decade-separator {
  margin: 0 2px;
}

.mx-calendar-decade-separator:after {
  content: '~';
}

.mx-calendar-content {
  position: relative;
  height: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.mx-calendar-content .cell {
  cursor: pointer;
}

.mx-calendar-content .cell:hover {
  color: #73879c;
  background-color: #f3f9fe;
}

.mx-calendar-content .cell.active {
  color: #fff;
  background-color: #1284e7;
}

.mx-calendar-content .cell.in-range {
  color: #73879c;
  background-color: #dbedfb;
}

.mx-calendar-content .cell.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}

.mx-calendar-week-mode .mx-date-row {
  cursor: pointer;
}

.mx-calendar-week-mode .mx-date-row:hover {
  background-color: #f3f9fe;
}

.mx-calendar-week-mode .mx-date-row.mx-active-week {
  background-color: #dbedfb;
}

.mx-calendar-week-mode .mx-date-row .cell:hover {
  color: inherit;
  background-color: transparent;
}

.mx-calendar-week-mode .mx-date-row .cell.active {
  color: inherit;
  background-color: transparent;
}

.mx-week-number {
  opacity: 0.5;
}

.mx-table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
}

.mx-table th {
  padding: 0;
  font-weight: 500;
}

.mx-table td {
  padding: 0;
}

.mx-table-date td,
.mx-table-date th {
  height: 32px;
  font-size: 12px;
}

.mx-table-date .today {
  color: #2a90e9;
}

.mx-table-date .cell.not-current-month {
  color: #ccc;
}

.mx-time {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 224px;
  background: #fff;
}

.mx-time + .mx-time {
  border-left: 1px solid #e8e8e8;
}

.mx-calendar-time {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mx-time-header {
  border-bottom: 1px solid #e8e8e8;
}

.mx-time-content {
  height: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}

.mx-time-columns {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mx-time-column {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  border-left: 1px solid #e8e8e8;
  text-align: center;
}

.mx-time-column:first-child {
  border-left: 0;
}

.mx-time-column .mx-time-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mx-time-column .mx-time-list::after {
  content: '';
  display: block;
  height: 192px;
}

.mx-time-column .mx-time-item {
  cursor: pointer;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
}

.mx-time-column .mx-time-item:hover {
  color: #73879c;
  background-color: #f3f9fe;
}

.mx-time-column .mx-time-item.active {
  color: #1284e7;
  background-color: transparent;
  font-weight: 700;
}

.mx-time-column .mx-time-item.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}

.mx-time-option {
  cursor: pointer;
  padding: 8px 10px;
  font-size: 14px;
  line-height: 20px;
}

.mx-time-option:hover {
  color: #73879c;
  background-color: #f3f9fe;
}

.mx-time-option.active {
  color: #1284e7;
  background-color: transparent;
  font-weight: 700;
}

.mx-time-option.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}

/* ========================================================================================================================================== */
/* ========================================================================================================================================== */
/* ========================================================================================================================================== */
</style>
