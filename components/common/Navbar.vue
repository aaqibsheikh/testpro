<template>
  <div :class="[bgClass == undefined ? 'bg-baits-blue' : bgClass]">
    <header :class="[view.atTopOfPage ? 'text-white' : 'fixed left-0 bg-white shadow-2xl']" class="flex w-full items-center flex-wrap m-auto top-0 z-20">
      <div class="flex w-full justify-between xl:max-w-screen-xl lg:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl m-auto">
        <div class="flex items-center justify-between px-4 py-3 p-0 bg-red">
          <div @click="goToHome" class="cursor-pointer">
            <img :src="require('~/static/images/logo.png')" v-show="view.atTopOfPage" class="h-12 logoHeight" />
            <img :src="require('~/static/images/logo_blue.png')" v-show="!view.atTopOfPage" class="h-12 logoHeight" />
          </div>
        </div>
        <!-- Desktop view -->
        <div class="nav-container">
          <nav class="px-2 pt-2 pb-4 flex p-0">
            <!-- <nuxt-link
              to="/how-it-works"
              :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
              class="block py-4 font-bold px-3 text-xl"
              >Find me an Expert</nuxt-link
            >
            <nuxt-link to="/" :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']" class="block py-4 font-bold px-3 text-xl"
              >Browse Professionals</nuxt-link
            > -->
            <div class="relative inline-block text-left">
              <div>
                <span class="rounded-md shadow-sm">
                  <button
                    type="button"
                    :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
                    class="block py-4 font-bold px-3 text-xl flex focus:outline-none"
                    @click="
                      isExplore = !isExplore;
                      isAbout = false;
                    "
                  >
                    Explore
                    <!-- Heroicon name: chevron-down -->
                    <svg class="m-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div v-show="isExplore" @mouseleave="isExplore = false" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-30 -mr-5">
                <div class="rounded-md bg-white shadow-xs">
                  <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/providers"
                      >Financial Professionals</nuxt-link
                    >
                    <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/blogs"
                      >Blogs</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="relative inline-block text-left">
              <div>
                <span class="rounded-md shadow-sm">
                  <button
                    type="button"
                    :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
                    class="block py-4 font-bold px-3 text-xl flex focus:outline-none"
                    @click="
                      isAbout = !isAbout;
                      isExplore = false;
                    "
                  >
                    About
                    <!-- Heroicon name: chevron-down -->
                    <svg class="m-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div v-show="isAbout" @mouseleave="isAbout = false" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-30 -mr-5">
                <div class="rounded-md bg-white shadow-xs">
                  <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <!-- <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/"
                      >About us</nuxt-link
                    > -->
                    <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/how-it-works"
                      >How it works</nuxt-link
                    >
                    <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/contact"
                      >About Us</nuxt-link
                    >
                    <nuxt-link
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 font-bold hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      to="/contact"
                      >Contact Us</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- <nuxt-link
            v-if="view.atTopOfPage"
            to="/account?tab=signup"
            :class="[
              $route.path === '/' || $route.path === '/contact'
                ? 'text-white'
                : 'text-gray-800 hover:text-baits-blue border-blue border-indigo-500 border-4',
            ]"
            class="border-2 border-white rounded-lg block py-3 font-bold px-4 text-xl"
            >Cast a Bite</nuxt-link
          >
          <nuxt-link
            v-else
            to="/account?tab=signup"
            :class="[
              $route.path === '/' || $route.path === '/contact'
                ? 'text-white'
                : 'text-gray-800 hover:text-baits-blue border-blue border-indigo-500 border-4',
            ]"
            class="border-2 border-indigo-500 rounded-lg block py-3 font-bold px-4 text-xl"
            >Cast a Bite</nuxt-link
          > -->
            <nuxt-link
              v-if="!haveUser"
              to="/account?tab=signup"
              :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
              class="block py-4 font-bold px-3 text-xl cursor-pointer"
            >
              Sign Up
            </nuxt-link>
            <nuxt-link
              v-if="!haveUser"
              to="/account?tab=login"
              :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
              class="block py-4 font-bold px-3 text-xl cursor-pointer"
              >Login
            </nuxt-link>
            <nuxt-link
              v-else
              to="/dashboard"
              :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
              class="block py-4 font-bold px-3 text-xl"
              >{{ user.firstName }}
            </nuxt-link>
            <div
              @click="logout"
              v-if="haveUser"
              :class="[view.atTopOfPage ? 'text-white' : 'text-gray-800 hover:text-baits-blue']"
              class="cursor-pointer block py-4 font-bold px-3 text-xl"
            >
              Logout
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['bgClass'],
  data() {
    return {
      isExplore: false,
      isAbout: false,
      view: {
        atTopOfPage: true,
      },
      img1: require('~/static/images/logo.png'),
      img2: require('~/static/images/logo_blue.png'),
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
    haveUser() {
      if (this.user !== null && Object.keys(this.user).length > 0) {
        return this.user;
      }
      return false;
    },
    logoSrc() {
      return this.$route.path === '/' || this.$route.path === '/contact' ? this.img1 : this.img2;
    },
  },
  methods: {
    ...mapActions({
      userLogout: 'user/userLogout',
    }),
    goToHome() {
      this.$router.push('/');
    },
    logout() {
      this.$router.push('/dashboard/logout');
    },
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.atTopOfPage) this.view.atTopOfPage = false;
      } else {
        // user is at top of page
        if (!this.view.atTopOfPage) this.view.atTopOfPage = true;
      }
    },
    checkUser(e) {
      this.$emit('user-enter', e);
      // this must change!
      // should check if the user has the token or not
    },
  },
};
</script>
<style lang="scss" scoped>
// header {
//   z-index: 30;
//   background-color: transparent;
//   margin: unset;

//   button:focus {
//     outline: none;
//   }

//   svg {
//     margin-top: 3px;
//     margin-right: 3px;
//   }
// }

// header.scrolled {
//   @apply shadow-2xl;
//   border-bottom: 0px;
//   background-color: #ffffff;
//   max-width: 1280px;
//   border-radius: 5px;
//   width: 100vw;
//   max-width: 2560px;
//   left: 0;
//   justify-content: center;

//   .mr-20 {
//     margin-right: 14rem;
//   }

//   .nav-container {
//     a,
//     button {
//       color: rgba(0, 112, 192, var(--text-opacity));
//     }
//   }
// }

@media (min-width: 1024px) and (max-width: 1279px) {
  .logoHeight {
    height: 3rem;
  }
}

@media (max-width: 1250px) {
  header.scrolled .mr-20 {
    margin-right: 0;
  }
}
</style>
