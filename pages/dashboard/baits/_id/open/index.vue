<template>
  <div class="w-full px-6 md:px-12 m-auto sm:mt-8 mt-32 md:mt-16">
    <BaitsHeader text="Open Bites" />
    <div v-if="calcWidth < 1024">
      <div v-if="open.length > 0">
        <!-- This list design for mobile screen -->
        <div class="grid grid-cols-1 border border-gray-300 px-3 py-6 mt-4 lg:hidden block" v-for="(bait, key) in open" :key="key">
          <div class="flex flex-wrap">
            <div class="inline-block">
              <img v-if="bait.avatar" class="rounded-full w-20 h-20 sm:w-32 sm:h-32 inline-block" :src="bait.avatar" />
              <img v-else class="rounded-full w-20 h-20 sm:w-32 sm:h-32 inline-block" src="~/static/images/default-user.jpg" />
              <img v-if="bait.companyAvatar" class="rounded-full inline-block companyAvatarBaits relative" :src="bait.companyAvatar" />
            </div>
            <div class="inline-block pl-4 py-4 sm:py-3">
              <h2 class="font-bold text-baits-blue text-lg sm:text-xl w-full">{{ bait.firstName }} {{ bait.lastName }}</h2>
              <p class="font-bold text-black text-sm sm:text-xl w-full">
                {{ bait.designation }}
              </p>
              <h3 class="font-bold text-sm text-gray-600 sm:text-xl inline-block">
                {{ bait.country }}
              </h3>
              <!-- Screen greater than 768px -->
              <div class="inline-block pl-4 md:block hidden">
                <star-rating :increment="0.5" :read-only="true" :star-size="18" :show-rating="false" v-model="bait.rating"></star-rating>
              </div>
              <!-- Screen less than 768px -->
              <div class="inline-block pl-4 md:hidden block">
                <star-rating :increment="0.5" :read-only="true" :star-size="22" :show-rating="false" v-model="bait.rating"></star-rating>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap py-3">
            <p class="font-bold text-sm sm:text-xl text-gray-600 w-full">
              {{ calculateYearsHandler(bait.companyJoin) }} in
              {{ bait.companyName }}
            </p>
            <p class="font-bold text-baits-blue text-sm sm:text-xl w-full">
              Completed {{ bait.platformCount }} baitsbite since
              {{ calculatePlatformJoinDateHandler(bait.platformJoin) }}
            </p>
          </div>
          <div class="flex flex-wrap">
            <p class="text-gray-600 text-sm sm:text-xl">{{ bait.proposal }}</p>
          </div>
          <div class="flex flex-wrap mt-4">
            <div class="bg-gray-300 text-black text-sm py-1 px-3 mt-1 mr-1" v-for="(expertise, index) in bait.expertise" :key="index">
              {{ expertise }}
            </div>
          </div>
          <div class="flex flex-wrap mt-4">
            <button
              v-if="bait.messagePreference === 'telegram'"
              @click="openTelegram(bait.telegramUserId, bait.firstName)"
              class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
            >
              <img class="mr-1 inline-block" src="~/static/images/messages.svg" alt />
              <span>Message</span>
            </button>
            <button
              v-if="bait.messagePreference === 'WhatsApp'"
              @click="openWhatsapp(`${bait.waPrefix}${bait.waMobile}`, bait.firstName)"
              class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
            >
              <img class="mr-1 inline-block" src="~/static/images/messages.svg" alt />
              <span>Message</span>
            </button>
            <button
              @click="openFeedbackModal(bait.firstName, bait.responseId)"
              class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-gray-400 rounded-full focus:outline-none mt-2"
            >
              <font-awesome-icon class="mr-2 text-white inline-block w-5 h-5" :icon="['fas', 'times']" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="col-span-12 text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">There are no open bites for this bait</h2>
        </div>
      </div>
    </div>
    <div v-else></div>
    <div v-if="calcWidth >= 1024">
      <div v-if="open.length > 0">
        <div class="grid grid-cols-12 border border-gray-300 px-8 py-4" v-for="(bait, key) in open" :key="key">
          <div class="col-start-1 col-end-3">
            <div>
              <img v-if="bait.avatar" class="w-32 h-32 rounded-full" :src="bait.avatar" />
              <img v-else class="w-32 h-32 rounded-full" src="~/static/images/default-user.jpg" />
              <img v-if="bait.companyAvatar" class="rounded-full inline-block companyAvatarBaits relative" :src="bait.companyAvatar" />
            </div>
          </div>
          <div class="col-start-3 col-end-10">
            <div class="flex flex-wrap">
              <div class="w-2/3">
                <h2 class="font-bold text-baits-blue text-xl">{{ bait.firstName }} {{ bait.lastName }}</h2>
                <p class="font-bold text-black text-lg">
                  {{ bait.designation }}
                </p>
                <p class="font-bold text-lg text-gray-600">
                  {{ calculateYearsHandler(bait.companyJoin) }} in
                  {{ bait.companyName }}
                </p>
                <p class="font-bold text-baits-blue text-lg mt-3">
                  Completed {{ bait.platformCount }} baitsbite since
                  {{ calculatePlatformJoinDateHandler(bait.platformJoin) }}
                </p>
              </div>
              <div class="w-1/3">
                <div class="text-center">
                  <star-rating :increment="0.5" :read-only="true" :star-size="20" :show-rating="false" v-model="bait.rating"></star-rating>
                  <h3 class="font-bold text-lg text-gray-600 mt-6">
                    {{ bait.country }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap mt-2">
              <div class="bg-gray-300 text-black py-2 mt-1 px-6 mr-3" v-for="(expertise, index) in bait.expertise" :key="index">
                {{ expertise }}
              </div>
            </div>
            <div class="flex flex-wrap mt-3">
              <p class="text-gray-600 text-lg w-5/6">{{ bait.proposal }}</p>
            </div>
          </div>
          <div class="col-start-10 col-end-12 text-center">
            <div class="w-10 cursor-pointer inline-block">
              <button
                v-if="bait.messagePreference === 'telegram'"
                @click="openTelegram(bait.telegramUserId, bait.firstName)"
                class="w-48 items-center px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
              >
                <img class="mr-1 inline-block" src="~/static/images/messages.svg" alt />
                <span>Message</span>
              </button>
              <button
                v-if="bait.messagePreference === 'WhatsApp'"
                @click="openWhatsapp(`${bait.waPrefix}${bait.waMobile}`, bait.firstName)"
                class="w-48 items-center px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
              >
                <img class="mr-1 inline-block" src="~/static/images/messages.svg" alt />
                <span>Message</span>
              </button>
              <button
                @click="openFeedbackModal(bait.firstName, bait.responseId)"
                class="w-48 items-center px-8 py-1 shadow text-xl text-white bg-gray-400 rounded-full focus:outline-none mt-2"
              >
                <font-awesome-icon class="mr-2 text-white inline-block w-5 h-5" :icon="['fas', 'times']" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="col-span-12 text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">There are currently no open bites for this bait</h2>
        </div>
      </div>
    </div>
    <div v-else></div>
    <!-- <div class="grid grid-rows-1 grid-flow-col" v-if="open.data.listing">
      <div>
        <vue-ads-pagination :total-items="open.total" :items-per-page="Number.parseInt(open.page.pageSize)" :page="page" :loading="loading" @page-change="pageChange">
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
    </div>-->
    <FeedbackModal v-if="isDomReady" :name="userName" :responseId="responseId" />
    <WaMobileMessageModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { convertToWhatsappFormat } from '@/services/index';
import BaitsHeader from '@/components/baits/BaitsHeader';
import FeedbackModal from '@/components/modal/FeedbackModal';
import WaMobileMessageModal from '@/components/modal/WaMobileMessageModal';
import { calculateYears, calculatePlatformJoinDate } from '@/services/index';

export default {
  components: {
    FeedbackModal,
    WaMobileMessageModal,
    BaitsHeader,
  },
  data() {
    return {
      page: 0,
      loading: false,
      selectItems: 5,
      isDomReady: false,
      userName: null,
      responseId: null,
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('baits/getOpenBaitsList', {
      pageNum: '',
      pageSize: '',
      id: params.id,
    });
    await store.dispatch('baits/getBaitsDetail', params.id);
  },
  computed: {
    ...mapGetters({
      open: 'baits/getOpenBaitsList',
    }),
    calcWidth() {
      return this.windowWidth;
    },
  },
  mounted() {
    this.isDomReady = true;
    // this.page = Number.parseInt(this.open.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getOpenBaitsList: 'baits/getOpenBaitsList',
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
    calculateYearsHandler(date) {
      return calculateYears(date);
    },
    calculatePlatformJoinDateHandler(date) {
      return calculatePlatformJoinDate(date);
    },
    pageChange(page) {
      this.page = page;
      this.getOpenBaitsList({
        pageNum: this.page,
        pageSize: this.open.page.pageSize,
        id: this.$route.params.id,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getOpenBaitsList({
        pageNum: '',
        pageSize: pageSize,
        id: this.$route.params.id,
      });
    },
    openFeedbackModal(userName, responseId) {
      this.userName = userName;
      this.responseId = responseId;
      VoerroModal.show('feedback-modal');
    },
  },
};
</script>
<style></style>
