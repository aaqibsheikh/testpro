<template>
  <div>
    <template v-if="calcWidth <= 1023 && isDomReady">
      <MobileNavbar />
    </template>
    <template v-if="calcWidth > 1023 && isDomReady">
      <Navbar />
    </template>
    <div class="container mx-auto lg:mt-0 md:mt-32 mt-20">
      <div class="sm:mx-0 mx-4 mt-10">
        <ul class="list-reset flex border-b-2">
          <li v-for="(tab, key) in tabs" :key="key" @click="switchTab(tab.value)">
            <div
              :class="[
                tab.value == selectedTab
                  ? '-mb-px border-baits-blue text-baits-blue font-semibold border-b-2 border-baits-blue'
                  : 'text-baits-gray-lighter hover:text-baits-blue',
              ]"
              class="inline-block py-2 px-4 cursor-pointer"
            >
              {{ tab.text }}
            </div>
          </li>
        </ul>
      </div>

      <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-8">
        <div class="bg-white border border-baits-light-gray shadow-3xl rounded-2xl sm:mx-0 mx-4" v-for="(provider, key) in providersList" :key="key">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full">
              <div class="w-full">
                <img v-if="provider.avatar" :src="provider.avatar" class="object-cover w-full rounded-t-2xl" style="height: 400px" />
                <img v-else src="~/static/images/default-user.jpg" class="object-cover w-full rounded-t-2xl" style="height: 400px" />
              </div>
              <div
                class="absolute bottom-0 right-0 bg-white py-1 pl-6 pr-2 font-bold mr-2 mb-4 rounded-full flex items-center cursor-pointer"
                @click="openSignupModal"
              >
                <span class="text-baits-green font-normal mr-1">{{ provider.recommendation }}</span>
                <div class="inline-block bg-baits-green rounded-full text-center w-8 h-8 border-2 border-white z-10 flex items-center justify-center">
                  <font-awesome-icon class="text-white w-4 h-4" :icon="['fas', 'thumbs-up']" />
                </div>
                <div class="text-white text-xs font-bold bg-baits-green inline-block uppercase px-4 rounded-r-full py-1 -ml-2 z-0">Recommendations</div>
              </div>
            </div>
            <div class="w-full px-4 mt-2 flex flex-wrap items-center justify-between">
              <h2 class="block text-baits-blue font-bold text-lg">{{ provider.firstName }} {{ provider.lastName }}</h2>
              <!-- wait for rating calculation -->
              <!-- <div class="flex items-center">
                <h2 class="text-baits-blue text-3xl inline-block">{{ provider.rating }}</h2>
                <div class="inline-block">
                  <star-rating :max-rating="1" :increment="0.1" :read-only="true" :star-size="18" :show-rating="false" v-model="provider.rating"></star-rating>
                </div>
              </div> -->
            </div>
            <div class="w-full px-4">
              <span class="text-sm text-gray-500">{{ provider.designation }}</span>
            </div>
            <div class="w-full px-4">
              <span class="text-sm text-gray-500">{{ provider.company }} | {{ provider.location || 'N/A' }}</span>
            </div>

            <div class="w-full px-4 my-2">
              <p class="text-xs text-gray-500">
                <span>
                  {{ showSome(provider.desc) || 'N/A' }}
                </span>
                <span v-if="provider.desc" class="text-md text-baits-blue font-bold cursor-pointer" @click="$router.push(`/providers/${provider.id}`)"
                  >Read more</span
                >
              </p>
            </div>

            <div class="w-full grid grid-cols-2 gap-2 my-3 px-4">
              <div>
                <button
                  class="shadow-sm w-full py-2 px-10 text-sm font-bold bg-baits-blue text-white rounded-lg focus:outline-none flex items-center justify-center"
                  @click="openSignupModal"
                >
                  <font-awesome-icon class="mr-1 w-4 h-4" :icon="['fas', 'question']" />
                  <span>Ask</span>
                </button>
              </div>
              <div>
                <button
                  class="shadow-sm w-full py-2 px-10 text-sm font-bold bg-baits-green text-white rounded-lg focus:outline-none flex items-center justify-center"
                  @click="$router.push(`/providers/${provider.id}`)"
                >
                  <font-awesome-icon class="mr-1 w-4 h-4" :icon="['fas', 'eye']" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-6">
        <button class="focus:outline-none text-baits-blue border border-baits-blue rounded-3xl text-sm px-6 py-2" @click="showMore">Show More</button>
      </div>
    </div>
    <Footer />
    <LoginModal v-if="isDomReady" />
    <SignupModal v-if="isDomReady" />
    <ProvidersModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Footer from '@/components/common/Footer';
import LoginModal from '@/components/login/Login';
import SignupModal from '@/components/signup/Signup';
export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
    LoginModal,
    SignupModal,
  },
  data() {
    return {
      limit: true,
      isDomReady: false,
      selectedTab: 'Banking',
      tabs: [
        { text: 'Banking & Finance', value: 'Banking' },
        { text: 'Real Estate', value: 'Real Estate' },
        { text: 'Insurance', value: 'Insurance' },
      ],
    };
  },

  async fetch({ store, query }) {
    this.selectedTab = query.industry;
    await store.dispatch('provider/fetchAllProviders', { industry: query.industry || 'Banking', type: 'public' });
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      providers: 'provider/getProviders',
    }),
    calcWidth() {
      return this.windowWidth;
    },
    providersList() {
      return this.limit ? this.providers.slice(0, 6) : this.providers;
    },
    haveUser() {
      if (this.user !== null && Object.keys(this.user).length > 0) {
        return this.user;
      }
      return false;
    },
  },
  mounted() {
    this.isDomReady = true;
    // if route from home using dropdown
    this.selectedTab = this.$route.query && this.$route.query.industry ? this.$route.query.industry : 'Banking';
  },
  methods: {
    ...mapActions({
      fetchAllProviders: 'provider/fetchAllProviders',
    }),
    switchTab(value) {
      this.selectedTab = value;
      this.fetchAllProviders({ industry: this.selectedTab, type: 'public' });
    },
    showMore() {
      if (!this.limit) {
        if (!this.haveUser) this.openSignupModal();
        else this.$router.push('/dashboard/providers');
      }
      this.limit = false;
    },
    pagechanged(page) {
      window.scrollTo(0, 0);
    },
    openSignupModal() {
      console.log('openSignupModal');
      VoerroModal.hide('login-modal');
      VoerroModal.show('signup-modal');
    },
    showSome(textString) {
      if (textString.length > 100) {
        return textString.substring(0, 100) + '...';
      } else {
        return textString;
      }
    },
  },
};
</script>
<style></style>
