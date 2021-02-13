<template>
  <div>
    <template v-if="calcWidth <= 1023 && isDomReady">
      <MobileNavbar />
    </template>
    <template v-if="calcWidth > 1023 && isDomReady">
      <Navbar />
    </template>
    <div class="container mx-auto lg:mt-0 md:mt-32 mt-20">
      <div class="grid grid-cols-3 gap-6 mt-10">
        <div class="lg:col-span-2 col-span-3">
          <div class="w-full cursor-pointer mb-3 text-baits-black-dark font-bold text-3xl capitalize hover:text-baits-blue leading-snug">
            {{ blog.title }}
          </div>
          <div class="w-full">
            <client-only>
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(banner, index) in blog.banners" :key="index">
                  <img style="height: 500px" :src="banner" class="object-cover w-full" />
                </swiper-slide>
                <div v-if="blog.banners.length > 1" class="swiper-pagination" slot="pagination"></div>
                <div v-if="blog.banners.length > 1" class="swiper-button-prev" slot="button-prev"></div>
                <div v-if="blog.banners.length > 1" class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </client-only>
          </div>
          <p class="text-base text-gray-900 py-2" v-for="(description, key) in blog.segments" :key="key" v-html="decodeURI(description.content)"></p>
        </div>
        <div class="lg:col-span-1 col-span-3">
          <div class="flex items-center lg:px-0 px-4">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Follow us </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div class="flex flex-wrap my-6 lg:mx-0 mx-4">
            <!-- Facebook -->
            <div class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #3b5998">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'facebook-f']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Facebook</div>
                <div>Like</div>
              </div>
            </div>
            <!-- Twitter -->
            <div class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #00aced">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'twitter']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Twitter</div>
                <div>Like</div>
              </div>
            </div>
            <!-- Google+ -->
            <div class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #dd4b39">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'google-plus-g']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Google+</div>
                <div>Like</div>
              </div>
            </div>
            <!-- Youtube -->
            <div class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #dd1a2a">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'youtube']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Youtube</div>
                <div>Like</div>
              </div>
            </div>
            <!-- Instagram -->
            <div class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #125688">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'instagram']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Instagram</div>
                <div>Like</div>
              </div>
            </div>
          </div>
          <!-- Popular Posts -->
          <div class="flex items-center lg:px-0 px-4">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Popular Posts </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div class="flex flex-wrap mt-4 mx-2">
            <div class="w-auto">
              <img src="~static/images/blogs/1.jpg" class="w-16 h-16 inline-block" />
            </div>
            <div class="w-3/4 ml-4">
              <span class="inline-block cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                Apple’s new ipad lets you play the latest games for a fraction of the price
              </span>
            </div>
          </div>
          <div class="h-px w-full bg-gray-300 my-3 mx-2"></div>

          <div class="flex flex-wrap mt-4 mx-2">
            <div class="w-auto">
              <img src="~static/images/blogs/1.jpg" class="w-16 h-16 inline-block" />
            </div>
            <div class="w-3/4 ml-4">
              <span class="inline-block cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                Apple’s new ipad lets you play the latest games for a fraction of the price
              </span>
            </div>
          </div>
          <div class="h-px w-full bg-gray-300 my-3 mx-2"></div>

          <div class="flex flex-wrap mt-4 mx-2">
            <div class="w-auto">
              <img src="~static/images/blogs/1.jpg" class="w-16 h-16 inline-block" />
            </div>
            <div class="w-3/4 ml-4">
              <span class="inline-block cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                Apple’s new ipad lets you play the latest games for a fraction of the price
              </span>
            </div>
          </div>
          <div class="h-px w-full bg-gray-300 my-3 mx-2"></div>

          <div class="flex flex-wrap mt-4 mx-2">
            <div class="w-auto">
              <img src="~static/images/blogs/1.jpg" class="w-16 h-16 inline-block" />
            </div>
            <div class="w-3/4 ml-4">
              <span class="inline-block cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                Apple’s new ipad lets you play the latest games for a fraction of the price
              </span>
            </div>
          </div>

          <!-- Categories -->
          <div class="flex items-center lg:px-0 px-4 mt-10 mb-6">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Categories </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div class="flex flex-wrap lg:mx-0 mx-4">
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Break</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Food</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Gadgets</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Ipad</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Mobile</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">News</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Slider</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Sport</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Technology</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Video</div>
            <div class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1">Watch</div>
          </div>
        </div>
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
  async fetch({ store, params }) {
    await store.dispatch('blog/findBlogByTitle', {
      title: params.title,
    });
  },
  head() {
    return {
      title: this.blog.title,
      meta: [
        { hid: 'description', name: 'description', content: this.blog.metaTags },
        { name: 'keywords', content: this.blog.metaTags },
      ],
    };
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
  computed: {
    ...mapGetters({
      blog: 'blog/getBlogById',
    }),
    calcWidth() {
      return this.windowWidth;
    },
  },

  mounted() {
    this.isDomReady = true;
    this.swiperOption.pagination.dynamicBullets = this.blog.banners.length > 1 ? true : false;
  },
  methods: {},
};
</script>
>
<style></style>
