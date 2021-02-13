<template>
  <div class="mt-20 sm:mt-0 text-base pb-4 provider-profile">
    <div class="w-full sm:px-10 px-4">
      <!-- Header of Profile Edit Section -->
      <div class="flex justify-between items-center">
        <!-- Breadcrumb -->
        <ul class="breadcrumb text-xl title-color font-semibold flex pb-6">
          <li class="mr-5"><nuxt-link class="hover:text-baits-blue" to="/dashboard">Profile</nuxt-link></li>
          <li class="mr-5 active text-baits-blue">Provider</li>
        </ul>

        <!-- Save Button -->
        <!-- <button class="btn-save font-semibold flex justify-between items-center focus:outline-none hover:shadow-lg">
          Save
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button> -->
      </div>

      <!-- {{ biteProfile }} -->

      <!-- Main Content -->
      <div class="main-section bg-white text-gray-700">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
          <!-- first grid column -->
          <div>
            <h2 class="text-xl font-semibold text-baits-blue mb-3">
              Work Details
              <template v-if="biteProfile.status === 'verified'">
                <font-awesome-icon :icon="['fas', 'edit']" class="float-right cursor-pointer w-5 h-5" @click="enableMandatoryFields()" />
              </template>
              <template v-if="biteProfile.status === 'pending'">
                <font-awesome-icon :icon="['fas', 'edit']" class="float-right cursor-pointer w-5 h-5" />
              </template>
            </h2>
            <div class="sm:p-10 p-4 shadow-md border border-gray-200 rounded sm:p-10 p-5 mb-8">
              <!-- Service Categories -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="phone" class="font-semibold mb-3 text-baits-blue">Service Categories</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
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
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('industry')">{{ errors.first('industry') }}</span>
                  </div>
                </div>
              </div>

              <!-- Bank/Institution/Agency -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="companyName" class="font-semibold mb-3 text-baits-blue">Bank/Institution/Agency</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
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
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('companyName')">{{ errors.first('companyName') }}</span>
                  </div>
                </div>
              </div>

              <!-- Designation -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="wEmail" class="font-semibold mb-3 text-baits-blue">Designation</label>
                  <input
                    class="baits-input appearance-none block w-full py-1 px-4"
                    :disabled="mandatoryFieldsDisabled"
                    v-validate="'required'"
                    v-model="biteProfile.designation"
                    data-vv-as="designation"
                    name="designation"
                    type="text"
                    @change="compulsoryChange = true"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('designation')">{{ errors.first('designation') }}</span>
                  </div>
                </div>
              </div>

              <!-- Work Email -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="wEmail" class="font-semibold mb-3 text-baits-blue">Work Email</label>
                  <input
                    class="baits-input appearance-none block w-full py-1 px-4"
                    :disabled="mandatoryFieldsDisabled"
                    v-validate="'required|email'"
                    v-model="biteProfile.workEmail"
                    data-vv-as="work email"
                    name="workEmail"
                    type="text"
                    @change="compulsoryChange = true"
                  />
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('workEmail')">{{ errors.first('workEmail') }}</span>
                  </div>
                </div>
              </div>

              <!-- Date Joined -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="dateJoined" class="font-semibold mb-3 text-baits-blue">Date Joined</label>
                  <date-picker
                    class="baits-input appearance-none block w-full px-2"
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
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('dateJoin')">{{ errors.first('dateJoin') }}</span>
                  </div>
                </div>
              </div>

              <!-- Office Location -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="wEmail" class="font-semibold mb-3 text-baits-blue">Office Location</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
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
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('country')">{{ errors.first('country') }}</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <label class="font-semibold mb-3 text-baits-blue">Name Card</label>
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
                <div v-if="!mandatoryFieldsDisabled" @click="openFileSelectionBox" class="baits-input appearance-none block w-full py-1 px-4 cursor-pointer">
                  <svg class="inline-block h-4 w-4" fill="#939393" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                    <path
                      d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
                    />
                  </svg>
                </div>
                <div v-else class="baits-input appearance-none block w-full py-1 px-4 cursor-pointer">
                  <svg class="inline-block h-4 w-4" fill="#939393" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                    <path
                      d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
                    />
                  </svg>
                </div>
                <!-------------------------------------------------------------------------------------------------->
                <div v-if="biteProfile.documents.length > 0">
                  <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file, index) in biteProfile.documents" :key="index">
                    <div class="font-semibold text-baits-blue" @click="downloadDocument(file)">
                      {{ file.fileName }}
                    </div>
                    <div v-if="!mandatoryFieldsDisabled" class="ml-4 font-semibold text-gray-600" @click="removeSelectedFile(index, true)">X</div>
                    <div v-else class="ml-4 font-semibold text-gray-600">X</div>
                  </div>
                </div>
                <div v-if="documents.length > 0">
                  <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file, index) in documents" :key="index">
                    <div class="text-baits-blue font-semibold" @click="downloadDocument(file)">
                      {{ file.name }}
                    </div>
                    <div v-if="!mandatoryFieldsDisabled" class="ml-4 font-semibold text-gray-600" @click="removeSelectedFile(index, false)">X</div>
                    <div v-else class="ml-4 font-semibold text-gray-600">X</div>
                  </div>
                </div>
                <div class="validate-error-msg text-sm">
                  <span class="caption" v-if="documentsError">The document field is required</span>
                </div>
              </div>
            </div>
          </div>

          <!-- second grid column -->
          <div>
            <h2 class="text-xl font-semibold mb-3 text-baits-blue">About me</h2>
            <div class="sm:p-10 p-5 shadow-md border border-gray-200 rounded sm:p-10 p-5 mb-8">
              <!-- Introduction -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="introduction" class="font-semibold mb-3 text-baits-blue">Introduction</label>
                  <textarea
                    class="baits-textarea appearance-none block w-full px-2"
                    v-validate="'required'"
                    v-model="biteProfile.descIntro"
                    data-vv-as="introduction"
                    name="descIntro"
                    @input="checkTextLimitIntro()"
                    @change="optionalChange = true"
                    rows="8"
                  ></textarea>
                  <p class="text-right text-xs">{{ textRemainingIntro }}</p>
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('descIntro')">{{ errors.first('descIntro') }}</span>
                  </div>
                </div>
              </div>

              <!-- Awards/ Accreditations / Achievements -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label for="awards" class="font-semibold mb-3 text-baits-blue">Awards / Accreditations / Achievements</label>
                  <textarea
                    class="baits-textarea appearance-none block w-full px-2"
                    v-validate="'required'"
                    v-model="biteProfile.descAwards"
                    name="descAwards"
                    data-vv-as="awards"
                    @input="checkTextLimitAwards()"
                    @change="optionalChange = true"
                    rows="8"
                  ></textarea>

                  <p class="text-right text-xs">{{ textRemainingAwards }}</p>
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('descAwards')">{{ errors.first('descAwards') }}</span>
                  </div>
                </div>
              </div>

              <!-- Skill -->
              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label class="block tracking-wide font-bold mb-2 text-baits-blue">Skills & Expertise 1</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      @input="optionalChange = true"
                      :options="expertise1Filtered"
                      label="specialisation"
                      v-model="expertise1Compute"
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
                  <div class="validate-error-msg text-sm">
                    <span class="caption" v-if="errors.has('expertise1')">{{ errors.first('expertise1') }}</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label class="block tracking-wide font-bold mb-2 text-baits-blue">Skills & Expertise 2</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      @input="optionalChange = true"
                      :options="expertise2Filtered"
                      label="specialisation"
                      v-model="expertise2Compute"
                      :reduce="(expertise) => expertise.specialisation"
                    >
                      <template #search="{ attributes, events }">
                        <input class="vs__search" v-bind="attributes" v-on="events" />
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 mb-4">
                <div class="input-group flex justify-start flex-col">
                  <label class="block tracking-wide font-bold mb-2 text-baits-blue">Skills & Expertise 3</label>
                  <div class="relative">
                    <v-select
                      class="baits-input appearance-none block w-full px-2"
                      @input="optionalChange = true"
                      :options="expertise3Filtered"
                      label="specialisation"
                      v-model="expertise3Compute"
                      :reduce="(expertise) => expertise.specialisation"
                    >
                      <template #search="{ attributes, events }">
                        <input class="vs__search" v-bind="attributes" v-on="events" />
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="validate-error-msg text-sm">
          <span class="caption" v-if="responseError">{{ responseError }}</span>
        </div>
        <div class="flex mb-6 mt-3">
          <button
            class="focus:outline-none btn py-1 px-12 rounded-full bg-baits-blue text-white font-bold md:m-0 m-auto"
            @click="show()"
            v-if="biteProfile.status === 'new'"
          >
            Setup
          </button>
          <button
            class="focus:outline-none cursor-not-allowed btn py-1 px-12 rounded-full bg-gray-400 text-white font-bold md:m-0 m-auto"
            @click="biteProfileSave()"
            v-if="biteProfile.status === 'pending'"
          >
            Pending
          </button>
          <button
            class="focus:outline-none btn py-1 px-12 rounded-full bg-baits-blue text-white font-bold md:m-0 m-auto"
            @click="showEditBiteProfileModal()"
            v-if="biteProfile.status === 'verified'"
          >
            Save
          </button>
          <button
            class="focus:outline-none btn py-1 px-12 rounded-full bg-gray-400 text-white font-bold md:ml-4 m-auto"
            @click="$router.push({ path: '/dashboard' })"
          >
            Back
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
              <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="biteProfileSave()">Confirm</button>
            </div>
          </template>
          <template v-slot:content v-else>
            <div class="text-xl font-bold text-center">
              <div class="text-2xl">Your Provider Profile has been submitted for approval!</div>
              <div class="mt-4">You will receive an email notification once your profile is approved.</div>
              <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full mt-12" @click="hide()">Ok</button>
            </div>
          </template>
        </PopupMessageModal>
        <MandatoryFieldsEnableModal v-if="isDomReady" @handleMandatoryFieldsValue="onEnableMandatoryFields" />
        <ConfirmEditBitesProfileModal v-if="isDomReady" @handleEditMandatoryFieldsValue="onEditMandatoryFieldsValue" />
        <OptionalEditBitesProfileModal v-if="isDomReady" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { convertFromUnixTime, convertToUnixTime } from '@/services/index';
