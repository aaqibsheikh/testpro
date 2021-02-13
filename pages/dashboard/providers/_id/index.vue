<template>
  <div class="w-full">
    <Header />
    <div class="w-full md:px-12 sm:px-6 px-0 m-auto sm:mt-8 mt-32 md:mt-16">
      <div class="flex flex-wrap mt-4 lg:mx-0 mx-4">
        <div class="w-full bg-white shadow-md border border-gray-200 mb-4 lg:p-10 p-5 flex flex-wrap items-center lg:divide-x lg:divide-gray-300">
          <div class="lg:w-3/5 w-full flex flex-wrap items-center lg:justify-start justify-center">
            <template v-if="provider.avatar">
              <img class="rounded-full object-cover object-fit w-24 h-24" :src="provider.avatar" />
            </template>
            <template v-else>
              <img class="rounded-full object-cover object-fit w-24 h-24" src="~/static/images/default-user.jpg" />
            </template>

            <div class="ml-4 lg:flex-1 flex-auto">
              <div class="flex flex-wrap items-center justify-between">
                <h2 class="text-baits-black-dark text-2xl leading-tight mb-1 mt-6">{{ fullName }}</h2>
                <!-- wait for rating calculation -->
                <!-- <div class="mr-4 mt-6 flex flex-wrap items-center">
                  <div class="text-lg text-gray-700" style="margin-top: 3px">{{ provider.rating }}</div>
                  <star-rating
                    :max-rating="10"
                    :increment="0.1"
                    :read-only="true"
                    :star-size="18"
                    :show-rating="false"
                    v-model="provider.rating"
                    class="ml-2 inline-block"
                  ></star-rating>
                </div> -->
              </div>
              <p class="text-sm text-gray-600 leading-tight">{{ provider.designation }}</p>
              <p class="text-sm text-gray-600 leading-tight">{{ provider.company }} | {{ provider.location || 'N/A' }}</p>
              <div class="mt-3">
                <button @click="askProvider" class="focus:outline-none py-1 px-4 text-xs text-white font-semibold rounded-md bg-baits-blue">Ask</button>
                <!-- wait for referral module -->
                <!-- <button class="focus:outline-none py-1 px-4 text-xs text-white font-semibold rounded-md bg-baits-green">Refer</button> -->
              </div>
            </div>
          </div>
          <div class="lg:w-2/5 w-full lg:mt-0 mt-8">
            <div class="px-6 py-4">
              <!-- <div class="mb-1 flex flex-wrap items-center justify-between">
                <div class="w-1/2 font-semibold text-xs">Availability:</div>
                <div class="w-1/2 text-xs">Full time (40hr/wk)</div>
              </div>
              <div class="mb-1 flex flex-wrap items-center justify-between">
                <div class="w-1/2 font-semibold text-xs">Age:</div>
                <div class="w-1/2 text-xs">32</div>
              </div> -->
              <div class="mb-1 flex flex-wrap items-center justify-between">
                <div class="w-1/2 font-semibold text-xs">Location:</div>
                <div class="w-1/2 text-xs text-right">{{ provider.location }}</div>
              </div>
              <!-- <div class="mb-1 flex flex-wrap items-center justify-between">
                <div class="w-1/2 font-semibold text-xs">Years Experience:</div>
                <div class="w-1/2 text-xs">6</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="lg:mx-0 mx-4 mt-6">
        <ul class="list-reset flex border-b-2">
          <li v-for="(tab, key) in tabs" :key="key">
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

      <div class="grid grid-cols-12 gap-2 mt-4">
        <div class="lg:col-span-3 col-span-12 lg:mx-0 mx-4">
          <div class="p-10 shadow-lg mb-3 border border-gray-200">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Summary</h2>
            <ul class="list-style-none text-sm text-gray-600">
              <li class="flex flex-wrap justify-between">
                <div>Recommendations</div>
                <div>{{ provider.recommendation }}</div>
              </li>
              <li class="flex flex-wrap justify-between">
                <div>Reviews</div>
                <div>{{ provider.reviewCount }}</div>
              </li>
              <!-- wait for promotion release -->
              <!-- <li v-if="provider.promotion.length" class="flex flex-wrap justify-between">
                <div>Promotions</div>
                <div class="text-right">{{ provider.promotion.length }}</div>
              </li> -->
            </ul>
          </div>

          <div class="p-10 shadow-lg mb-3 border border-gray-200">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Verifictions</h2>
            <ul class="list-style-none text-sm text-gray-600">
              <li class="flex flex-wrap justify-between">
                <div>Email verified</div>
                <div v-if="provider.verification.email == 1">
                  <font-awesome-icon class="text-baits-green w-5 h-5" :icon="['fas', 'check']" />
                </div>
              </li>
              <li class="flex flex-wrap justify-between">
                <div>Phone verified</div>
                <div v-if="provider.verification.phone == 1">
                  <font-awesome-icon class="text-baits-green w-5 h-5" :icon="['fas', 'check']" />
                </div>
              </li>
              <li class="flex flex-wrap">
                <div>Payment verified</div>
                <div v-if="provider.verification.payment == 1">
                  <font-awesome-icon class="text-baits-green w-5 h-5" :icon="['fas', 'check']" />
                </div>
              </li>
            </ul>
          </div>

          <div class="p-10 shadow-lg border border-gray-200">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Expertise</h2>
            <div
              class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2"
              :key="key"
              v-for="(expertise, key) in provider.expertise"
            >
              <span v-if="expertise">{{ expertise }}</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 col-span-12 lg:mx-0 mx-4">
          <div class="p-10 shadow-lg border border-gray-200">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">About</h2>
            <p class="text-sm text-gray-700 mb-4 leading-relaxed white-pre-line">
              {{ provider.desc }}
            </p>
          </div>

          <div class="p-10 shadow-lg border border-gray-200">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Awards</h2>
            <p class="text-sm text-gray-700 mb-4 leading-relaxed white-pre-line">
              {{ provider.descAwards }}
            </p>
          </div>

          <div class="p-10 shadow-lg border border-gray-200">
            <!-- <h2 class="text-lg text-gray-700 font-semibold mb-2">About</h2>
            <p class="text-sm text-gray-700 mb-4 leading-relaxed">
              {{ provider.desc }}
            </p>
            <hr class="mb-4" /> -->
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Recent Reviews</h2>
            <!-- <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">android</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">php</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">nuxt</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">vue</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">codeigniter</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">luman</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">laragon</div>
            <div class="border border-grayp-200 inline-block text-sm px-4 py-1 text-gray-600 rounded-full mr-1 mb-2">aws</div> -->
            <p class="text-sm text-gray-700 mb-4 leading-relaxed white-pre-line">N.A</p>
          </div>
        </div>

        <div class="lg:col-span-3 col-span-12 lg:mx-0 mx-4">
          <!-- <div class="p-10 shadow-lg border border-gray-200 mb-3 text-center">
            <img src="~/static/images/logo_blue.png" class="inline-block w-40 mt-2" />
            <div>
              <p class="my-2 text-sm text-gray-600">To see more providers</p>
              <button class="bg-baits-blue text-white text-xs px-4 py-1 mb-1 rounded-md">Signup</button>
            </div>
          </div> -->

          <!-- <div class="p-10 shadow-lg border border-gray-200 mb-3">
            <h2 class="text-lg text-baits-blue font-semibold mb-2">Links</h2>
            <ul class="list-style-none text-sm text-gray-600">
              <li><nuxt-link to="/">Home</nuxt-link></li>
              <li><nuxt-link to="/providers">Providers</nuxt-link></li>
              <li><nuxt-link to="/blogs">Blogs</nuxt-link></li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
    <AskProviderModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Header from '@/components/dashboard/Header';
import AskProviderModal from '@/components/modal/AskProviderModal';
export default {
  layout: 'dashboard',
  components: {
    Navbar,
    MobileNavbar,
    Header,
    AskProviderModal,
  },
  data() {
    return {
      isDomReady: false,
      selectedTab: 'profile',
      tabs: [{ text: 'Profile', value: 'profile' }],
    };
  },

  async fetch({ store, params }) {
    await store.dispatch('provider/fetchProviderById', { id: params.id });
  },
  computed: {
    ...mapGetters({
      provider: 'provider/getProviderDetail',
    }),
    fullName() {
      return this.provider.firstName + ' ' + this.provider.lastName;
    },
    calcWidth() {
      return this.windowWidth;
    },
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    askProvider() {
      VoerroModal.show('ask-provider-modal');
    },
  },
};
</script>
<style></style>
