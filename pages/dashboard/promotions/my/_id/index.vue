<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap bg-white">
      <div class="md:w-1/2 w-full mx-auto bg-white mt-8 py-4 px-5 rounded-sm shadow-3xl relative">
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
                <font-awesome-icon class="text-gray-700 pr-2 w-7 h-7" icon="['fas', 'share']" />
              </div>
              <span class="text-gray-700 sm:text-lg text-sm sm:pl-2 pl-0">Share</span>
            </div>
          </div>
        </div>
        <div ref="share" class="absolute text-center hidden socialShareWrapper">
          <SocialSharing :data="promotion" text="promotions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { findDaysAgo } from '@/services/index';
import Header from '@/components/dashboard/Header';
import SocialSharing from '@/components/dashboard/SocialSharing';

export default {
  layout: 'dashboard',
  components: {
    Header,
    SocialSharing,
  },
  data() {
    return {
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
    await store.dispatch('promotion/getCreatorPromotionDetailById', {
      id: params.id,
    });
  },
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
      user: 'user/getUser',
    }),
    userName() {
      return this.user.firstName + ' ' + this.user.lastName;
    },
  },
  mounted() {},
  methods: {
    ...mapActions({
      feedbackPromotion: 'promotion/feedbackPromotion',
      getCreatorPromotionDetailById: 'promotion/getCreatorPromotionDetailById',
    }),
    findDaysAgoHandler(date) {
      return findDaysAgo(date);
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
            this.getCreatorPromotionDetailById({
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
