<template>
  <div class="w-full m-auto sm:mt-8 mt-32 md:mt-16">
    <div class="grid grid-cols-2 px-5 md:px-12">
      <div class="text-lg col-span-12 sm:col-span-1 sm:mb-0 mb-3">
        <span class="text-gray-700 cursor-pointer" @click="$router.push('/dashboard/bites')">My Bites</span>
        <span class="text-gray-700 px-1">/</span>
        <span class="font-bold text-baits-blue">Open Bites</span>
      </div>
      <div class="text-right col-span-1 mb-0 hidden sm:block">
        <img class="ml-4 inline-block cursor-pointer" width="40" height="40" @click="$router.push('/dashboard/bites/pool')" src="~/static/images/pool.png" />
        <img
          class="ml-4 inline-block cursor-pointer"
          width="40"
          height="40"
          @click="$router.push('/dashboard/bites/pending')"
          src="~/static/images/pending.png"
        />
        <img class="ml-4 inline-block cursor-pointer" width="40" height="40" @click="$router.push('/dashboard/bites/open')" src="~/static/images/open.png" />
        <img
          class="ml-4 inline-block cursor-pointer"
          width="40"
          height="40"
          @click="$router.push('/dashboard/bites/closed')"
          src="~/static/images/closed.png"
        />
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
      <div class="grid grid-cols-1 mt-5 mb-2 px-5 md:px-12">
        <div>
          <span class="text-gray-700 font-bold text-xl">Open Bites</span>
        </div>
      </div>
      <template v-if="openBites.data.listing.length > 0">
        <div class="col-span-12 sm:text-left text-center px-0 md:px-12">
          <!-- Desktop list design -->
          <div class="sm:block hidden">
            <div
              class="border-2 flex flex-wrap"
              :class="[index === 0 ? 'mt-3' : '', index + 1 != openBites.data.listing.length ? 'border-b-0' : '']"
              v-for="(bite, index) in openBites.data.listing"
              :key="index"
            >
              <div class="px-4 py-6 xl:w-3/12 lg:w-3/12 w-3/12">
                <p @click="showBiteDetail(bite.id)" class="lg:text-xl text-base font-bold text-baits-blue underline cursor-pointer">
                  {{ bite.description }}
                </p>
                <p class="text-sm">
                  <span class="text-gray-700 font-bold">Baits ID:</span>
                  <span class="text-gray-700">{{ bite.baitId }}</span>
                </p>
                <p class="text-sm text-baits-blue">{{ bite.type }}</p>
              </div>
              <div class="px-4 py-6 xl:w-3/12 lg:w-3/12 w-4/12">
                <p class="text-base text-gray-700 font-bold">Casted on {{ formatDateMonthYearHandler(bite.lastActivity) }}</p>
                <p class="text-sm text-gray-700">
                  {{ findDaysAgoHandler(bite.lastActivity) }}
                </p>
              </div>
              <div class="px-4 py-6 xl:w-2/12 lg:w-2/12 w-2/12">
                <p class="lg:text-xl text-base text-baits-green font-bold">
                  {{ bite.amount }}
                </p>
              </div>
              <div class="px-4 py-6 xl:w-4/12 lg:w-4/12 w-3/12 text-center">
                <div class="inline-block flex flex-wrap flex-col items-center">
                  <button
                    v-if="bite.messagePreference === 'telegram'"
                    @click="openTelegram(bite.telegramUserId, bite.firstName)"
                    class="cursor-pointer lg:w-48 w-full items-center lg:px-8 md:px-0 py-1 shadow md:text-xl text-sm text-white bg-baits-blue rounded-full focus:outline-none"
                  >
                    <img class="mr-1 inline-block" src="~/static/images/messages-white.svg" />
                    <span>Message</span>
                  </button>
                  <button
                    v-if="bite.messagePreference === 'WhatsApp'"
                    @click="openWhatsapp(`${bite.waPrefix}${bite.waMobile}`, bite.firstName)"
                    class="cursor-pointer lg:w-48 w-full items-center lg:px-8 md:px-0 py-1 shadow md:text-xl text-sm text-white bg-baits-blue rounded-full focus:outline-none"
                  >
                    <img class="mr-1 inline-block" src="~/static/images/messages-white.svg" />
                    <span>Message</span>
                  </button>
                  <button
                    @click="openCloseBiteModal(bite.id, bite.responseId)"
                    class="cursor-pointer lg:w-48 w-full items-center lg:px-8 md:px-0 py-1 shadow md:text-xl text-sm text-white bg-gray-400 rounded-full focus:outline-none mt-2"
                  >
                    <font-awesome-icon class="mr-2 text-white inline-block w-5 h-5" :icon="['fas', 'times']" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Mobile list design -->
          <div class="sm:hidden block mb-6">
            <div class="mb-6 shadow-3xl flex flex-wrap py-6" :class="[index === 0 ? 'mt-3' : '']" v-for="(bite, index) in openBites.data.listing" :key="index">
              <div class="px-4 pt-3 w-full">
                <p @click="showBiteDetail(bite.id)" class="text-xl font-bold text-baits-blue underline cursor-pointer">
                  {{ bite.description }}
                </p>
                <p class="text-base">
                  <span class="text-gray-700 font-bold">Baits ID:</span>
                  <span class="text-gray-700">{{ bite.baitId }}</span>
                </p>
                <p class="text-base text-baits-blue">{{ bite.type }}</p>
              </div>
              <div class="px-4 pt-3 w-full">
                <p class="text-lg text-gray-700 font-bold">Casted on {{ formatDateMonthYearHandler(bite.lastActivity) }}</p>
                <p class="text-base text-gray-700">
                  {{ findDaysAgoHandler(bite.lastActivity) }}
                </p>
              </div>
              <div class="px-4 pt-3 w-full">
                <p class="text-xl text-baits-green font-bold">
                  {{ bite.amount }}
                </p>
              </div>
              <div class="px-4 pt-2 w-full">
                <div class="flex flex-wrap mt-4">
                  <button
                    v-if="bite.messagePreference === 'telegram'"
                    @click="openTelegram(bite.telegramUserId, bite.firstName)"
                    class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
                  >
                    <img class="mr-1 inline-block" src="~/static/images/messages-white.svg" alt />
                    <span>Message</span>
                  </button>
                  <button
                    v-if="bite.messagePreference === 'WhatsApp'"
                    @click="openWhatsapp(`${bite.waPrefix}${bite.waMobile}`, bite.firstName)"
                    class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
                  >
                    <img class="mr-1 inline-block" src="~/static/images/messages-white.svg" alt />
                    <span>Message</span>
                  </button>
                  <button
                    @click="openCloseBiteModal(bite.id, bite.responseId)"
                    class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-gray-400 rounded-full focus:outline-none mt-2"
                  >
                    <font-awesome-icon class="mr-2 text-white inline-block w-5 h-5" :icon="['fas', 'times']" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col-span-12 text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">There are no open bites</h2>
        </div>
      </template>
    </div>
    <div class="grid grid-rows-1 grid-flow-col" v-if="openBites.data.listing.length > 0">
      <div>
        <vue-ads-pagination
          :total-items="openBites.total"
          :items-per-page="Number.parseInt(openBites.page.pageSize)"
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
    <Fab class="block sm:hidden" />
    <BiteDetailModal v-if="isDomReady" />
    <WaMobileMessageModal v-if="isDomReady" />
    <CloseBiteModal :biteId="biteId" :responseId="responseId" v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { convertToWhatsappFormat } from '@/services/index';
