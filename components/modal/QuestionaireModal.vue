<template>
  <div>
    <!-- Questionaire Modal -->
    <modal
      id="questionaire-modal"
      :dismissible="false"
      v-cloak
      class="questionaire-modal"
    >
      <div slot="body">
        <div
          class="flex flex-wrap bg-white px-4 md:px-16 relative"
          style="min-height: inherit"
        >
          <div
            class="w-full"
            v-if="
              currentQuestion.components &&
              currentQuestion.hasOwnProperty('components')
            "
          >
            <div
              class="grid grid-cols-1 md:grid-cols-6 gap-4"
              v-if="!congratsDialog && !errorDialog"
            >
              <div
                class
                :class="[
                  isUserDetailsComputed
                    ? 'md:col-start-2 md:col-span-4'
                    : 'md:col-span-6',
                ]"
              >
                <div
                  class="text-center text-xl font-medium text-gray-700 mb-4"
                  v-if="!isUserDetailsComputed"
                >
                  {{ currentQuestion.header }}
                </div>
                <div
                  class="text-center text-xl font-medium text-gray-700 mb-4"
                  v-else
                >
                  Well done, Your bait is ready!
                </div>
                <base-progress class="mb-6" :percentage="progressPercentage" />
              </div>
            </div>
            <template
              v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog"
            >
              <div
                v-for="(component, index1) in currentQuestion.components"
                :key="index1"
              >
                <!-- ===============================================================================================================-->
                <!--=================================== Questionaires for Type Radio ===================================-->
                <!-- ===============================================================================================================-->
                <div v-if="component.type === 'radio'" class="mb-3">
                  <div class="flex flex-wrap">
                    <div class="w-full">
                      <label class="text-lg text-baits-gray-dark">{{
                        component.text
                      }}</label>
                    </div>
                    <div class="w-full">
                      <div class="pl-8 mt-2">
                        <div
                          class="grid gap-3"
                          :class="[
                            component.columns == 1
                              ? 'grid-cols-1'
                              : 'md:grid-cols-2',
                          ]"
                        >
                          <div
                            v-for="(item, index2) in component.options"
                            :key="index2"
                          >
                            <input
                              :id="index2"
                              type="radio"
                              name="radio"
                              class="hidden"
                              :value="item.text"
                              v-model="selectRadio"
                            />
                            <label
                              :for="index2"
                              class="flex items-center cursor-pointer"
                              @click="saveQuestionaire(item)"
                              :key="currentQuestion.qnId"
                            >
                              <span
                                class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                              ></span>
                              {{ item.text }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type Checkbox ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'checkbox'" class="mb-3">
                  <div class="flex flex-wrap">
                    <div class="w-full">
                      <div
                        class="grid gap-6"
                        :class="[
                          component.columns == 1
                            ? 'grid-cols-1'
                            : 'md:grid-cols-2',
                        ]"
                      >
                        <div
                          v-for="(item, index3) in component.options"
                          :key="index3"
                        >
                          <input
                            :id="index3"
                            type="checkbox"
                            name="qq"
                            class="hidden"
                            :value="item.text"
                            v-model="selectCheckboxes"
                          />
                          <label :for="index3" class="cursor-pointer">
                            <span
                              class="w-5 h-5 inline-block mr-1 border border-grey"
                            ></span>
                            {{ item.text }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type numberinput ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'numberinput'" class="mb-3">
                  <div class="flex">
                    <div class="w-full">
                      <label class="text-xl text-baits-gray-dark">{{
                        component.text
                      }}</label>
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 text-left">
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      v-model="inputText"
                      type="number"
                      :placeholder="
                        component.placeholder
                          ? component.placeholder
                          : 'Enter a value'
                      "
                      :class="[!validated ? 'border border-red-500' : 'shadow']"
                    />
                    <p class="text-red-500 text-xs italic" v-if="!validated">
                      Please enter the value.
                    </p>
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type numberinputgroup ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'numberinputgroup'" class="mb-3">
                  <div class="flex flex-wrap">
                    <div class="w-full">
                      <div
                        class="grid gap-6"
                        :class="[
                          component.columns == 1
                            ? 'grid-cols-1'
                            : 'md:grid-cols-2',
                        ]"
                      >
                        <div
                          v-for="(item, index4) in component.options"
                          :key="index4"
                        >
                          <label :for="index4">{{ item.text }}</label>
                          <input
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            v-model="inputGroup[index4]"
                            type="number"
                            :placeholder="
                              component.placeholder
                                ? component.placeholder
                                : 'Enter a value'
                            "
                            :class="[
                              !validated ? 'border border-red-500' : 'shadow',
                            ]"
                          />
                          <p
                            class="text-red-500 text-xs italic"
                            v-if="!validated"
                          >
                            Please enter the value for at least 1 field.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type textinput ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'textinput'" class="mb-3">
                  <div class="flex">
                    <div class="w-full">
                      <label class="text-xl text-baits-gray-dark">{{
                        component.text
                      }}</label>
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 text-left">
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      v-model="inputText"
                      type="text"
                      :placeholder="
                        component.placeholder
                          ? component.placeholder
                          : 'Enter a value'
                      "
                      :class="[!validated ? 'border border-red-500' : 'shadow']"
                    />
                    <p class="text-red-500 text-xs italic" v-if="!validated">
                      Please enter the value.
                    </p>
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type textinputoptional ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'textinputoptional'" class="mb-3">
                  <div class="flex">
                    <div class="w-full">
                      <label class="text-xl text-baits-gray-dark">{{
                        component.text
                      }}</label>
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 text-left">
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      v-model="inputText"
                      type="text"
                      :placeholder="
                        component.placeholder
                          ? component.placeholder
                          : 'Enter a value'
                      "
                      :class="['shadow']"
                    />
                  </div>
                </div>
                <!-- ================================================================================================================-->
                <!-- =================================== Questionaires for Type textarea ================================-->
                <!-- ================================================================================================================-->
                <div v-if="component.type === 'textarea'" class="mb-3">
                  <div class="flex">
                    <div class="w-full">
                      <label class="text-xl text-baits-gray-dark">{{
                        component.text
                      }}</label>
                    </div>
                  </div>
                  <textarea
                    class="border rounded focus:outline-none focus:shadow-outline mt-1 block w-full p-2"
                    rows="5"
                    :placeholder="component.placeholder"
                    v-model="textareaText"
                    @input="checkTextLimit()"
                  ></textarea>
                  <p class="text-right text-xs">{{ textRemaining }}</p>
                </div>
              </div>
              <!-- ===============================================================================================================-->
              <!-- ============================================= Questionaires Remarks ===========================================-->
              <!-- ===============================================================================================================-->
              <div
                v-if="currentQuestion.remarks.length > 0"
                class="w-full self-end mt-10 text-sm"
              >
                <div
                  v-for="(item, indexRemarks) in currentQuestion.remarks"
                  :key="indexRemarks"
                >
                  <p>{{ item.content }}</p>
                </div>
              </div>
              <!-- ===============================================================================================================-->
              <!-- ============================================= Questionaires Buttons ===========================================-->
              <!-- ===============================================================================================================-->
              <div class="w-full self-end mt-10">
                <div
                  @click="goNext"
                  :class="[currentQuestion.nextButton ? 'block' : 'hidden']"
                  class="cursor-pointer rounded py-2 text-center mb-2 mb-2 bg-blue-500 block text-white"
                >
                  Next
                </div>
                <div
                  style="background-color: #eeece1"
                  @click="goBack"
                  :class="[currentQuestion.backButton ? 'block' : 'hidden']"
                  class="cursor-pointer rounded py-2 text-center mb-2 block"
                >
                  Go Back
                </div>
              </div>
            </template>
            <!-- ===============================================================================================================-->
            <!--=================================== Questionaires for Type Radio ===================================-->
            <!-- ===============================================================================================================-->
            <!-- <template
              v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog && currentQuestion.components[0].type === 'radio'"
            >
              <div class="flex flex-wrap pt-6">
                <div class="w-full">
                  <label class="text-lg text-baits-gray-dark">{{currentQuestion.components[0].text}}</label>
                </div>
                <div class="w-full">
                  <div class="pl-8 mt-4">
                    <div
                      class="grid gap-6"
                      :class="[currentQuestion.components[0].columns == 1 ? 'grid-cols-1':'md:grid-cols-2']"
                    >
                      <div
                        v-for="(item,index) in currentQuestion.components[0].options"
                        :key="index"
                      >
                        <input
                          :id="index"
                          type="radio"
                          name="radio"
                          class="hidden"
                          :value="item.text"
                          v-model="selectRadio"
                        />
                        <label
                          :for="index"
                          class="flex items-center cursor-pointer"
                          @click="saveQuestionaire(item)"
                          :key="currentQuestion.qnId"
                        >
                          <span
                            class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                          ></span>
                          {{item.text}}
                        </label>
                      </div>
                    </div>
                    <div
                      class="flex items-center mr-4 mb-4"
                      v-for="(item,index) in currentQuestion.components[0].options"
                      :key="index"
                    ></div>
                  </div>
                </div>
              </div>
            </template>-->
            <!-- ================================================================================================================-->
            <!-- =================================== Questionaires for Type Checkbox ================================-->
            <!-- ================================================================================================================-->
            <!-- <template
              v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog && currentQuestion.components[0].type === 'checkbox'"
            >
              <div class="flex flex-wrap pt-6">
                <div class="w-full">
                  <div
                    class="grid gap-6"
                    :class="[currentQuestion.components[0].columns == 1 ? 'grid-cols-1':'md:grid-cols-2']"
                  >
                    <div v-for="(item,index) in currentQuestion.components[0].options" :key="index">
                      <input
                        :id="index"
                        type="checkbox"
                        name="qq"
                        class="hidden"
                        :value="item.text"
                        v-model="selectCheckboxes"
                      />
                      <label :for="index" class="cursor-pointer">
                        <span class="w-5 h-5 inline-block mr-1 border border-grey"></span>
                        {{item.text}}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </template>-->
            <!-- ================================================================================================================-->
            <!-- =================================== Questionaires for Type numberinput ================================-->
            <!-- ================================================================================================================-->
            <!-- <template
              v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog && currentQuestion.components[0].type === 'numberinput'"
            >
              <div class="flex pt-6">
                <div class="w-full">
                  <label class="text-xl text-baits-gray-dark">{{currentQuestion.components[0].text}}</label>
                </div>
              </div>
              <div class="flex flex-wrap mt-4 text-left">
                <input
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="inputText"
                  type="number"
                  placeholder="Enter value"
                  :class="[!validated ? 'border border-red-500' : 'shadow']"
                />
                <p class="text-red-500 text-xs italic" v-if="!validated">Please enter the value.</p>
              </div>
            </template>-->
            <!-- ================================================================================================================-->
            <!-- =================================== Questionaires for Type textarea ================================-->
            <!-- ================================================================================================================-->
            <!-- <template
              v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog && currentQuestion.components[0].type === 'textarea'"
            >
              <div class="flex pt-6">
                <div class="w-full">
                  <label class="text-xl text-baits-gray-dark">{{currentQuestion.components[0].text}}</label>
                </div>
              </div>
              <textarea
                class="border rounded focus:outline-none focus:shadow-outline mt-1 block w-full p-2"
                rows="5"
                placeholder
                v-model="textareaText"
              ></textarea>
            </template>-->
            <!-- ================================================================================================================-->
            <!-- =============================================== User Detail Form ===============================================-->
            <!-- ================================================================================================================-->
            <template
              v-if="isUserDetailsComputed && !congratsDialog && !errorDialog"
            >
              <div class="py-3">
                <p class="text-xl font-bold">
                  Fill in your details before you cast it:
                </p>
                <p class="text-xl font-bold mt-2">Note:</p>
                <p class="text-lg pl-4">
                  Your contact information is required to connect you with
                  potential bites. Please ensure your information provided below
                  are accurate.
                </p>
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 pb-4 mb-4"
              >
                <div>
                  <label class="block font-bold py-2">
                    First Name
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="flex">
                    <input
                      type="text"
                      name="firstName"
                      v-validate="'required'"
                      data-vv-as="first name"
                      v-model="userDetail.firstName"
                      class="w-full py-2 px-3 font-bold focus:outline-none border border-gray-400 rounded-r-lg"
                    />
                  </div>
                  <div class="validate-error-msg text-red-500 mt-2 text-sm">
                    <span class="caption" v-if="errors.has('firstName')">{{
                      errors.first('firstName')
                    }}</span>
                  </div>
                </div>
                <!-- cell -->
                <div>
                  <label class="block font-bold py-2">
                    Last Name
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    v-validate="'required'"
                    data-vv-as="last name"
                    v-model="userDetail.lastName"
                    class="w-full py-2 px-3 font-bold focus:outline-none border border-gray-400 rounded-r-lg"
                  />
                  <div class="validate-error-msg text-red-500 mt-2 text-sm">
                    <span class="caption" v-if="errors.has('lastName')">{{
                      errors.first('lastName')
                    }}</span>
                  </div>
                </div>
                <!-- cell -->
                <div>
                  <label class="block font-bold py-2">
                    Contact
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center">
                    <!-- <div class="w-2/6">
                      <ContactExtension
                        className="country_prefix_questionaire"
                        @passExtension="passExtensionHandler"
                        :selectedExt="selectedExt"
                      />
                    </div> -->
                    <ContactExtension
                      className="country_prefix_questionaire"
                      @passExtension="passExtensionHandler"
                      :default="mobilePrefix"
                      class="w-auto inline-block"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      v-validate="{
                        required: true,
                        regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      }"
                      v-model="userDetail.mobile"
                      class="py-2 px-3 font-bold flex-grow focus:outline-none border border-l-0 rounded-l-none border-gray-400 rounded-lg"
                      placeholder="XXXXXXXX"
                    />
                  </div>
                  <div
                    class="px-3 mt-1 mb-6 md:mb-0 text-baits-gray-dark text-sm italic"
                  >
                    <span class="caption"
                      >Note: For mobile number, please omit any space, - or ( ).
                      Eg. 12345678</span
                    >
                  </div>
                  <div class="validate-error-msg text-red-500 mt-2 text-sm">
                    <span class="caption" v-if="errors.has('mobile')">{{
                      errors.first('mobile')
                    }}</span>
                  </div>
                </div>
                <!-- cell -->
                <div>
                  <label class="block font-bold py-2">
                    E-mail
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    v-validate="'required|email'"
                    name="email"
                    v-model="userDetail.email"
                    class="w-full py-2 px-3 font-bold focus:outline-none border border-gray-400 rounded-lg"
                  />
                  <div class="validate-error-msg text-red-500 mt-2 text-sm">
                    <span class="caption" v-if="errors.has('email')">{{
                      errors.first('email')
                    }}</span>
                  </div>
                </div>
                <!-- cell -->
              </div>
              <div class="text-center pb-8">
                <button
                  type="button"
                  class="focus:outline-none py-2 px-10 text-xl font-bold text-white rounded-lg bg-blue-500"
                  @click="saveUserDetail"
                >
                  Cast bait
                </button>
              </div>
            </template>
            <!-- ================================================================================================================-->
            <!-- =============================================== Congrats Message ===============================================-->
            <!-- ================================================================================================================-->
            <template v-if="congratsDialog">
              <div class="flex items-center">
                <div
                  class="text-center text-2xl font-bold text-gray-800 mb-4 w-full"
                >
                  Congratulations!
                </div>
              </div>
              <div class="px-5 py-3">
                <p class="text-xl text-center">
                  Your bait is pending in your account!
                  <br />Please verify your email in order to cast your bait.
                </p>
              </div>
              <div class="text-center py-6">
                <button
                  class="focus:outline-none mt-6 py-2 px-12 text-xl font-bold text-white rounded-lg bg-blue-500"
                  @click="hide"
                >
                  Ok
                </button>
              </div>
            </template>
            <!-- ================================================================================================================-->
            <!-- =============================================== Error Message ===============================================-->
            <!-- ================================================================================================================-->
            <template v-if="errorDialog">
              <div class="flex items-center">
                <div
                  class="text-center text-2xl font-bold text-gray-800 mb-4 w-full"
                >
                  Oops...
                </div>
              </div>
              <div class="px-5 py-3">
                <p class="text-xl text-center">{{ errorMessage }}</p>
              </div>
              <div class="text-center py-6">
                <button
                  class="focus:outline-none mt-6 py-2 px-12 text-xl font-bold text-white rounded-lg bg-blue-500"
                  @click="hide"
                >
                  Ok
                </button>
              </div>
            </template>
          </div>
          <!-- ===============================================================================================================-->
          <!-- ============================================= Questionaires Buttons ===========================================-->
          <!-- ===============================================================================================================-->
          <!-- <template v-if="!isUserDetailsComputed && !congratsDialog && !errorDialog">
            <div class="w-full self-end mt-10">
              <div
                v-if="currentQuestion.hasOwnProperty('components') && currentQuestion.components[0].type !== 'numberinput'"
                @click="goNext"
                :class="[currentQuestion.nextButton ? 'block' : 'hidden']"
                class="cursor-pointer rounded py-2 text-center mb-2 bg-blue-500 block text-white"
              >{{!isUserDetailsComputed && !congratsDialog && !errorDialog && currentQuestion.hasOwnProperty('components') && currentQuestion.components[0].type === 'textarea' && currentQuestion.nextQn === 'end' && $route.fullPath !== '/' ? 'Cast Bait' : 'Next'}}</div>
              <div
                v-else
                @click="goNext"
                class="block cursor-pointer rounded py-2 text-center mb-2 bg-blue-500 text-white"
              >Next</div>
              <div
                style="background-color: #EEECE1;"
                @click="goBack"
                :class="[currentQuestion.backButton ? 'block' : 'hidden']"
                class="cursor-pointer rounded py-2 text-center mb-2 block"
              >Go Back</div>
            </div>
          </template>-->
          <div
            @click="hide"
            class="rounded-full py-2 text-center mb-2 block hover:bg-baits-blue cursor-pointer hover:text-white p-4 font-medium absolute right-0"
            style="top: -1rem"
          >
            X
          </div>
        </div>
      </div>
    </modal>
    <WizardClosingModal>
      <template v-slot:content>
        <div class="pt-12 pb-6 px-8">
          <div class="text-xl leading-loose text-center p-8 font-bold">
            Let's continue. I want to cast my bait!
          </div>
          <button
            class="focus:outline-none mt-6 py-3 w-full text-white rounded bg-baits-blue md:mr-5 text-lg"
            @click="hideWizardClose"
          >
            Continue Wizard
          </button>
          <button
            class="focus:outline-none bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full mt-2"
            @click="takeBreak"
          >
            I will take a break and continue later
          </button>
          <button
            class="focus:outline-none bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full mt-2"
            @click="start_over"
          >
            I want to start again
          </button>
        </div>
      </template>
    </WizardClosingModal>
  </div>
