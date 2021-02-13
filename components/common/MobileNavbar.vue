<template>
  <div>
    <header class="bg-baits-blue fixed top-0 w-full" style="z-index: 800">
      <div class="block px-4 py-3 text-center">
        <div @click="goToHome" class="cursor-pointer inline-block">
          <img :src="require('~/static/images/logo.png')" class="h-12 inline-block" />
        </div>
        <div class="lg:hidden inline-block float-left mt-1">
          <button @click="isOpen = !isOpen" type="button" class="block text-white hover:text-white active:text-white focus:text-white focus:outline-none">
            <svg class="sm:h-10 sm:w-10 h-8 w-8 fill-current" viewBox="0 0 24 24">
              <path
                v-if="isOpen"
                fill-rule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
              <path
                v-if="!isOpen"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile view -->
      <nav
        :class="isOpen ? 'block' : 'hidden'"
        class="px-2 pt-2 pb-4 absolute w-full h-screen bg-baits-blue text-white lg:hover:text-baits-blue hover:text-white text-xl"
      >
        <div>
          <div @click="toggleSidebarMenuItem(!isExplore, 'explore')" class="flex flex-wrap py-3 px-4 items-center justify-between cursor-pointer">
            <div class="">
              <span>Explore</span>
            </div>
            <div>
              <span>
                <font-awesome-icon class="w-4 h-4" :icon="['fas', 'chevron-down']" />
              </span>
            </div>
          </div>
          <slide-up-down :active="isExplore" :duration="500">
            <div class="text-lg">
              <div @click="goToPath('/providers')" class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer">
                <div class="pl-2">
                  <span>Financial Professionals</span>
                </div>
              </div>
              <div @click="goToPath('/blogs')" class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer">
                <div class="pl-2">
                  <span>Blogs</span>
                </div>
              </div>
            </div>
          </slide-up-down>
        </div>

        <div>
          <div @click="toggleSidebarMenuItem(!isAbout, 'about')" class="flex flex-wrap py-3 px-4 items-center justify-between cursor-pointer">
            <div class="">
              <span>About</span>
            </div>
            <div>
              <span>
                <font-awesome-icon class="w-4 h-4" :icon="['fas', 'chevron-down']" />
              </span>
            </div>
          </div>
          <slide-up-down :active="isAbout" :duration="500">
            <div class="text-lg">
              <div @click="goToPath('/how-it-works')" class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer">
                <div class="pl-2">
                  <span>How it works</span>
                </div>
              </div>
              <div @click="goToPath('/contact')" class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer">
                <div class="pl-2">
                  <span>About us</span>
                </div>
              </div>
              <div @click="goToPath('/contact')" class="flex flex-wrap py-3 px-8 items-center justify-start cursor-pointer">
                <div class="pl-2">
                  <span>Contact us</span>
                </div>
              </div>
            </div>
          </slide-up-down>
        </div>
        <!-- 
        <div @click="goToPath('/how-it-works')" class="text-white lg:hover:text-baits-blue hover:text-white block py-4 font-bold px-3 text-xl">
          Find an Expert
        </div>
        <div @click="goToPath('/')" class="text-white lg:hover:text-baits-blue hover:text-white block py-4 font-bold px-3 text-xl">Browse Professionals</div>
        <div class="text-white lg:hover:text-baits-blue hover:text-white block py-4 font-bold px-3 text-xl">
          <button
            class="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
            @click="goToPath('/account?tab=signup')"
          >
            Cast a bite
          </button>
        </div>
        <div @click="goToPath('/contact')" class="text-white lg:hover:text-baits-blue hover:text-white block py-4 font-bold px-3 text-xl">Contact Us</div>
        -->

        <div v-if="!haveUser">
          <div @click="goToPath('/account?tab=signup')" class="block py-3 px-4 cursor-pointer">Sign Up</div>
          <div @click="goToPath('/account?tab=login')" class="block py-3 px-4 cursor-pointer">Login</div>
        </div>
        <div v-else>
          <div @click="goToPath('/dashboard')" class="block py-3 px-4 cursor-pointer">
            {{ user.firstName }}
          </div>
          <div @click="logout" class="block py-3 px-4 cursor-pointer">Logout</div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false,
      isExplore: false,
      isAbout: false,
    };
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
      const img1 = require('~/static/images/logo.png');
      const img2 = require('~/static/images/logo.png');
      return this.$route.path === '/' ? img1 : img2;
    },
  },
  methods: {
    ...mapActions({
      userLogout: 'user/userLogout',
    }),
    toggleSidebarMenuItem(val, type) {
      if (type === 'explore') {
        this.isExplore = val;
      } else if (type === 'about') {
        this.isAbout = val;
      }
      // if (type === 'blogs') this.blogMenu = val;
      // if (type === '') this.adminMenu = this.promotionMenu = val;
    },
    goToPath(path) {
      if (path === '/') {
        this.$router.push({ path: '/', hash: '#about-box' });
      } else {
        this.$router.push(path);
      }
      this.isOpen = false;
    },
    goToHome() {
      this.$router.push('/');
    },
    logout() {
      this.$router.push('/dashboard/logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  border-top: 2px solid white;
  margin-top: 10%;
  bottom: 0;
}
</style>
