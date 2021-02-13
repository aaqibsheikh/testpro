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
      <div class="login-container w-96 min-w-full">
        <!-- component -->
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="text-lg text-baits-blue font-bold text-center text-3xl">Log In</div>
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

            <div class="mt-10 min-w-full">
              <form action="#">
                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <!-- class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400" -->
                    <div class="absolute l-p-3">
                      <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'user']" />
                    </div>
                    <!-- class="baits-input appearance-none block w-full py-1 pl-25 pr-6" -->
                    <!-- class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" -->
                    <input
                      v-model="credientials.email"
                      v-validate="'required|email'"
                      name="email"
                      type="email"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Email"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('email')">
                      {{ errors.first('email') }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col mb-6 text-gray-700">
                  <div class="flex items-center relative">
                    <div class="absolute l-p-3">
                      <span>
                        <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'unlock']" />
                      </span>
                    </div>
                    <input
                      v-model="credientials.password"
                      v-validate="'required'"
                      name="password"
                      type="password"
                      class="baits-input appearance-none block w-full py-1 pl-10"
                      placeholder="Password"
                    />
                  </div>
                  <div class="validate-error-msg">
                    <span class="text-xs" v-if="errors.has('password')">
                      {{ errors.first('password') }}
                    </span>
                  </div>
                </div>

                <div class="flex w-full">
                  <button
                    type="button"
                    class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                    @click="login"
                  >
                    <span> </span>
                    <span class="mr-2 uppercase font-bold">Log in</span>
                    <span class="ml-1">
                      <font-awesome-icon class="text-white w-5 h-5" :icon="['fas', 'sign-in-alt']" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div class="flex justify-center items-center mt-6">
              <p class="inline-flex items-center font-bold text-gray-500 hover:text-baits-blue text-xs text-center" @click="resetEmail">
                <span class="ml-0">Forgot Password? </span>
                <span class="ml-1">
                  <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'key']" />
                </span>
              </p>
            </div>
            <div class="flex justify-center items-center mt-1">
              <div @click="openSignup" class="inline-flex cursor-pointer items-center font-bold text-gray-500 hover:text-baits-blue text-xs text-center">
                <span class="ml-0">New Here? Sign Up </span>
                <span class="ml-1">
                  <font-awesome-icon class="text-baits-blue w-5 h-5" :icon="['fas', 'user-plus']" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <ResetPasswordModal v-if="isDomReady" />
        <ConfirmEmailModal v-if="isDomReady" />
      </div>
    </div>
    <!-- End of Modal Content-->
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import ResetPasswordModal from '@/components/modal/ResetPasswordModal';
import ConfirmEmailModal from '@/components/modal/ConfirmEmailModal';

export default {
  components: {
    ResetPasswordModal,
    ConfirmEmailModal,
  },
  data() {
    return {
      credientials: {
        email: '',
        password: '',
        rememberMe: true,
      },
      isDomReady: false,
    };
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setToken: 'user/setToken',
    }),
    ...mapActions({
      loginUser: 'user/loginUser',
      fetchUser: 'user/fetchUser',
    }),
    openSignup() {
      if (this.$route.path !== '/') this.$router.push(`/account?tab=signup`);
      else {
        VoerroModal.hide('login-modal');
        VoerroModal.show('signup-modal');
      }
    },
    login() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.setLoader(true);
          const loginData = {
            email: this.credientials.email,
            password: this.credientials.password,
            rememberMe: this.credientials.rememberMe,
          };

          const response = await this.loginUser({ data: loginData });
          if (response.status === 201 && response.data.hasOwnProperty('accessToken')) {
            this.$cookies.set('baitsToken', response.data.accessToken);
            this.setToken(response.data.accessToken);
            this.fetchUser(response.data.accessToken).then((userData) => {
              var route = '';
              var isProvider = userData.roles && userData.roles.includes('provider');
              var isConsumer = userData.roles && userData.roles.includes('consumer');

              if (this.$route.query.hasOwnProperty('redirect')) {
                // check redirect and permission
                let query = this.$route.query.redirect.toLowerCase();
                console.log('query', query);
                switch (query) {
                  case 'baitsprofile': {
                    if (isConsumer) {
                      route = '/dashboard/profile/general';
                    }
                    break;
                  }
                  case 'bitesprofile': {
                    if (isProvider) {
                      route = '/dashboard/profile/provider';
                    }
                    break;
                  }
                  case 'profile': {
                    route = '/dashboard/profile';
                    break;
                  }
                  case 'baits': {
                    route = '/dashboard/baits';
                    break;
                  }
                  case 'bite': {
                    route = '/dashboard/bites';
                    break;
                  }
                  case 'promotions': {
                    route = `/dashboard/promotions/listing/${this.$route.query.id}`;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              }

              // redirect user based on his/her role if no redirect is specified
              if (!route) {
                route = '/dashboard';
                // if (isProvider) {
                //   route = '/dashboard/bites';
                // } else if (isConsumer) {
                //   route = '/dashboard';
                // }
              }

              if (route) {
                this.$router.push(route);
                this.setLoader(false);
                this.$toast.open({
                  message: 'Login Successfully...!',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });
              }
            });
          } else if (
            !response.data.result &&
            response.data.hasOwnProperty('error') &&
            response.data.error === 'Email is not verified. Please click on the link in the verification email.'
          ) {
            this.setLoader(false);
            VoerroModal.show('confirm-email-modal');
          } else if (response.data.hasOwnProperty('result') && !response.data.result && response.data.error === 'Invalid email or password.') {
            this.setLoader(false);
            this.$toast.open({
              message: response.data.error,
              type: 'error',
              duration: 5000,
              dismissible: true,
            });
          }
        }
      });
    },
    resetEmail() {
      VoerroModal.show('reset-password-modal');
    },
  },
};
</script>
<style scoped>
.l-p-3 {
  left: 0.75rem;
}

.pl-25 {
  padding-left: 6.5rem;
}

.reset-password-modal > .modal-box > .close-modal {
  display: none;
}
</style>
