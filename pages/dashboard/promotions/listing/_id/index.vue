<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap md:mx-20 mx-0">
      <div class="md:w-1/2 w-full bg-white mt-8 py-4 px-5 rounded-sm shadow-3xl relative">
        <h2 class="text-baits-blue font-bold text-2xl">
          {{ promotion.title }}
        </h2>
        <p class="text-md text-gray-700">{{ promotion.description }}</p>

        <client-only>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(banner, index) in promotion.banners" :key="index">
              <img style="height: 500px" :src="banner" class="object-cover w-full mt-3 mb-8" />
            </swiper-slide>
            <div v-if="promotion.banners.length > 1" class="swiper-pagination" slot="pagination"></div>
            <div v-if="promotion.banners.length > 1" class="swiper-button-prev" slot="button-prev"></div>
            <div v-if="promotion.banners.length > 1" class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </client-only>

        <hr style="border-bottom: 1px solid #e2e8f0" />
        <div class="flex flex-wrap items-center justify-around mx-0 mt-1">
          <div class="w-1/2 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="feedbackPromotionHandler">
            <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
              <div class="w-8 pt-0 cursor-pointer inline-block">
                <font-awesome-icon
                  :class="[promotion.isLike ? 'text-baits-blue' : 'text-gray-700']"
                  class="text-gray-700 pr-2 w-7 h-7"
                  :icon="['fas', 'thumbs-up']"
                />
              </div>
              <span :class="[promotion.isLike ? 'text-baits-blue' : 'text-gray-700']" class="text-gray-700 sm:text-lg text-sm sm:pl-2 pl-0">Like</span>
            </div>
          </div>
          <div class="w-1/2 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="toggleSocialShare">
            <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
              <div class="w-8 pt-0 cursor-pointer inline-block">
                <font-awesome-icon class="text-gray-700 pr-2 w-7 h-7" :icon="['fas', 'share']" />
              </div>
              <span class="text-gray-700 sm:text-lg text-sm sm:pl-2 pl-0">Share</span>
            </div>
          </div>
        </div>

        <div ref="share" class="absolute text-center hidden socialShareWrapper">
          <SocialSharing :data="promotion" text="promotions" />
        </div>
      </div>
      <div class="md:w-1/2 w-full rounded-sm shadow-3xl bg-white mt-8 py-4 px-5">
        <div class="flex flex-wrap">
          <div class="inline-block">
            <img v-if="promotion.provider.avatar" class="rounded-full w-20 h-20 sm:w-32 sm:h-32 inline-block" :src="promotion.provider.avatar" />
            <img v-else class="rounded-full w-20 h-20 sm:w-32 sm:h-32 inline-block" src="~/static/images/default-user.jpg" />
            <img
              v-if="promotion.provider.companyAvatar"
              class="rounded-full inline-block companyAvatarPromotion relative"
              :src="promotion.provider.companyAvatar"
            />
          </div>
          <div class="inline-block pl-4 py-4 sm:py-3">
            <h2 class="font-bold text-baits-blue text-lg sm:text-xl w-full">
              {{ promotion.provider.firstName }}
              {{ promotion.provider.lastName }}
            </h2>
            <p class="font-bold text-black text-sm sm:text-xl w-full">
              {{ promotion.provider.designation }}
            </p>
            <h3 class="font-bold text-sm text-gray-600 sm:text-xl inline-block">
              {{ promotion.provider.country }}
            </h3>
            <div class="inline-block pl-4 md:block hidden">
              <star-rating :increment="0.5" :read-only="true" :star-size="18" :show-rating="false" v-model="promotion.provider.rating"></star-rating>
            </div>
            <div class="inline-block pl-4 md:hidden block">
              <star-rating :increment="0.5" :read-only="true" :star-size="22" :show-rating="false" v-model="promotion.provider.rating"></star-rating>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap py-3">
          <p class="font-bold text-sm sm:text-xl text-gray-600 w-full">
            {{ calculateYearsHandler(promotion.provider.companyJoin) }} in
            {{ promotion.provider.companyName }}
          </p>
          <p class="font-bold text-baits-blue text-sm sm:text-xl w-full">
            Completed {{ promotion.provider.platformCount }} baitsbite since
            {{ calculatePlatformJoinDateHandler(promotion.provider.platformJoin) }}
          </p>
        </div>
        <div class="flex flex-wrap mt-4">
          <div class="bg-gray-300 text-black text-sm py-1 px-3 mt-1 mr-1" v-for="(expertise, index) in promotion.provider.expertise" :key="index">
            {{ expertise }}
          </div>
        </div>
        <div class="flex flex-wrap mt-4">
          <button
            v-if="promotion.provider.messagePreference === 'telegram'"
            @click="openTelegram(promotion.provider.telegramUserId, promotion.provider.firstName)"
            class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
          >
            <img class="mr-1 inline-block" src="~/static/images/messages.svg" alt />
            <span>Message</span>
          </button>
          <button
            v-if="promotion.provider.messagePreference === 'WhatsApp'"
            @click="openWhatsapp(promotion.provider.waMobile, promotion.provider.firstName)"
            class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-baits-blue rounded-full focus:outline-none"
          >
            <img class="mr-1 inline-block w-6 h-6" src="~/static/images/messages.svg" alt />
            <span>Message</span>
          </button>
          <button
            @click="$router.go(-1)"
            class="w-full items-center cursor-pointer px-8 py-1 shadow text-xl text-white bg-gray-400 rounded-full focus:outline-none mt-2"
          >
            <font-awesome-icon class="mr-2 text-white inline-block w-5 h-5" :icon="['fas', 'times']" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
    <WaMobileMessageModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import WaMobileMessageModal from '@/components/modal/WaMobileMessageModal';
