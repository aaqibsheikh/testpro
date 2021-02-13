<template>
  <div class="w-full m-auto sm:mt-8 mt-32 md:mt-8">
    <div class="grid grid-cols-2 items-center mb-3 px-5 md:px-12">
      <div class="text-baits-blue font-bold text-xl">My Baits</div>
      <div class="text-right">
        <button @click="show" class="px-6 py-2 sm:text-xl text-lg font-bold text-white rounded-full bg-baits-green focus:outline-none">New Bait</button>
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="col-span-12 px-5 md:px-12">
        <div class="flex">
          <input class="w-full sm:w-64 h-10 rounded-l-lg p-2 border border-gray-300 focus:outline-none" type="text" placeholder="Search" />
          <button class="bg-baits-blue px-3 rounded-r-lg focus:outline-none">
            <font-awesome-icon class="text-white w-6 h-6" :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <template v-if="baits.data.listing.length > 0">
        <div class="col-span-12 sm:text-left text-center px-0 md:px-12 text-gray-700">
          <!-- Desktop list design -->
          <div class="sm:block hidden">
            <div
              class="border-2 flex flex-wrap text-gray-700 text-base"
              :class="[key === 0 ? 'mt-3' : '', key + 1 != baits.data.listing.length ? 'border-b-0' : '']"
              v-for="(bait, key) in baits.data.listing"
              :key="key"
            >
              <div class="px-4 py-6 xl:w-4/12 lg:w-4/12 w-4/12">
                <p @click="$router.push(`/dashboard/baits/${bait.id}/details`)" class="lg:text-xl text-base font-bold text-baits-blue underline cursor-pointer">
                  {{ bait.title }}
                </p>
                <p class="text-sm">
                  <span class="font-bold">Baits ID:</span>
                  <span>{{ bait.baitId }}</span>
                </p>
                <p class="text-sm text-baits-blue">{{ bait.expertise }}</p>
              </div>
              <div class="px-4 py-6 xl:w-3/12 lg:w-4/12 w-4/12">
                <p class="font-bold">Casted on {{ formatDateMonthYearHandler(bait.castOn) }}</p>
                <p class="text-sm">{{ findDaysAgoHandler(bait.castOn) }}</p>
              </div>
              <div class="px-4 py-6 xl:w-3/12 lg:w-2/12 w-2/12">
                <p class="lg:text-xl text-base text-baits-green font-bold">
                  {{ numberWithCommasHandler(bait.amount) }}
                </p>
              </div>
              <div class="px-4 py-6 xl:w-2/12 lg:w-2/12 w-2/12 text-center">
                <div class="cursor-pointer inline-block">
                  <template v-if="bait.status === 'Draft'">
                    <button
                      @click="castDraft(bait.id)"
                      class="px-2 py-1 shadow text-xl text-baits-green bg-white rounded focus:outline-none border-4 hover:border-baits-green"
                    >
                      Click to Cast
                    </button>
                  </template>
                  <template v-else>
                    <button
                      @click="$router.push(`/dashboard/baits/${bait.id}/pending`)"
                      class="w-full items-center cursor-pointer lg:px-4 px-2 py-1 shadow lg:text-xl text-sm text-white bg-baits-blue rounded-full focus:outline-none"
                    >
                      <font-awesome-icon class="mr-2 text-white inline-block w-4 h-4" :icon="['fas', 'eye']" />
                      <span>View</span>
                    </button>
                    <button
                      @click="rejectBaits(bait.id)"
                      class="w-full items-center cursor-pointer lg:px-4 px-2 py-1 shadow lg:text-xl text-sm text-white bg-gray-400 rounded-full focus:outline-none mt-2"
                    >
                      <font-awesome-icon class="mr-2 text-white inline-block w-4 h-4" :icon="['fas', 'times']" />
                      <span>Close</span>
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- Mobile list design -->
          <div class="sm:hidden block mb-6">
            <div class="mb-6 shadow-3xl flex flex-wrap mt-8 py-6 text-left" v-for="(bait, key) in baits.data.listing" :key="key">
              <div class="px-4 pt-3 w-full">
                <p @click="$router.push(`/dashboard/baits/${bait.id}/details`)" class="py-2 text-xl font-bold text-baits-blue underline cursor-pointer">
                  {{ bait.title }}
                </p>
                <p class="text-base">
                  <span class="font-bold">Baits ID:</span>
                  <span>{{ bait.baitId }}</span>
                </p>
                <p class="text-baits-blue">{{ bait.expertise }}</p>
              </div>
              <div class="px-4 pt-3 w-full">
                <span>Casted on: </span>
                <span class="text-baits-blue">
                  {{ formatDateMonthYearHandler(bait.castOn) }}
                </span>
                <span>({{ findDaysAgoHandler(bait.castOn) }})</span>
              </div>
              <div class="mx-4 py-3 w-full" style="border-bottom: 1px solid #e2e8f0">
                <span class="">Amount: </span>
                <span class="text-baits-green">
                  {{ numberWithCommasHandler(bait.amount) }}
                </span>
              </div>
              <div class="px-4 pt-2 w-full text-center">
                <template v-if="bait.status === 'Draft'">
                  <div class="pt-0 cursor-pointer inline-block">
                    <button
                      @click="castDraft(bait.id)"
                      class="px-16 py-1 shadow text-xl text-baits-green bg-white rounded focus:outline-none border-4 hover:border-baits-green"
                    >
                      Click to Cast
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="flex flex-wrap justify-between items-center w-full">
                    <div class="w-1/2">
                      <div
                        @click="$router.push(`/dashboard/baits/${bait.id}/pending`)"
                        v-ripple="'rgba(216, 216, 216, 0.35)'"
                        class="flex flex-wrap items-center justify-center pt-2 cursor-pointer text-sm hover:text-baits-blue"
                      >
                        <div class="w-8 pt-0 inline-block">
                          <font-awesome-icon class="w-7 h-7" :icon="['fas', 'eye']" />
                        </div>
                        <span class="text-sm pl-2">View</span>
                      </div>
                    </div>
                    <div class="w-1/2">
                      <div
                        @click="rejectBaits(bait.id)"
                        v-ripple="'rgba(216, 216, 216, 0.35)'"
                        class="flex flex-wrap items-center justify-center pt-2 cursor-pointer text-sm hover:text-baits-blue"
                      >
                        <div class="w-8 pt-0 inline-block">
                          <font-awesome-icon class="mr-2 inline-block w-7 h-7" :icon="['fas', 'times']" />
                        </div>
                        <span class="text-sm pl-2">Close</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col-span-12 text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">
            You have not casted any bait yet, click
            <span @click="show" class="cursor-pointer text-baits-blue">here</span>
            to cast a bait today!
          </h2>
        </div>
      </template>
    </div>
    <div class="grid grid-rows-1 grid-flow-col px-0 md:px-12" v-if="baits.data.listing.length > 0">
      <div>
        <vue-ads-pagination
          :total-items="baits.total"
          :items-per-page="Number.parseInt(baits.page.pageSize)"
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
    <QuestionaireModal page="baits" v-if="isDomReady" @onsaveingQuestionaireBaits="onsaveingQuestionaireBaitsHandler" />
    <CastDraftBaitModal v-if="isDomReady" />
    <RejectBaitsModal :id="rejectBaitsId" v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PacmanIcon from '@/components/icons/PacmanIcon';
