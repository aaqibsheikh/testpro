<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap md:mt-2 sm:mt-8 mt-20">
      <div class="w-full mt-6">
        <div class="flex flex-wrap justify-between items-center mb-3 px-5 md:px-12">
          <div class="text-baits-blue font-bold text-xl">Promotions List</div>
          <div class="w-1/3">
            <div class="flex items-center">
              <div class="md:w-1/6">
                <label class="inline-block tracking-wide text-gray-700 text-sm font-bold mb-2">Industry</label>
              </div>
              <div class="w-5/6">
                <div class="relative">
                  <select
                    @change="filterByIndustry"
                    class="inline-block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    v-model="industry"
                  >
                    <option>All</option>
                    <option>Banking &amp; Finance</option>
                    <option>Property</option>
                    <option>Insurance</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="generalUserPromotions.data.length > 0">
        <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full mx-auto">
          <div class="flex flex-wrap" v-for="(promotion, index) in generalUserPromotionsList" :key="index">
            <div class="w-full bg-white pt-5 mt-8 pb-4 rounded-sm shadow-3xl relative">
              <h2 class="text-baits-blue font-bold text-2xl px-5">
                {{ promotion.title }}
              </h2>
              <div class="flex flex-wrap my-3 px-5">
                <div class="w-full text-md text-gray-700">
                  {{ promotion.description }}
                </div>
              </div>
              <div class="flex flex-wrap bg-white mt-3">
                <div class="w-full">
                  <PromotionSwiper
                    :index="index"
                    :options="swiperOption[index]"
                    :reference="'swiper1'"
                    :images="promotion.banners"
                    :styleObj="{ height: '500px' }"
                    :classes="'object-cover w-full mt-3 mb-1'"
                  />
                </div>
              </div>

              <span :title="promotion.likeCount" class="rounded-full ml-4 cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'thumbs-up']" />
              </span>
              <span :title="promotion.shareCount" class="rounded-full cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'eye']" />
              </span>

              <hr class="mx-4" style="border-bottom: 1px solid #e2e8f0" />

              <div class="flex flex-wrap items-center justify-start sm:mx-4 mx-0 mt-1">
                <div class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="feebackPromotionHandler(promotion)">
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
              </div>
              <div :ref="`ref${index}`" class="absolute text-center hidden socialShareWrapper">
                <SocialSharing :data="promotion" text="promotions" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-full text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">There is currently no promotion</h2>
        </div>
      </template>
    </div>
    <div class="grid grid-rows-1 grid-flow-col px-5 md:px-12" v-if="generalUserPromotions.data.length > 0">
      <div>
        <vue-ads-pagination
          :total-items="generalUserPromotions.total"
          :items-per-page="Number.parseInt(generalUserPromotions.page.pageSize)"
          :page="page"
          :loading="loading"
          @page-change="pageChange"
        >
          <template slot-scope="props">
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
              {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} promotion
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
import Header from '@/components/dashboard/Header';
import SocialSharing from '@/components/dashboard/SocialSharing';
import PromotionSwiper from '@/components/common/Swiper';
import { mapGetters, mapActions } from 'vuex';
export default {
  layout: 'dashboard',
  components: {
    Header,
    SocialSharing,
    PromotionSwiper,
  },
  data() {
    return {
      industry: 'All',
      loading: false,
      page: 0,
      selectItems: 5,
    };
  },
  async fetch({ store }) {
    await store.dispatch('promotion/getPromotionListForGeneralUsers', {
      pageNum: '',
      pageSize: '',
      industry: 'All',
    });
  },
  computed: {
    ...mapGetters({
      generalUserPromotions: 'promotion/isUserPromotions',
    }),
    generalUserPromotionsList() {
      return this.generalUserPromotions.data.filter((promotion) => {
        if (promotion.status) {
          promotion.hover = false;
          return promotion;
        }
      });
    },
    swiperOption() {
      return this.generalUserPromotions.data.map((ele, index) => {
        return {
          loop: false,
          pagination: {
            el: `#bulltets-baitsbite${index}`,
            clickable: true,
          },
          navigation: {
            nextEl: `#button-next-baitsbite${index}`,
            prevEl: `#button-prev-baitsbite${index}`,
          },
        };
      });
    },
  },
  mounted() {
    this.page = Number.parseInt(this.generalUserPromotions.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getPromotionListForGeneralUsers: 'promotion/getPromotionListForGeneralUsers',
      feedbackPromotion: 'promotion/feedbackPromotion',
    }),
    feebackPromotionHandler(promotion) {
      let data = {
        like: promotion.isLike ? 0 : 1,
      };

      this.feedbackPromotion({
        id: promotion.id,
        data: data,
        industry: this.industry,
      })
        .then((res) => {
          if (res.data.result) {
            this.getPromotionListForGeneralUsers({
              pageNum: this.page,
              pageSize: this.generalUserPromotions.page.pageSize,
              industry: this.industry === null ? 'All' : this.industry,
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
    socialShareOutsideClick() {
      this.generalUserPromotions.data.filter((promotion) => {
        if (promotion.status) {
          promotion.hover = false;
          return promotion;
        }
      });
    },
    pageChange(page) {
      this.page = page;
      this.getPromotionListForGeneralUsers({
        pageNum: this.page,
        pageSize: this.generalUserPromotions.page.pageSize,
        industry: this.industry === null ? 'All' : this.industry,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getPromotionListForGeneralUsers({
        pageNum: '',
        pageSize: pageSize,
        industry: this.industry === null ? 'All' : this.industry,
      });
    },
    getPromotionById(id) {
      this.$router.push(`/dashboard/promotions/listing/${id}`);
    },
    filterByIndustry() {
      this.getPromotionListForGeneralUsers({
        pageNum: this.page,
        pageSize: this.generalUserPromotions.page.pageSize,
        industry: this.industry === null ? 'All' : this.industry,
      });
    },
  },
};
</script>
