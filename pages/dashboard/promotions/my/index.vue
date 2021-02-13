<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap md:mt-2 sm:mt-8 mt-20">
      <div class="w-full mt-6">
        <div class="flex flex-wrap items-center justify-between mb-3 px-5 md:px-12">
          <div class="text-baits-blue font-bold text-xl">My Promotions</div>
          <div>
            <button @click="addPromotion" class="w-48 px-4 py-1 sm:text-xl text-sm font-bold text-white rounded-full bg-baits-green focus:outline-none">
              New Promotion
            </button>
          </div>
        </div>
      </div>
      <template v-if="creatorPromotionList.length > 0">
        <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full mx-auto">
          <div class="flex flex-wrap" v-for="(promotion, index) in creatorPromotionList" :key="index">
            <div class="w-full bg-white pt-5 mt-8 pb-4 rounded-sm shadow-3xl relative">
              <h2 class="text-baits-blue font-bold text-2xl px-5">
                {{ promotion.title }}
              </h2>
              <p class="w-full text-md text-gray-700 my-3 px-5">
                {{ promotion.description }}
              </p>

              <client-only>
                <swiper class="swiper" :options="swiperOption">
                  <swiper-slide v-for="(banner, index) in promotion.banners" :key="index">
                    <img style="height: 500px" :src="banner" class="object-cover w-full mt-3 mb-1" />
                  </swiper-slide>
                  <div v-if="promotion.banners.length > 1" class="swiper-pagination" slot="pagination"></div>
                  <div v-if="promotion.banners.length > 1" class="swiper-button-prev" slot="button-prev"></div>
                  <div v-if="promotion.banners.length > 1" class="swiper-button-next" slot="button-next"></div>
                </swiper>
              </client-only>

              <span :title="promotion.likeCount" class="rounded-full ml-4 cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'thumbs-up']" />
              </span>
              <span :title="promotion.shareCount" class="rounded-full cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'eye']" />
              </span>

              <hr class="mx-4 my-1" style="border-bottom: 1px solid #e2e8f0" />

              <div class="flex flex-wrap items-center justify-start sm:mx-4 mx-0 mt-1">
                <div class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="feedbackPromotionHandler(promotion)">
                  <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
                    <div class="w-8 pt-0 cursor-pointer inline-block">
                      <font-awesome-icon :class="[promotion.isLike ? 'text-baits-blue' : 'text-gray-700']" class="pr-2 w-7 h-7" :icon="['fas', 'thumbs-up']" />
                    </div>
                    <span :class="[promotion.isLike ? 'text-baits-blue' : 'text-gray-700']" class="sm:text-lg text-sm sm:pl-2 pl-0">Like</span>
                  </div>
                </div>
                <div @click="getPromotionById(promotion.id)" class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'">
                  <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
                    <div class="w-8 pt-0 cursor-pointer inline-block">
                      <font-awesome-icon class="text-gray-700 pr-2 w-7 h-7" :icon="['fas', 'eye']" />
                    </div>
                    <span class="text-gray-700 sm:text-lg text-sm sm:pl-2 pl-0">View</span>
                  </div>
                </div>
                <div class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="toggleSocialShare(index)">
                  <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
                    <div class="w-8 pt-0 cursor-pointer inline-block">
                      <font-awesome-icon class="text-gray-700 pr-2 w-7 h-7" :icon="['fas', 'share']" />
                    </div>
                    <span class="text-gray-700 sm:text-lg text-sm sm:pl-2 pl-0">Share</span>
                  </div>
                </div>
                <div :ref="`ref${index}`" class="absolute text-center hidden socialShareWrapper">
                  <SocialSharing :data="promotion" text="promotions" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-full text-center">
          <h2 class="text-gray-800 text-xl p-10">
            You have yet to create any promotion, click
            <span @click="addPromotion" class="cursor-pointer text-baits-blue">here</span>
            to create a promo!
          </h2>
        </div>
      </template>

      <AddPromotionModal v-if="isDomReady" />
    </div>
    <div class="grid grid-rows-1 grid-flow-col px-5 md:px-12" v-if="promotionsList.data.length > 0">
      <div>
        <vue-ads-pagination
          :total-items="promotionsList.total"
          :items-per-page="Number.parseInt(promotionsList.page.pageSize)"
          :page="page"
          :loading="loading"
          @page-change="pageChange"
        >
          <template slot-scope="props">
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
              {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} promotions
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
<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import AddPromotionModal from '@/components/modal/AddPromotionModal';
import SocialSharing from '@/components/dashboard/SocialSharing';
export default {
  layout: 'dashboard',
  components: {
    Header,
    AddPromotionModal,
    SocialSharing,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      hover: false,
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
  async fetch({ store }) {
    await store.dispatch('promotion/getPromotionListByCreator', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      promotionsList: 'promotion/isCreatorPromotions',
    }),
    creatorPromotionList() {
      return this.promotionsList.data.filter((promotion) => {
        promotion.hover = false;
        return promotion;
      });
    },
  },
  mounted() {
    this.isDomReady = true;
    this.page = Number.parseInt(this.promotionsList.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getPromotionListByCreator: 'promotion/getPromotionListByCreator',
      feedbackPromotion: 'promotion/feedbackPromotion',
    }),
    feedbackPromotionHandler(promotion) {
      let data = {
        like: promotion.isLike ? 0 : 1,
      };

      this.feedbackPromotion({
        id: promotion.id,
        data: data,
      })
        .then((res) => {
          if (res.data.result) {
            this.getPromotionListByCreator({
              pageNum: this.page,
              pageSize: this.promotionsList.page.pageSize,
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

    toggleSocialShare(index) {
      var elem = this.$refs[`ref${index}`][0].classList;
      if (elem.contains('hidden')) {
        elem.remove('hidden');
      } else {
        elem.add('hidden');
      }
    },
    pageChange(page) {
      this.page = page;
      this.getPromotionListByCreator({
        pageNum: this.page,
        pageSize: this.promotionsList.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getPromotionListByCreator({
        pageNum: '',
        pageSize: pageSize,
      });
    },
    getPromotionById(id) {
      this.$router.push(`/dashboard/promotions/my/${id}`);
    },
    addPromotion() {
      this.$router.push('/dashboard/promotions/my/add');
    },
  },
};
</script>