import QuestionaireModal from '@/components/modal/QuestionaireModal';
import CastDraftBaitModal from '@/components/modal/CastDraftBaitModal';
import RejectBaitsModal from '@/components/modal/RejectBaitsModal';

import { formatDateMonthYear, findDaysAgo, numberWithCommas } from '@/services/index';
export default {
  layout: 'dashboard',
  components: {
    PacmanIcon,
    QuestionaireModal,
    CastDraftBaitModal,
    RejectBaitsModal,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      rejectBaitsId: null,
    };
  },
  computed: {
    ...mapGetters({
      baits: 'baits/isBaits',
    }),
  },
  mounted() {
    this.isDomReady = true;
    this.page = Number.parseInt(this.baits.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      castDraftBait: 'baits/castDraftBait',
      getBaitsList: 'baits/getBaitsList',
    }),
    rejectBaits(baitId) {
      this.rejectBaitsId = baitId;
      VoerroModal.show('reject-baits-modal');
    },
    pageChange(page) {
      this.page = page;
      this.getBaitsList({
        pageNum: this.page,
        pageSize: this.baits.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getBaitsList({ pageNum: '', pageSize: pageSize });
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

    show() {
      VoerroModal.show('questionaire-modal');
    },
    onsaveingQuestionaireBaitsHandler() {
      this.page = 0;
    },
    castDraft(id) {
      this.castDraftBait(id).then((res) => {
        VoerroModal.show('cast-draft-bait-modal');
        this.getBaitsList({ pageNum: '', pageSize: '' });
        this.page = 0;
      });
    },
  },
};
</script>
<style>
.vue-ads-bg-teal-500 {
  background-color: #0070c0 !important;
}
</style>
