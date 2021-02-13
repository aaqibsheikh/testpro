<template>
  <div class="w-full m-auto sm:mt-8 mt-32 md:mt-16">
    <div class="grid grid-cols-2 px-5 md:px-12">
      <div class="text-lg col-span-12 sm:col-span-1 sm:mb-0 mb-3">
        <span class="text-gray-700 cursor-pointer" @click="$router.push('/dashboard/bites')">My Bites</span>
        <span class="text-gray-700 px-1">/</span>
        <span class="font-bold text-baits-blue">Baits Pool</span>
      </div>
      <div class="text-right col-span-1 mb-0 hidden sm:block">
        <img class="ml-4 inline-block cursor-pointer w-8 h-8" @click="$router.push('/dashboard/bites/pool')" src="~/static/images/pool.png" />
        <img class="ml-4 inline-block cursor-pointer w-8 h-8" @click="$router.push('/dashboard/bites/pending')" src="~/static/images/pending.png" />
        <img class="ml-4 inline-block cursor-pointer w-8 h-8" @click="$router.push('/dashboard/bites/open')" src="~/static/images/open.png" />
        <img class="ml-4 inline-block cursor-pointer w-8 h-8" @click="$router.push('/dashboard/bites/closed')" src="~/static/images/closed.png" />
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="col-span-12 px-5 md:px-12">
        <div class="flex">
          <input class="w-full sm:w-64 h-10 rounded-l-lg p-2 border border-gray-300 focus:outline-none" type="text" placeholder="Search" />
          <button class="bg-baits-blue px-3 rounded-r-lg focus:outline-none">
            <font-awesome-icon class="text-white w-5 h-5" :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 mt-5 mb-2 px-5 md:px-12">
        <div>
          <span class="text-gray-700 font-bold text-xl">Baits Pool</span>
        </div>
      </div>
      <template v-if="bites.result !== false">
        <template v-if="bites.data.listing.length > 0">
          <div class="col-span-12 text-left px-0 md:px-12 text-gray-700">
            <!-- Desktop list design -->
            <div class="sm:block hidden">
              <div
                class="border-2 flex flex-wrap"
                :class="[index === 0 ? 'mt-3' : '', index + 1 != bites.data.listing.length ? 'border-b-0' : '']"
                v-for="(bite, index) in bites.data.listing"
                :key="index"
              >
                <div class="px-4 py-6 xl:w-4/12 lg:w-4/12 w-4/12">
                  <p @click="showBiteDetail(bite.id)" class="lg:text-xl text-base font-bold text-baits-blue underline cursor-pointer">
                    {{ bite.title }}
                  </p>
                  <p class="text-sm">
                    <span class="font-bold">Baits ID:</span>
                    <span>{{ bite.baitId }}</span>
                  </p>
                  <p class="text-sm text-baits-blue">{{ bite.expertise }}</p>
                </div>
                <div class="px-4 py-6 xl:w-3/12 lg:w-4/12 w-4/12">
                  <p class="text-base">Casted on {{ formatDateMonthYearHandler(bite.castOn) }}</p>
                  <p class="text-sm">({{ findDaysAgoHandler(bite.castOn) }})</p>
                </div>
                <div class="px-4 py-6 xl:w-2/12 lg:w-2/12 w-2/12">
                  <p class="lg:text-xl text-base text-baits-green font-bold">
                    {{ numberWithCommasHandler(bite.amount) }}
                  </p>
                </div>
                <div class="px-4 py-6 xl:w-2/12 lg:w-2/12 w-2/12 text-center">
                  <div class="w-12 cursor-pointer inline-block" @click="openApplyForBiteModal(bite.id)">
                    <BaitsIcon :color="'#0070C0'" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Mobile list design -->
            <div class="sm:hidden block mb-6">
              <div class="mb-10 shadow-3xl flex flex-wrap py-4" :class="[index === 0 ? 'mt-3' : '']" v-for="(bite, index) in bites.data.listing" :key="index">
                <div class="px-4 pt-3 w-full">
                  <p @click="showBiteDetail(bite.id)" class="py-2 text-xl font-bold text-baits-blue underline cursor-pointer">
                    {{ bite.title }}
                  </p>
                  <p class="text-base">
                    <span class="font-bold">Baits ID:</span>
                    <span>{{ bite.baitId }}</span>
                  </p>
                  <p class="text-base text-baits-blue">{{ bite.expertise }}</p>
                </div>
                <div class="px-4 pt-3 w-full">
                  <span>Casted on: </span>
                  <span class="text-baits-blue">
                    {{ formatDateMonthYearHandler(bite.castOn) }}
                  </span>
                  <span>({{ findDaysAgoHandler(bite.castOn) }})</span>
                </div>
                <div class="mx-4 py-3 w-full" style="border-bottom: 1px solid #e2e8f0">
                  <span class="">Amount: </span>
                  <span class="text-baits-green">
                    {{ numberWithCommasHandler(bite.amount) }}
                  </span>
                </div>
                <div class="flex flex-wrap justify-between items-center w-full pt-2">
                  <div class="w-1/2">
                    <div @click="showBiteDetail(bite.id)" v-ripple="'rgba(216, 216, 216, 0.35)'" class="flex flex-wrap items-center justify-center">
                      <div class="w-8 pt-0 cursor-pointer inline-block">
                        <!-- <BaitsIcon :width="'2.5rem'" :color="'#4a5568'" /> -->
                        <font-awesome-icon class="w-7 h-7" style="color: #4a5568" :icon="['fas', 'eye']" />
                      </div>
                      <span class="text-sm pl-2">View</span>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <div @click="openApplyForBiteModal(bite.id)" v-ripple="'rgba(216, 216, 216, 0.35)'" class="flex flex-wrap items-center justify-center">
                      <div class="w-8 pt-0 cursor-pointer inline-block">
                        <BaitsIcon :width="'2.5rem'" :color="'#4a5568'" />
                      </div>
                      <span class="text-sm pl-2">Bite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="col-span-12 text-center">
            <h2 class="text-gray-800 font-bold text-xl p-20">There are currently no available bites that matching your expertises</h2>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="col-span-12 text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">No Baits will be shown as Bites profile is pending verification</h2>
        </div>
      </template>
    </div>
    <template v-if="bites.result">
      <div class="grid grid-rows-1 grid-flow-col">
        <div class="px-0 md:px-12">
          <vue-ads-pagination
            :total-items="bites.total"
            :items-per-page="Number.parseInt(bites.page.pageSize)"
            :page="page"
            :loading="loading"
            @page-change="pageChange"
          >
            <template slot-scope="props">
              <div class="vue-ads-pr-2 vue-ads-leading-loose">
                {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} Baits
              </div>
            </template>
            <template slot="buttons" slot-scope="props">
              <select v-model="selectItems" @change="getSelectedItemsByPaging(selectItems)">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
              <vue-ads-page-button v-for="(button, key) in props.buttons" :key="key" v-bind="button" @page-change="pageChange(button.page)" />
            </template>
          </vue-ads-pagination>
        </div>
      </div>
    </template>
    <ApplyForBiteModal v-if="isDomReady" :biteId="biteId" />
    <SuccessMessageForBiteTheBaitModal v-if="isDomReady" />
    <BiteDetailModal v-if="isDomReady" />
    <Fab class="block sm:hidden" />
  </div>
