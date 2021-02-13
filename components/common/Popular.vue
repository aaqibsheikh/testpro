<template>
  <div class="grid grid-cols-3 gap-4 cards">
    <div
      v-for="provider in providers.slice(0, 3)"
      :key="provider.id"
      class="mb-4 rounded overflow-hidden shadow-lg"
      @click="$router.push(`/providers/${provider.id}`)"
    >
      <div class="flex flex-wrap items-center">
        <div class="relative w-full">
          <div class="w-full">
            <img v-if="provider.avatar" :src="provider.avatar" class="object-cover w-full rounded-t-2xl" style="height: 400px" />
            <img v-else src="~/static/images/default-user.jpg" class="object-cover w-full rounded-t-2xl" style="height: 400px" />
          </div>
        </div>
        <div class="w-full px-4 mt-4 flex flex-wrap items-center justify-between">
          <h2 class="block text-baits-blue font-bold text-lg">{{ provider.firstName }} {{ provider.lastName }}</h2>
        </div>
        <div class="w-full px-4">
          <span class="text-sm text-gray-500">{{ provider.designation }}</span>
        </div>
        <div class="w-full px-4 mb-4">
          <span class="text-sm text-gray-500">{{ provider.company }} | {{ provider.location || 'N/A' }}</span>
        </div>
      </div>
      <!-- <img v-if="provider.avatar" class="w-40 h-40 rounded-full mt-2 mx-auto" :src="provider.avatar" alt="" />

      <img v-else src="~/static/images/default-user.jpg" class="w-40 h-40 rounded-full mt-2 mx-auto" /> -->
      <!-- <img class="w-16 h-16 rounded-full mt-2 mx-auto" :src="provider.companyLogo" alt="" /> -->
      <!-- <div class="px-6 py-4">
        <div class="font-bold text-xl text-indigo-800 mb-2">{{ provider.firstName }} {{ provider.lastName }}</div>
        <p class="text-gray-700 text-base">
          {{ provider.designation }}
        </p>
        <p class="text-gray-700 text-base">
          {{ provider.location }}
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      dummy: [
        {
          name: 'Joe Doe',
          role: 'Financial Advisor',
          companyLogo: '//logo.clearbit.com/hsbc.com',
          companyName: 'HSBC',
          img: 'https://randomuser.me/api/portraits/men/18.jpg',
        },
        {
          name: 'Jane Date',
          role: 'Real estate Broker',
          companyLogo: '//logo.clearbit.com/mercedes.com',
          companyName: '',
          img: 'https://randomuser.me/api/portraits/women/17.jpg',
        },
        {
          name: 'Matt Josh',
          role: 'Insurance Broker',
          companyLogo: '//logo.clearbit.com/interamerican.com',
          companyName: '',
          img: 'https://randomuser.me/api/portraits/men/17.jpg',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      providers: 'provider/getProviders',
    }),
  },
};
</script>

<style lang="scss" scoped>
.cards > div {
  font-family: 'Lato';
}
</style>
