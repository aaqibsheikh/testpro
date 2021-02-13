<template>
  <div>
    <template v-if="calcWidth <= 1023 && isDomReady">
      <MobileNavbar />
    </template>
    <template v-if="calcWidth > 1023 && isDomReady">
      <div class="container mx-auto">
        <Navbar />
      </div>
    </template>
    <div class="flex flex-wrap">
      <div class="w-full sm:w-3/4 md:w-1/2 px-4 py-10 mx-auto">
        <client-only>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide
              class="relative flex items-center justify-center"
              v-for="(banner, index) in promotion.banners"
              :key="index"
            >
              <div class="screen"></div>
              <div
                class="absolute bg-gray-200 rounded-lg text-center wh-75 flex flex-col items-center justify-center"
              >
                <p>Promotion details are only available to members</p>
                <button
                  @click="viewGeneralPromo(promotion.id)"
                  class="bg-baits-blue hover:bg-baits-blue text-white font-bold py-2 px-4 rounded focus:outline-none mt-2"
                >
                  Sign up for free
                </button>
              </div>
              <img
                style="height: 500px"
                :src="banner"
                class="object-cover w-full"
              />
            </swiper-slide>
            <div
              v-if="promotion.banners.length > 1"
              class="swiper-pagination"
              slot="pagination"
            ></div>
            <div
              v-if="promotion.banners.length > 1"
              class="swiper-button-prev"
              slot="button-prev"
            ></div>
            <div
              v-if="promotion.banners.length > 1"
              class="swiper-button-next"
              slot="button-next"
            ></div>
          </swiper>
        </client-only>
        <p class="text-gray-500 text-base mt-10">{{ promotion.industry }}</p>
        <h2 class="text-gray-900 text-4xl font-bold my-1">
          {{ promotion.title }}
        </h2>

        <div class="flex items-center justify-between my-6">
          <div class="w-1/2 text-left">
            <img
              :src="promotion.avatar"
              class="w-10 h-10 rounded-full inline-block"
            />
            <span class="text-gray-500 text-base ml-1">{{ userName }}</span>
          </div>
        </div>
        <hr class="border-2 border-gray-300" />
        <p class="text-gray-600 text-lg my-4">
          Details:
          <br />
          {{ promotion.description }}
        </p>
        <button
          @click="viewGeneralPromo(promotion.id)"
          class="bg-baits-blue hover:bg-baits-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Click to view full details
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Footer from '@/components/common/Footer';
export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
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
    await store.dispatch('promotion/findPromotionByTitle', {
      title: params.title,
    });
  },
  mounted() {
    this.isDomReady = true;
    console.log('bullets before:', this.swiperOption.pagination.dynamicBullets);
    this.swiperOption.pagination.dynamicBullets =
      this.promotion.banners.length > 1 ? true : false;
    console.log('bullets after:', this.swiperOption.pagination.dynamicBullets);
  },
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
    }),
    userName() {
      return this.promotion.firstName + ' ' + this.promotion.lastName;
    },
    calcWidth() {
      return this.windowWidth;
    },
  },
  methods: {
    viewGeneralPromo(id) {
      this.$router.push(`/dashboard/promotions/listing/${id}`);
    },
  },
};
</script>>
<style>
.wh-75 {
  width: 75%;
  height: 75%;
}
.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>