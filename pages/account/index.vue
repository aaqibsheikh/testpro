<template>
  <div>
    <div class="overflow-hidden">
      <template v-if="calcWidth <= 1023 && isDomReady">
        <MobileNavbar />
      </template>
      <template v-if="calcWidth > 1023 && isDomReady">
        <Navbar />
      </template>
      <div class="container m-auto lg:mt-20 md:mt-48 mt-24 md:mb-20 mb-10 shadow-none md:shadow-xl">
        <div class="flex flex-wrap">
          <!-- <template v-if="tab === 'signup'">

          </template> -->
          <!-- <template v-if="tab === 'login'"> -->
          <!-- <LoginText @onToggleTab="toggleTab" /> -->
          <!-- </template> -->
          <div class="w-full md:px-6 md:mx-0 mx-4 my-3 md:my-0 md:shadow-none md:mb-4" :class="{ 'md:w-full': tab === 'login' }">
            <!-- <div class="flex md:mt-10 mt-12 px-3 cursor-pointer">
              <div class="w-1/2 iconColor" :class="[tab === 'login' ? '' : 'bg-white']">
                <div
                  @click="toggleTab('login')"
                  :class="[
                    tab === 'login'
                      ? 'text-white bg-baits-blue'
                      : 'text-baits-blue hover:bg-baits-blue hover:text-white',
                  ]"
                  class="block py-4 text-center font-bold px-3 md:text-xl text-sm"
                >
                  <font-awesome-icon
                    :class="[
                      'mr-1 text-lg',
                      tab === 'login' ? 'text-white' : 'text-baits-blue',
                      calcWidth < 640 ? 'customFont2' : 'customFont',
                    ]"
                    :icon="['fas', 'sign-in-alt']"
                  />Login Now
                </div>
              </div>
              <div class="w-1/2 iconColor2" :class="[tab === 'signup' ? '' : 'bg-white']">
                <div
                  @click="toggleTab('signup')"
                  :class="[
                    'block py-4 text-center font-bold px-3 md:text-xl text-sm',
                    tab === 'signup'
                      ? 'text-white bg-baits-blue'
                      : 'text-baits-blue hover:bg-baits-blue hover:text-white',
                  ]"
                >
                  <font-awesome-icon
                    :class="[
                      'mr-1 text-lg',
                      tab === 'signup' ? 'text-white' : 'text-baits-blue',
                      calcWidth < 640 ? 'customFont2' : 'customFont',
                    ]"
                    :icon="['fas', 'user-plus']"
                  />Sign up now
                </div>
              </div>
            </div> -->
            <template v-if="tab === 'signup'">
              <SignupForm />
            </template>
            <template v-if="tab === 'login'">
              <LoginForm />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import SignupForm from '@/components/signup/SignupForm';
import SignupText from '@/components/signup/SignupText';
import LoginForm from '@/components/login/LoginForm';
// import LoginText from '@/components/login/LoginText';
export default {
  middleware({ store, redirect, route }) {
    if (Object.keys(store.state.user.user).length > 0 && route.path === '/account') {
      return redirect('/dashboard');
    }
  },
  components: {
    Navbar,
    MobileNavbar,
    SignupForm,
    LoginForm,
    // LoginText,
  },
  data() {
    return {
      tab: this.$route.query.tab == 'signup' ? 'signup' : 'login',
      isDomReady: false,
    };
  },
  computed: {
    calcWidth() {
      return this.windowWidth;
    },
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    toggleTab(tab) {
      this.tab = tab;
      if (this.$route.query && this.$route.query.redirect) {
        this.$router.push(`/account?tab=${tab}&redirect=promotions`);
      } else {
        this.$router.push(`/account?tab=${tab}`);
      }
    },
  },
  watch: {
    $route() {
      this.tab = this.$route.query.tab;
    },
  },
};
</script>
<style>
.customFont {
  width: 20px !important;
  font-size: 20px !important;
  display: inline-block !important;
}

.iconColor:hover svg path,
.iconColor:hover {
  fill: white;
  color: white;
}

.iconColor2:hover svg path,
.iconColor2:hover {
  fill: white;
  color: white;
}

.customFont2 {
  width: 20px !important;
  font-size: 14px !important;
  display: inline-block !important;
}
</style>