</template>
<script>
import ApplyForBiteModal from '@/components/modal/ApplyForBiteModal';
import SuccessMessageForBiteTheBaitModal from '@/components/modal/SuccessMessageForBiteTheBaitModal';
import BiteDetailModal from '@/components/modal/BiteDetailModal';
import Fab from '@/components/common/widgets/Fab';
import BaitsIcon from '@/components/icons/BaitsIcon';
import { mapGetters, mapActions } from 'vuex';
import { formatDateMonthYear, findDaysAgo, numberWithCommas } from '@/services/index';
export default {
  components: {
    ApplyForBiteModal,
    Fab,
    BaitsIcon,
    BiteDetailModal,
    SuccessMessageForBiteTheBaitModal,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      biteId: null,
    };
  },
  async fetch({ store }) {
    await store.dispatch('bite/getPoolBitesList', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      bites: 'bite/listBites',
    }),
  },
  mounted() {
    this.isDomReady = true;
    // For pagination
    if (this.bites.hasOwnProperty('page')) {
      this.page = Number.parseInt(this.bites.page.pageNum) - 1;
    }
  },
  methods: {
    ...mapActions({
      getPoolBitesList: 'bite/getPoolBitesList',
      getBiteDetails: 'bite/getBiteDetails',
    }),
    pageChange(page) {
      this.page = page;
      this.getPoolBitesList({
        pageNum: this.page,
        pageSize: this.bites.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getPoolBitesList({ pageNum: '', pageSize: pageSize });
    },
    openApplyForBiteModal(id) {
      this.biteId = id;
      VoerroModal.show('apply-for-bite-modal');
    },
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },

    findDaysAgoHandler(date) {
      return findDaysAgo(date);
    },
    numberWithCommasHandler(amount) {
      return numberWithCommas(amount);
    },
    async showBiteDetail(biteId) {
      await this.getBiteDetails(biteId);
      VoerroModal.show('bite-detail-modal');
    },
  },
};
</script>
<style>
.vue-ads-bg-teal-500 {
  background-color: #0070c0 !important;
}
</style>
