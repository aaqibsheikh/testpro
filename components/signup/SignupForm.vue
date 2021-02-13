<template>
  <div class="flex flex-col w-full h-auto">
    <!-- Header -->
    <div class="flex w-full h-auto justify-center items-center">
      <div class="flex w-full h-auto py-3 justify-center items-center text-2xl font-bold">
        <img class="w-40" src="~/static/images/logo_blue.png" />
      </div>
      <!-- <div @click="closeModal()" class="flex ml-auto h-auto justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#3182ce"
              stroke="#3182ce"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div> -->
      <!--Header End-->
    </div>
    <!-- Modal Content-->
    <div class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
      <div class="signup-container">
        <!-- component -->
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="text-lg text-baits-blue font-bold text-center text-3xl">Sign Up</div>
            <div class="relative mt-4 h-px bg-gray-300">
              <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span class="bg-white px-4 text-xs text-gray-500 uppercase"></span>
              </div>
            </div>
            <div class="social-signup flex w-full justify-around mt-6">
              <img src="~/static/images/fb-logo.png" class="rounded-full border-4 object-center object-cover border-white h-16 w-16 cursor-pointer" />
              <img src="~/static/images/ln.png" class="rounded-full border-4 object-center object-cover border-white h-16 w-16 cursor-pointer" />
              <img src="//logo.clearbit.com/google.com" class="rounded-full border-4 object-center object-cover border-white h-16 w-16 cursor-pointer" />
            </div>
            <div class="relative mt-6 h-px bg-gray-300">
              <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span class="bg-white px-4 text-xs text-gray-500 uppercase">Or</span>
              </div>
            </div>
            <div class="mt-10">
              <form action="#">
                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'user']" />
                    </div>
                    <input
                      v-model="register.firstName"
                      type="text"
                      name="firstName"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="First Name"
                      data-vv-as="first name"
                      v-validate="'required'"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('firstName')">{{ errors.first('firstName') }}</span>
                  </div>
                </div>

                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'user']" />
                    </div>
                    <input
                      v-model="register.lastName"
                      type="text"
                      name="lastName"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Last Name"
                      data-vv-as="last name"
                      v-validate="'required'"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('lastName')">{{ errors.first('lastName') }}</span>
                  </div>
                </div>

                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'at']" />
                    </div>
                    <input
                      v-model="register.email"
                      type="text"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Email"
                      name="email"
                      v-validate="'required|email'"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                  </div>
                </div>

                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'unlock']" />
                    </div>
                    <input
                      ref="password"
                      v-model="register.password"
                      type="password"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Password"
                      name="password"
                      v-validate="'required|min:8'"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                  </div>
                </div>

                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'unlock']" />
                    </div>
                    <input
                      v-model="register.confirmPassword"
                      type="password"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      data-vv-as="password"
                      v-validate="'required|min:8|confirmed:password'"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>
                  </div>
                </div>

                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center">
                    <div
                      class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                    >
                      <input
                        type="checkbox"
                        class="form-checkbox h-5 w-5 text-baits-blue"
                        id="agree_chk"
                        name="agree"
                        v-validate="'required'"
                        data-vv-as="Terms and Privacy"
                        v-model="agree"
                      />
                      <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                    <div class="select-none text-xs">
                      I agree to the
                      <a class="text-baits-blue" href="/terms" target="_blank">Platform Terms</a>
                      and
                      <a class="text-baits-blue" href="/policy" target="_blank">Privacy Policy</a>
                    </div>
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('agree')">{{ errors.first('agree') }}</span>
                  </div>
                </div>

                <div class="flex w-full">
                  <button
                    type="button"
                    @click="signup"
                    class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                  >
                    <span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                    <span class="mr-2 ml-1 uppercase">Proceed</span>
                  </button>
                </div>
              </form>
            </div>
            <div class="flex justify-center items-center mt-6">
              <div
                @click="openLogin"
                to="/account?tab=login"
                class="inline-flex cursor-pointer items-center font-bold text-gray-500 hover:text-baits-blue text-xs text-center"
              >
                <span class="ml-0">Already have an account? </span>
                <span class="ml-1">
                  <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'sign-in-alt']" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End of Modal Content-->
    <SignupSuccessModal />
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import SignupSuccessModal from '@/components/modal/SignupSuccessModal';

export default {
  components: {
    SignupSuccessModal,
  },
  data() {
    return {
      register: {},
      agree: false,
      mobilePrefix: '',
      selectedExt: '',
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      registerUser: 'user/registerUser',
    }),
    openLogin() {
      if (this.$route.path !== '/') this.$router.push(`/account?tab=login`);
      else {
        VoerroModal.hide('signup-modal');
        VoerroModal.show('login-modal');
      }
    },
    pdfFileHandler(name) {
      if (name === 'terms') {
        this.$router.push('/terms');
      }

      if (name === 'policy') {
        this.$router.push('/policy');
      }
    },
    passExtensionHandler(val) {
      if (val) {
        this.selectedExt = val;
        this.mobilePrefix = val.countryPrefix;
      }
    },
    signup() {
      this.$validator.validateAll().then((result) => {
        if (result && !this.hasExtError) {
          this.setLoader(true);

          const registationData = {
            firstName: this.register.firstName,
            lastName: this.register.lastName,
            email: this.register.email,
            mobilePrefix: this.mobilePrefix,
            mobile: this.register.mobile,
            password: this.register.password,
            role: 'baits', //default //this.register.role,
          };
          this.registerUser({ data: registationData })
            .then((response) => {
              if (response.status === 201 && response.data.result) {
                this.setLoader(false);
                VoerroModal.show('signup-success-modal');
                this.register = {};
                this.agree = false;
                this.$validator.reset();
              } else if (response.status === 201 && !response.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: 'The provided email is already in use',
                  type: 'error',
                  duration: 8000,
                  dismissible: true,
                });
              }
            })
            .catch((error) => {
              this.setLoader(false);
              this.$toast.open({
                message: 'Signup Failed...!',
                type: 'error',
                duration: 5000,
                dismissible: true,
              });
            });
        }
      });
    },
  },
};
</script>
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.l-p-3 {
  left: 0.75rem;
}
</style>