import PopupMessageModal from '@/components/common/PopupMessageModal';
import MandatoryFieldsEnableModal from '@/components/modal/MandatoryFieldsEnableModal';
import ConfirmEditBitesProfileModal from '@/components/modal/ConfirmEditBitesProfileModal';
import OptionalEditBitesProfileModal from '@/components/modal/OptionalEditBitesProfileModal';

const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  // 'user', 'userProfile', 'baitSettings'
  props: ['biteProfile', 'biteSettings'],
  components: {
    PopupMessageModal,
    MandatoryFieldsEnableModal,
    ConfirmEditBitesProfileModal,
    OptionalEditBitesProfileModal,
  },
  data() {
    return {
      // avatar: null,
      // expertise1: null,
      // expertise2: null,
      // expertise3: null,
      // textRemainingIntro: 3000,
      // mandatoryFieldsDisabled: false,

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
  mounted() {
    this.isDomReady = true;
    // mandatory fields disabled if status is verified
    if (this.biteProfile.status === 'verified' || this.biteProfile.status === 'pending') this.mandatoryFieldsDisabled = true;
    this.checkTextLimitIntro();
    this.checkTextLimitAwards();
  },
  computed: {
    companyList() {
      this.biteSettings.industry.filter((ind, key) => {
        if (ind.name === this.biteProfile.industry) {
          this.companies = this.biteSettings.industry[key].companies;
        }
      });
      return this.companies;
    },
    expertise1Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise2Compute && skill.specialisation != this.expertise3Compute && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise2Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise1Compute && skill.specialisation != this.expertise3Compute && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise3Filtered() {
      return this.biteSettings.expertise.filter((skill) => {
        if (skill.specialisation != this.expertise1Compute && skill.specialisation != this.expertise2Compute && skill.category === this.biteProfile.industry) {
          return skill;
        }
      });
    },
    expertise1Compute: {
      get() {
        return this.expertise1 === null ? this.biteProfile.expertise[0] : this.expertise1;
      },
      set(val) {
        this.expertise1 = val;
      },
    },
    expertise2Compute: {
      get() {
        return this.expertise2 === null ? this.biteProfile.expertise[1] : this.expertise2;
      },
      set(val) {
        this.expertise2 = val;
      },
    },
    expertise3Compute: {
      get() {
        return this.expertise3 === null ? this.biteProfile.expertise[2] : this.expertise3;
      },
      set(val) {
        this.expertise3 = val;
      },
    },
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setProviderProfile: 'profile/setProviderProfile',
    }),
    // ...mapActions({
    //   fetchUser: 'user/fetchUser',
    // }),
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
              biteProfileData.dateJoin = convertToUnixTime(this.biteProfile.dateJoin);
              biteProfileData.expertise = [this.expertise1Compute, this.expertise2Compute, this.expertise3Compute];

              const response = await this.saveBiteProfilePending({
                data: biteProfileData,
              });
              if (response.status === 201 && response.data.result) {
                // this.setLoader(false);
                // this.biteProfile.status = response.data.data.status;

                // this.expertise1 = response.data.data.expertise[0];
                // this.expertise2 = response.data.data.expertise[1];
                // this.expertise3 = response.data.data.expertise[2];
                // this.mandatoryFieldsDisabled = true;
                // this.documents = [];
                // this.getBiteProfile();
                var updatedProfile = response.data.data;
                updatedProfile.dateJoin = convertFromUnixTime(updatedProfile.dateJoin);
                this.setProviderProfile(updatedProfile);
                this.$toast.open({
                  message: 'Profile updated',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
              } else if (response.data.result === false) {
                if (response.data.error === '') {
                  this.$toast.open({
                    message: 'Opps! Something is broken..',
                    type: 'error',
                    duration: 5000,
                    dismissible: true,
                  });
                } else {
                  this.$toast.open({
                    message: 'Opps! ' + response.data.error,
                    type: 'error',
                    duration: 5000,
                    dismissible: true,
                  });
                }
              }
              this.setLoader(false);
            });
          } else if (this.optionalChange) {
            let biteProfileData = {
              descIntro: this.biteProfile.descIntro,
              descAwards: this.biteProfile.descAwards,
              expertise: [this.expertise1Compute, this.expertise2Compute, this.expertise3Compute],
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
    openAvatarDialog() {
      document.getElementById('profile_upload').click();
    },
    fileseleted(avatarImage) {
      this.setLoader(true);
      var newFile = this.dataURLtoFile(avatarImage.dataUrl, avatarImage.info.name);

      // If file size is greater than 1MB
      if (newFile.size > 1000000) {
        alert('File is too big!');
        this.setLoader(false);
        return;
      }

      this.avatar = newFile;
      const formData = new FormData();
      formData.append('file', this.avatar);

      var api = '/user/avatar';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const response = this.$axios
        .post(api, formData, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
          },
        })
        .then((res) => {
          if (res.data.result) {
            this.fetchUser(this.$cookies.get('baitsToken'))
              .then((userData) => {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Avatar updated successfully...!',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
              })
              .catch((error) => {
                console.log(error);
                this.$toast.open({
                  message: 'Failed to fetch user.',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
                this.setLoader(false);
              });

            this.setLoader(false);
          } else {
            this.setLoader(false);
            this.$toast.open({
              message: 'Failed to update avatar.',
              type: 'error',
              duration: 5000,
              dismissible: true,
            });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          console.log(error);
          this.$toast.open({
            message: 'Failed to update avatar.',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
};
</script>

<style>
.title-color {
  color: #536577;
}

.breadcrumb li {
  position: relative;
  color: rgba(83, 101, 119, 0.7);
}

.active {
  color: unset;
  color: rgba(83, 101, 119, 1) !important;
}

.breadcrumb li::after {
  content: ' > ';
  position: absolute;
  top: 0;
  left: 105%;
}

.breadcrumb li:last-child::after {
  content: '';
}

.btn-save {
  background-color: #2fcc71;
  color: white;
  padding: 15px 21px;
  border-radius: 40px;
  line-height: 24px;
  width: 150px;
}

.user-avatar {
  width: 124px;
}
.mx-datepicker {
  @apply w-full;
}

.provider-profile .mx-input {
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  background: none;
}
.provider-profile .vs__dropdown-toggle {
  border: none !important;
  border-radius: 0px !important;
}
</style>