import Fab from '@/components/common/widgets/Fab';
import BiteDetailModal from '@/components/modal/BiteDetailModal';
import CloseBiteModal from '@/components/modal/CloseBiteModal';
import { formatDateMonthYear, findDaysAgo } from '@/services/index';
import WaMobileMessageModal from '@/components/modal/WaMobileMessageModal';

export default {
  components: {
    Fab,
    BiteDetailModal,
    CloseBiteModal,
    WaMobileMessageModal,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
      userName: null,
      responseId: null,
      isDomReady: false,
      biteId: null,
    };
  },
  async fetch({ store }) {
    await store.dispatch('bite/getOpenBitesList', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      openBites: 'bite/listOpenBites',
    }),
  },
  mounted() {
    this.isDomReady = true;
    this.page = Number.parseInt(this.openBites.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getOpenBitesList: 'bite/getOpenBitesList',
      getBiteDetails: 'bite/getBiteDetails',
    }),
    openWhatsapp(number, firstName) {
      if (number === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      number = convertToWhatsappFormat(number);
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    },
    openTelegram(telegramUserId, firstName) {
      if (telegramUserId === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://telegram.me/${telegramUserId}?start=${text}`, '_blank');
    },
    pageChange(page) {
      this.page = page;
      this.getOpenBitesList({
        pageNum: this.page,
        pageSize: this.openBites.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getOpenBitesList({ pageNum: '', pageSize: pageSize });
    },
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },
    findDaysAgoHandler(date) {
      return findDaysAgo(date);
    },
    openFeedbackModal(userName, responseId) {
      this.userName = userName;
      this.responseId = responseId;
      VoerroModal.show('feedback-modal');
    },
    async showBiteDetail(biteId) {
      await this.getBiteDetails(biteId);
      VoerroModal.show('bite-detail-modal');
    },
    openCloseBiteModal(biteId, responseId) {
      this.biteId = biteId;
      this.responseId = responseId;
      VoerroModal.show('close-bite-modal');
    },
  },
};
</script>
<style>
.vue-ads-bg-teal-500 {
  background-color: #0070c0 !important;
}
</style>
