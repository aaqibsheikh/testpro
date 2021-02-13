<template>
  <div class="w-full">
    <Header />
    <div class="w-full m-auto sm:mt-8 mt-32 md:mt-8">
      <div class="grid grid-cols-2 items-center mb-3 px-5 md:px-12">
        <div class="text-baits-blue font-bold text-xl">Baits</div>
        <!-- <div class="text-right">
        <button
          @click="show"
          class="px-6 py-2 sm:text-xl text-lg font-bold text-white rounded-full bg-baits-green focus:outline-none"
        >New Bait</button>
        </div>-->
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
          <div class="col-span-12 sm:text-left text-center px-0 md:px-12">
            <!-- Desktop list design -->
            <div class="sm:block hidden">
              <div
                class="border-2 flex flex-wrap text-gray-700 text-base"
                :class="[key === 0 ? 'mt-3' : '', key + 1 != baits.data.listing.length ? 'border-b-0' : '']"
                v-for="(bait, key) in baits.data.listing"
                :key="key"
              >
                <div class="px-4 py-6 xl:w-4/12 lg:w-4/12 w-4/12">
                  <p @click="showBaitDetail(bait.id)" class="lg:text-xl font-bold text-baits-blue underline cursor-pointer">
                    {{ bait.title || bait.product }}
                  </p>
                  <p class="text-sm">
                    <span class="font-bold">Baits ID:</span>
                    <span>{{ bait.ticketId }}</span>
                  </p>
                  <p class="text-sm text-baits-blue">{{ bait.expertise }}</p>
                </div>
                <div class="px-4 py-6 xl:w-3/12 lg:w-4/12 w-4/12 text-sm">
                  <p>Casted by {{ bait.firstName }}, {{ bait.lastName }}</p>
                  <!-- <p class="text-sm text-gray-700">{{ findDaysAgoHandler(bait.castOn) }}</p> -->
                  <p>on {{ formatDateMonthYearHandler(bait.castOn) }} ({{ findDaysAgoHandler(bait.castOn) }})</p>
                </div>
                <div class="px-4 py-6 xl:w-3/12 lg:w-2/12 w-2/12 text-sm">
                  <!-- <p
                    class="lg:text-xl text-base text-baits-green font-bold"
                  >{{ numberWithCommasHandler(bait.amount) }}</p>-->
                  <p>Referral Code: {{ bait.referralCode }}</p>
                  <p v-if="bait.status == 0">
                    <span>Status:</span>
                    <span class="text-baits-blue">Draft</span>
                  </p>
                  <p v-else>
                    <span>Pending: </span>
                    <span class="text-baits-blue"> {{ bait.responsePending }}, </span>
                    <span>Open: </span>
                    <span class="text-baits-blue"> {{ bait.responseOpen }}, </span>
                    <span>Close: </span>
                    <span class="text-baits-blue">
                      {{ bait.responseClose }}
                    </span>
                  </p>
                </div>
                <div class="px-4 py-6 xl:w-2/12 lg:w-2/12 w-2/12 text-center">
                  <!-- <div class="cursor-pointer inline-block">
                    <template v-if="bait.status === 'Draft'">
                      <button
                        @click="castDraft(bait.id)"
                        class="px-2 py-1 shadow text-xl text-baits-green bg-white rounded focus:outline-none border-4 border-gray-300"
                      >Click to Cast</button>
                    </template>
                    <template v-else>
                      <div @click="$router.push(`/baits/${bait.id}/pending`)">
                        <PacmanIcon />
                        <span
                          v-if="bait.count !== 0"
                          class="w-5 h-5 float-right relative text-white bg-baits-green rounded-full"
                          style="top: -65px; right: -7px;"
                        >{{ bait.count }}</span>
                      </div>
                    </template>
                  </div>-->
                </div>
              </div>
            </div>
            <!-- Mobile list design -->
            <div class="sm:hidden block mb-6">
              <div class="mb-6 shadow-3xl flex flex-wrap mt-8 py-6 text-left text-gray-700 text-base" v-for="(bait, key) in baits.data.listing" :key="key">
                <div class="px-4 pt-3 w-full">
                  <p @click="showBaitDetail(bait.id)" class="py-2 text-xl font-bold text-baits-blue underline cursor-pointer">
                    {{ bait.title || bait.product }}
                  </p>
                  <p>
                    <span class="font-bold">Baits ID:</span>
                    <span>{{ bait.ticketId }}</span>
                  </p>
                  <p class="text-baits-blue">{{ bait.expertise }}</p>
                </div>
                <div class="px-4 pt-3 w-full">
                  <p>
                    <span>Casted by:</span>
                    <span class="text-baits-blue">{{ bait.firstName }}, {{ bait.lastName }}</span>
                  </p>
                  <p>
                    <span>Casted On:</span>
                    <span class="text-baits-blue">{{ formatDateMonthYearHandler(bait.castOn) }}</span>
                    <span>({{ findDaysAgoHandler(bait.castOn) }})</span>
                  </p>
                  <p>
                    <span>Referral Code:</span>
                    <span>{{ bait.referralCode }}</span>
                  </p>
                  <p v-if="bait.status == 0">
                    <span>Status:</span>
                    <span class="text-baits-blue">Draft</span>
                  </p>
                  <p v-else>
                    <span>Pending: </span>
                    <span class="text-baits-blue"> {{ bait.responsePending }}, </span>
                    <span>Open: </span>
                    <span class="text-baits-blue"> {{ bait.responseOpen }}, </span>
                    <span>Close: </span>
                    <span class="text-baits-blue">
                      {{ bait.responseClose }}
                    </span>
                  </p>
                </div>
                <!-- <div class="px-4 pt-3 w-full">
                  <p
                    class="text-xl text-baits-green font-bold"
                  >{{ numberWithCommasHandler(bait.details) }}</p>
                </div>-->
                <div class="px-4 pt-2 w-full text-center">
                  <!-- <div class="pt-0 cursor-pointer inline-block">
                    <template v-if="bait.status === 'Draft'">
                      <button
                        @click="castDraft(bait.id)"
                        class="px-16 py-1 shadow text-xl text-baits-green bg-white rounded focus:outline-none border-4 border-gray-300"
                      >Click to Cast</button>
                    </template>
                    <template v-else>
                      <div @click="$router.push(`/baits/${bait.id}/pending`)">
                        <PacmanIcon />
                        <span
                          v-if="bait.count !== 0"
                          class="w-5 h-5 float-right relative text-white bg-baits-green rounded-full"
                          style="top: -60px; right: -6px;"
                        >{{ bait.count }}</span>
                      </div>
                    </template>
                  </div>-->
                </div>
              </div>
            </div>
            <div class="grid grid-rows-1 grid-flow-col" v-if="baits.data.listing.length > 0">
              <div>
                <vue-ads-pagination
                  :total-items="baits.total"
                  :max-visible-pages="5"
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
          </div>
        </template>
        <template v-else>
          <div class="col-span-12 text-center">
            <h2 class="text-gray-800 font-bold text-xl p-20">There are currently no baits in the system.</h2>
          </div>
        </template>
      </div>

      <!-- <QuestionaireModal
        page="baits"
        v-if="isDomReady"
        @onsaveingQuestionaireBaits="onsaveingQuestionaireBaitsHandler"
      />-->
      <CastDraftBaitModal v-if="isDomReady" />
      <BaitDetailModal v-if="isDomReady" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import PacmanIcon from '@/components/icons/PacmanIcon';
import QuestionaireModal from '@/components/modal/QuestionaireModal';
import CastDraftBaitModal from '@/components/modal/CastDraftBaitModal';
import BaitDetailModal from '@/components/modal/BaitDetailModal';
import { formatDateMonthYear, findDaysAgo, numberWithCommas } from '@/services/index';
export default {
  layout: 'dashboard',
  components: {
    Header,
    PacmanIcon,
    QuestionaireModal,
    CastDraftBaitModal,
    BaitDetailModal,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      isBaitDomReady: false,
    };
  },
  async fetch({ store }) {
    await store.dispatch('baits/getBaitsListAll', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      baits: 'baits/isBaitsAll',
    }),
  },
  mounted() {
    this.isDomReady = true;
    this.page = Number.parseInt(this.baits.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      castDraftBait: 'baits/castDraftBait',
      getBaitsList: 'baits/getBaitsListAll',
      getBaitsDetailAdmin: 'baits/getBaitsDetailAdmin',
    }),
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
    async showBaitDetail(biteId) {
      await this.getBaitsDetailAdmin(biteId);
      VoerroModal.show('bait-detail-modal');
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
