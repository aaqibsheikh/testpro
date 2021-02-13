<template>
  <div class="px-6">
    <client-only>
      <client-only>
        <swiper class="swiper rounded overflow-hidden shadow-lg" :options="swiperOption">
          <swiper-slide v-for="provider in providers.slice(0, 3)" :key="provider.id" @click="$router.push(`/providers/${provider.id}`)">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full">
                <div class="w-full">
                  <img v-if="provider.avatar" :src="provider.avatar" class="object-cover object-top w-full rounded-t-2xl provider-img" />
                  <img v-else src="~/static/images/default-user.jpg" class="object-cover object-top w-full rounded-t-2xl provider-img" />
                </div>
              </div>
              <div class="w-full px-4 mt-4 flex flex-wrap items-center justify-between">
                <h2 class="block text-baits-blue font-bold text-lg">{{ provider.firstName }} {{ provider.lastName }}</h2>
              </div>
              <div class="w-full px-4">
                <span class="text-sm text-gray-500">{{ provider.designation }}</span>
              </div>
              <div class="w-full px-4 mb-4">
                <span class="text-sm text-gray-500">{{ provider.company }} | {{ provider.location || 'N/A' }}</span>
              </div>
            </div>
          </swiper-slide>
          <div v-if="providers.length > 1" class="swiper-pagination" slot="pagination"></div>
          <div v-if="providers.length > 1" class="swiper-button-prev" slot="button-prev"></div>
          <div v-if="providers.length > 1" class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
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
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      dummy: [
        {
          name: 'Joe Doe',
          role: 'Financial Advisor',
          companyLogo: '//logo.clearbit.com/hsbc.com',
          companyName: 'HSBC',
          img: 'https://randomuser.me/api/portraits/men/18.jpg',
        },
        {
          name: 'Jane Date',
          role: 'Real estate Broker',
          companyLogo: '//logo.clearbit.com/mercedes.com',
          companyName: '',
          img: 'https://randomuser.me/api/portraits/women/17.jpg',
        },
        {
          name: 'Matt Josh',
          role: 'Insurance Broker',
          companyLogo: '//logo.clearbit.com/interamerican.com',
          companyName: '',
          img: 'https://randomuser.me/api/portraits/men/17.jpg',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      providers: 'provider/getProviders',
    }),
  },
};
</script>

<style scoped>
.cards > div {
  font-family: 'Lato';
}
.provider-img {
  height: 350px !important;
}

.swiper-button-prev:focus,
.swiper-button-next:focus {
  outline: none;
}

.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0px;
}
</style>
