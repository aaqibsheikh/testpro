<template>
  <div class="w-full">
    <Header />

    <div class="text-xs sm:text-base pb-4">
      <!-- Tab -->
      <!-- <div class="pt-10 mt-16 sm:mt-0 pb-4">
        <div class="w-11/12 mx-auto px-4">
          <div class="flex flex-wrap mb-2">
            <template>
              <div
                @click="toggleTab('profile')"
                :class="[tab === 'profile' ? 'text-baits-green' : 'text-gray-600']"
                class="block py-0 cursor-pointer md:text-xl text-base font-bold pr-2 border-r-2 border-gray-600"
              >
                Profile
              </div>
              <div
                @click="toggleTab('provider')"
                :class="[tab === 'provider' ? 'text-baits-green' : 'text-gray-600']"
                class="block py-0 cursor-pointer md:text-xl text-base font-bold pl-2 pr-2 border-gray-600"
              >
                Provider
              </div>
            </template>
          </div>
        </div>
      </div> -->
      <div class="w-full sm:px-10 px-0">
        <ul class="list-reset flex border-b-2 lg:mx-0 mx-4">
          <li v-for="(item, key) in tabs" :key="key" @click="toggleTab(item.value)">
            <div
              :class="[
                item.value == tab
                  ? '-mb-px border-baits-blue text-baits-blue font-semibold border-b-2 border-baits-blue'
                  : 'text-baits-gray-lighter hover:text-baits-blue',
              ]"
              class="inline-block py-2 px-4 cursor-pointer"
            >
              {{ item.text }}
            </div>
          </li>
        </ul>
      </div>

      <!-- Header -->
      <div class="w-full sm:px-10 px-0">
        <div class="flex flex-wrap mt-4 lg:mx-0 mx-4">
          <div class="w-full bg-white shadow-md border border-gray-200 mb-4 lg:p-10 p-5">
            <nuxt-link :to="checkTab" class="w-full flex flex-wrap items-center justify-end">
              <font-awesome-icon :icon="['fas', 'edit']" class="float-right cursor-pointer text-baits-blue w-5 h-5" />
            </nuxt-link>
            <div class="flex flex-wrap items-center lg:divide-x lg:divide-gray-300">
              <div class="lg:w-3/5 w-full flex flex-wrap items-center lg:justify-start justify-center">
                <template v-if="user.avatar">
                  <img class="rounded-full object-cover object-fit w-24 h-24" :src="user.avatar" />
                </template>
                <template v-else>
                  <img class="rounded-full object-cover object-fit w-24 h-24" src="~/static/images/default-user.jpg" />
                </template>

                <div class="ml-4 lg:flex-1 flex-auto sm:text-left text-center">
                  <div class="flex flex-wrap items-center sm:justify-between justify-center">
                    <h2 class="text-baits-black-dark text-2xl leading-tight mb-1 mt-2">{{ fullName }}</h2>
                  </div>
                  <p class="text-sm text-gray-600 leading-tight">{{ userProfile.email }}</p>
                </div>
              </div>
              <div class="lg:w-2/5 w-full lg:mt-0 mt-8">
                <div class="p-4">
                  <div class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Location:</div>
                    <div class="w-1/2 text-xs">{{ userProfile.country }}</div>
                  </div>
                  <div class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Contact Preference:</div>
                    <div class="w-1/2 text-xs">{{ userProfile.messagePreference }}</div>
                  </div>

                  <div v-if="tab === 'profile'" class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Born:</div>
                    <div class="w-1/2 text-xs">{{ dateOfBirth }}</div>
                  </div>
                  <div v-if="tab === 'profile'" class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Location:</div>
                    <div class="w-1/2 text-xs">{{ userProfile.country }}</div>
                  </div>
                  <div v-if="tab === 'profile'" class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Nationality:</div>
                    <div class="w-1/2 text-xs">{{ userProfile.nationality }}</div>
                  </div>
                  <div v-if="tab === 'provider' && biteProfile.descIntro" class="mb-1 flex flex-wrap items-center justify-between">
                    <div class="w-1/2 font-semibold text-xs">Short Introduction:</div>
                    <div class="w-1/2 text-xs">{{ biteProfile.descIntro }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Profile -->
        <template v-if="tab === 'profile'">
          <Profile :userProfile="userProfile" :biteProfile="biteProfile" />
        </template>
        <!-- Provider -->
        <template v-if="tab === 'provider'">
          <Provider :biteProfile="biteProfile" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import Profile from '@/components/dashboard/GeneralProfile';
import Provider from '@/components/dashboard/ProviderProfile';
export default {
  layout: 'dashboard',
  components: {
    Header,
    Profile,
    Provider,
  },
  data() {
    return {
      tabs: [
        { text: 'Profile', value: 'profile' },
        { text: 'Provider', value: 'provider' },
      ],
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('profile/getUserProfile');
    if (store.state.user.user.hasOwnProperty('roles') && store.state.user.user.roles.includes('provider')) {
      await store.dispatch('bite/getBiteProfile');
    }
  },
  computed: {
    ...mapGetters({
      userProfile: 'profile/isUserProfile',
      user: 'user/getUser',
      tab: 'profile/getActiveTab',
      biteProfile: 'bite/isBiteProfile',
    }),
    fullName() {
      return this.userProfile.firstName + ' ' + this.userProfile.lastName;
    },

    checkTab() {
      if (this.tab === 'profile') {
        return '/profile/edit?e=generalProfile';
      } else if (this.tab === 'provider') {
        return '/profile/edit?e=providerProfile';
      }
    },

    dateOfBirth() {
      const date = moment.unix(this.userProfile.dateOfBirth).format('L');
      return date;
    },
  },
  methods: {
    ...mapMutations({
      setTab: 'profile/setTab',
    }),

    toggleTab(tab) {
      this.setTab(tab);
    },
  },
};
</script>

<style>
img {
  height: inherit;
  width: inherit;
  object-fit: cover;
}
</style>