</template>
<script>
import WizardClosingModal from '@/components/modal/WizardClosing';
import BaseProgress from '@/components/common/BaseProgress';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ContactExtension from '@/components/common/ContactExtension';

export default {
  props: ['page'],
  components: {
    WizardClosingModal,
    BaseProgress,
    ContactExtension,
  },
  data() {
    return {
      selectRadio: false,
      selectCheckboxes: [],
      inputText: '',
      inputGroup: [],
      textareaText: '',
      isUserDetails: false,
      userDetail: {},
      congratsMessage: false,
      errorMessage: '',
      hasError: false,
      currentQuestion: [],
      questionsSelected: [],
      validated: true,
      progressPercentage: 0,
      progressRate: 8,
      textLimit: 200,
      textRemaining: 200,
      mobilePrefix: '',
      selectedExt: '',
      // hasExtError: false,
      // options: [
      //   {
      //     title: 'Singapore',
      //     path: 'sg.gif',
      //     ext: '+65',
      //   },
      //   {
      //     title: 'Malaysia',
      //     path: 'my.gif',
      //     ext: '+60',
      //   },
      // ],
    };
  },
  computed: {
    ...mapGetters({
      questionaires: 'questionaires/isQuestionaires',
      currentQuestionNo: 'popup/getCurrentQuestionNo',
      previousQuestionNo: 'popup/getPreviousQuestionNo',
      questionIndex: 'popup/getQuestionIndex',
    }),
    isUserDetailsComputed() {
      return this.isUserDetails;
    },
    congratsDialog() {
      return this.congratsMessage;
    },
    errorDialog() {
      return this.hasError;
    },
  },
  async mounted() {
    this.setLoader(true);
    await this.getQuestionaires();
    this.setLoader(false);
    //check local storage at startup
    let data = JSON.parse(localStorage.getItem('questionaire')) || {};
    if (data.length > 0) {
      this.currentQuestion = data[data.length - 1];
      this.questionsSelected = data;
      this.progressPercentage =
        data.length * this.progressRate - this.progressRate;
    } else {
      this.currentQuestion = this.questionaires[0];
      this.questionsSelected.push(this.currentQuestion);
    }
  },
  // watch: {
  //   selectedExt(val) {
  //     if (val) {
  //       this.hasExtError = false;
  //     }
  //   },
  // },
  methods: {
    ...mapMutations({
      setNextQuestionNo: 'popup/setNextQuestionNo',
      setPreviousQuestionNo: 'popup/setPreviousQuestionNo',
      setQuestionIndex: 'popup/setQuestionIndex',
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getQuestionaires: 'questionaires/getQuestionaires',
      setLocalStorage: 'popup/setLocalStorageData',
      getBaitsList: 'baits/getBaitsList',
    }),
    passExtensionHandler(val) {
      if (val) {
        this.selectedExt = val;
        this.mobilePrefix = val.countryPrefix;
      }
    },
    show() {
      VoerroModal.show('questionaire-modal');
    },
    hideWizardClose() {
      VoerroModal.hide('wizard-closing');
    },

    takeBreak() {
      VoerroModal.hide('wizard-closing');
      VoerroModal.hide('questionaire-modal');
    },

    start_over() {
      this.resetQuestionares();
      VoerroModal.hide('wizard-closing');
      VoerroModal.hide('questionaire-modal');
    },
    hide() {
      if (this.questionsSelected.length > 1) {
        VoerroModal.show('wizard-closing');
      } else {
        VoerroModal.hide('questionaire-modal');
        this.congratsMessage = false;
        this.errorMessage = false;
        this.hasError = false;
      }
    },
    goBack() {
      this.progressPercentage -= this.progressRate;
      var pos = this.questionsSelected.findIndex(
        (x) => x.qnId === this.currentQuestion.qnId,
      );
      if (pos > 0) {
        this.currentQuestion = this.questionsSelected[pos - 1];
        this.questionsSelected.splice(pos, 1);
      }

      // reset storage
      this.updateLocalStorageQuestions();

      // set previous selected answer
      let temp = this.questionsSelected[this.questionsSelected.length - 1];
      if (temp.components[0].type == 'radio') {
        this.selectRadio = temp.answer[0];
      } else if (temp.components[0].type == 'checkbox') {
        this.selectCheckboxes = temp.answer;
      } else if (
        temp.components[0].type == 'numberinput' ||
        temp.components[0].type == 'textinput' ||
        temp.components[0].type == 'textinputoptional'
      ) {
        this.inputText = temp.answer[0];
      } else if (temp.components[0].type == 'numberinputgroup') {
        this.inputGroup = temp.answer.map((a) => a.split('::')[1]);
      } else if (temp.components[0].type == 'textarea') {
        this.textareaText = temp.answer[0];
      }
    },
    goNext() {
      var item = [];
      this.validated = true;
      for (var i = 0; i < this.currentQuestion.components.length; i++) {
        if (this.currentQuestion.components[i].type === 'textarea') {
          item = { text: this.textareaText, nextQn: '' };
        } else if (this.currentQuestion.components[i].type === 'checkbox') {
          item = { text: this.selectCheckboxes, nextQn: '' };
        } else if (
          this.currentQuestion.components[i].type === 'numberinput' ||
          this.currentQuestion.components[i].type === 'textinput'
        ) {
          // requires user input
          if (this.inputText) {
            item = { text: this.inputText, nextQn: '' };
            this.validated = true;
          } else {
            this.validated = false;
            return;
          }
        } else if (
          this.currentQuestion.components[i].type === 'textinputoptional'
        ) {
          // input is optional, do nothing
          item = { text: this.inputText, nextQn: '' };
        } else if (
          this.currentQuestion.components[i].type === 'numberinputgroup'
        ) {
          var inputCount = this.inputGroup.filter((a) => {
            return a != '' && a > 0;
          }).length;
          if (inputCount > 0) {
            // has at least 1 input
            var computeArr = [];
            for (
              var j = 0;
              j < this.currentQuestion.components[i].options.length;
              j++
            ) {
              computeArr.push(
                this.currentQuestion.components[i].options[j].text +
                  '::' +
                  (this.inputGroup[j] ?? ''),
              );
            }
            item = { text: computeArr, nextQn: '' };
            this.validated = true;
          } else {
            this.validated = false;
            return;
          }
        }
      }

      //if (this.validated) this.textareaText = '';
      this.saveQuestionaire(item);
    },
    saveUserDetail() {
      // if (this.selectedExt === '') {
      //   this.hasExtError = true;
      // } else {
      //   this.hasExtError = false;
      // }

      this.$validator.validateAll().then((result) => {
        if (result && !this.hasExtError) {
          this.setLoader(true);

          let quns = [];
          this.questionsSelected.forEach((element) =>
            quns.push({ qnId: element.qnId, answer: element.answer }),
          );

          const updatePasswordData = {
            token: this.$route.query.token,
            firstName: this.userDetail.firstName,
            lastName: this.userDetail.lastName,
            mobilePrefix: this.mobilePrefix,
            mobile: this.userDetail.mobile,
            email: this.userDetail.email,
            qns: quns,
          };

          var api = '/question/general';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }

          const response = this.$axios
            .post(api, updatePasswordData)
            .then((res) => {
              if (res.data.result) {
                this.congratsMessage = true;
              }

              if (!res.data.result) {
                this.hasError = true;
                this.errorMessage = res.data.error;
              }
              this.setLoader(false);
              this.resetQuestionares();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    saveQuestionaireForBaits() {
      this.setLoader(true);

      let quns = [];
      this.questionsSelected.forEach((element) =>
        quns.push({ qnId: element.qnId, answer: element.answer }),
      );

      const createQuestionaireForBaits = {
        token: this.$route.query.token,
        qns: quns,
      };

      var api = '/question/user';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }

      const response = this.$axios
        .post(api, createQuestionaireForBaits)
        .then((res) => {
          if (res.data.result) {
            this.congratsMessage = false;
            this.setLoader(false);
            // fetch baits list after casting a new bait
            this.getBaitsList({ pageNum: '', pageSize: '' });
            this.$toast.open({
              message: 'Bait successfully casted',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
            this.resetQuestionares();
            VoerroModal.hide('questionaire-modal');
            this.$emit('onsaveingQuestionaireBaits');
          }
        })
        .catch((error) => {
          this.setLoader(false);
          console.log(error);
        });
    },

    saveQuestionaire(item) {
      var nextQn = item.nextQn;

      // if somehow next question in selected option is not available then pick the next question from parent
      if (nextQn == '') nextQn = this.currentQuestion.nextQn;

      // if next question id is still empty so make it end
      if (nextQn == '') nextQn = 'end';

      if (nextQn !== 'end') {
        this.progressPercentage += this.progressRate;

        var obj = this.questionaires.filter(function (question) {
          if (question.qnId == nextQn) return true;
        });

        // reset inputs
        this.selectRadio = '';
        this.inputText = '';
        this.textareaText = '';
        this.inputGroup = [];

        if (obj.length > 0) this.currentQuestion = obj[0];
        else alert('deadend');

        this.questionsSelected[
          this.questionsSelected.length - 1
        ].answer = Array.isArray(item.text) ? item.text : [item.text];
        this.questionsSelected.push(this.currentQuestion);
        this.updateLocalStorageQuestions();
      } else {
        this.progressPercentage = 100;
        // save answer inbaits object
        this.questionsSelected[
          this.questionsSelected.length - 1
        ].answer = Array.isArray(item.text) ? item.text : [item.text];

        if (this.page === 'baits') {
          this.isUserDetails = false;
          this.updateLocalStorageQuestions();
          this.saveQuestionaireForBaits();
        } else {
          this.isUserDetails = true;
          this.updateLocalStorageQuestions();
        }
      }
    },

    updateLocalStorageQuestions() {
      // Store in local Storage
      let data = JSON.parse(localStorage.getItem('questionaire')) || {};
      data = this.questionsSelected;
      this.setLocalStorage(data);
    },
    resetQuestionares() {
      this.currentQuestion = this.questionaires[0];
      this.questionsSelected = [];
      this.updateLocalStorageQuestions();
      this.questionsSelected.push(this.currentQuestion);
      this.selectRadio = '';
      this.isUserDetails = false;
      this.textareaText = '';
      this.progressPercentage = 0;
    },
    checkTextLimit() {
      if (this.textareaText.length >= this.textLimit) {
        this.textareaText = this.textareaText.substring(0, this.textLimit);
      }
      this.textRemaining = this.textLimit - this.textareaText.length;
    },
  },
};
</script>