import SocialSharing from '@/components/dashboard/SocialSharing';

import { calculateYears, calculatePlatformJoinDate, findDaysAgo } from '@/services/index';

export default {
  layout: 'dashboard',
  components: {
    Header,
    SocialSharing,
    WaMobileMessageModal,
  },
  data() {
    return {
      isDomReady: false,
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  async fetch({ store, params }) {
    await store.dispatch('promotion/getUserPromotionDetailById', {
      id: params.id,
    });
  },
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
      user: 'user/getUser',
    }),
    userName() {
      return this.promotion.provider.firstName + ' ' + this.promotion.provider.lastName;
    },
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      feedbackPromotion: 'promotion/feedbackPromotion',
      getUserPromotionDetailById: 'promotion/getUserPromotionDetailById',
    }),

    findDaysAgoHandler(date) {
      return findDaysAgo(date);
    },
    calculatePlatformJoinDateHandler(date) {
      return calculatePlatformJoinDate(date);
    },
    calculateYearsHandler(date) {
      return calculateYears(date);
    },
    messagePromotionHandler() {
      this.setLoader(true);
      const data = {
        message: 1,
      };
      this.feedbackPromotion({ id: this.$route.params.id, data: data })
        .then((res) => {
          this.setLoader(false);
          if (res.data.result) {
            this.$toast.open({
              message: 'Message Promotion',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: error,
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
    openWhatsapp(number, firstName) {
      if (number === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      this.messagePromotionHandler();
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
      this.messagePromotionHandler();
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://telegram.me/${telegramUserId}?start=${text}`, '_blank');
    },
    toggleSocialShare() {
      var elem = this.$refs.share.classList;
      if (elem.contains('hidden')) {
        elem.remove('hidden');
      } else {
        elem.add('hidden');
      }
    },
    feedbackPromotionHandler() {
      let data = {
        like: this.promotion.isLike ? 0 : 1,
      };

      this.feedbackPromotion({
        id: this.promotion.id,
        data: data,
      })
        .then((res) => {
          if (res.data.result) {
            this.getUserPromotionDetailById({
              id: this.$route.params.id,
            });
          }
        })
        .catch((error) => {
          this.$toast.open({
            message: error,
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
};
</script>
<style>
.companyAvatarPromotion {
  width: 3rem;
  height: 3rem;
  bottom: -3rem;
  right: 3rem;
}
</style>
