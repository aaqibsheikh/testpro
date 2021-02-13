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
          <div class="grid grid-cols-3 gap-6">
            <div class="lg:col-span-2 col-span-3">
              <div class="flex flex-wrap">
                <div class="w-full mb-3" v-if="mainBlogs[0]">
                  <BlogSwiper
                    index="0"
                    :options="swiperOption[0]"
                    :reference="'swiper1'"
                    :images="mainBlogs[0].thumbnails"
                    :styleObj="{ height: '308px' }"
                    :classes="'object-cover w-full'"
                  />
                </div>
                <div class="lg:px-0 px-4" @click="$router.push(`/blogs/article/${mainBlogs[0].url}`)">
                  <div class="w-full cursor-pointer text-baits-black-dark font-bold text-xl hover:text-baits-blue leading-snug">
                    {{ mainBlogs[0].title }}
                  </div>
                  <div class="w-ful my-2">
                    <span class="text-baits-gray-lighter text-xs">{{ mainBlogs[0].author }}</span>
                    -
                    <span class="text-baits-gray-lightest text-xs">{{ formatDateHandler(mainBlogs[0].createdDate) }}</span>
                  </div>
                  <div class="text-sm text-baits-gray-lighter leading-snug">
                    {{ mainBlogs[0].summary }}
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-1 col-span-3">
              <div class="mb-6" v-if="mainBlogs[1]">
                <div class="w-full mb-3">
                  <BlogSwiper
                    index="1"
                    :options="swiperOption[1]"
                    :reference="'swiper2'"
                    :images="mainBlogs[1].thumbnails"
                    :styleObj="{ height: '150px' }"
                    :classes="'object-cover w-full'"
                  />
                </div>
                <div class="lg:px-0 px-4" @click="$router.push(`/blogs/article/${mainBlogs[1].url}`)">
                  <div class="cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                    {{ mainBlogs[1].title }}
                  </div>
                  <div class="my-2">
                    <span class="text-baits-gray-lighter text-xs">{{ mainBlogs[1].author }}</span>
                    -
                    <span class="text-baits-gray-lightest text-xs">{{ formatDateHandler(mainBlogs[1].createdDate) }}</span>
                  </div>
                </div>
              </div>

              <div class="mb-6" v-if="mainBlogs[2]">
                <div class="w-full mb-3">
                  <BlogSwiper
                    index="2"
                    :options="swiperOption[2]"
                    :reference="'swiper3'"
                    :images="mainBlogs[2].thumbnails"
                    :styleObj="{ height: '150px' }"
                    :classes="'object-cover w-full'"
                  />
                </div>
                <div class="lg:px-0 px-4" @click="$router.push(`/blogs/article/${mainBlogs[2].url}`)">
                  <div class="cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug">
                    {{ mainBlogs[2].title }}
                  </div>
                  <div class="my-2">
                    <span class="text-baits-gray-lighter text-xs">{{ mainBlogs[2].author }}</span>
                    -
                    <span class="text-baits-gray-lightest text-xs">{{ formatDateHandler(mainBlogs[2].createdDate) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 mt-6">
            <div class="flex items-center lg:px-0 px-4">
              <span class="lg:w-2/12 w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Recent Posts </span>
              <div class="lg:w-10/12 w-8/12 h-px bg-gray-300"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 my-2">
            <div class="flex flex-wrap mb-8" v-for="blog in blogs.data.recent" :key="blog.url" @click="$router.push(`/blogs/article/${blog.url}`)">
              <div class="lg:w-1/3 w-full">
                <div class="relative">
                  <div class="absolute top-0 left-0 ml-2 mt-2" v-if="blog.categories">
                    <span
                      v-for="(category, key) in blog.categories"
                      :key="key"
                      class="capitalize font-semibold text-sm bg-red-500 text-white p-1 mr-1 cursor-pointer"
                      >{{ category }}</span
                    >
                  </div>
                  <img :src="blog.thumbnails[0]" class="w-full lg:h-48 h-full shadow" />
                </div>
              </div>
              <div class="lg:w-2/3 w-full lg:mt-0 mt-4">
                <div class="ml-4">
                  <div class="w-full cursor-pointer text-baits-black-dark font-bold text-xl hover:text-baits-blue leading-snug">
                    {{ blog.title }}
                  </div>
                  <div class="w-ful my-2">
                    <span class="text-baits-gray-lighter text-xs">{{ blog.author }}</span>
                    -
                    <span class="text-baits-gray-lightest text-xs">{{ formatDateHandler(blog.createdDate) }}</span>
                  </div>
                  <div class="text-sm text-baits-gray-lighter leading-snug">
                    {{ blog.summary }}
                  </div>
                  <div class="h-px w-full border border-gray-300 border-dashed my-4"></div>
                  <div class="w-full flex flex-wrap items-center justify-start">
                    <div class="text-baits-gray-lightest text-opacity-75 text-xs flex items-center mr-3">
                      <span>
                        <font-awesome-icon class="pr-1 w-5 h-5" :icon="['fas', 'comment']" />
                      </span>
                      <span> {{ blog.comment.length }}</span>
                    </div>
                    <div class="text-baits-gray-lightest text-opacity-75 text-xs flex items-center">
                      <span>
                        <font-awesome-icon class="pr-1 w-5 h-5" :icon="['fas', 'clock']" />
                      </span>
                      <span>{{ blog.timeToRead }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <button @click="getMoreBlogs" class="focus:outline-none py-2 px-4 text-black text-opacity-75 font-bold border-2 border-black">Read More</button>
          </div>
        </div>

        <div class="lg:col-span-1 col-span-3">
          <div class="flex items-center lg:px-0 px-4">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Follow us </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div class="flex flex-wrap my-6 lg:mx-0 mx-4">
            <!-- Facebook -->
            <a href="https://www.facebook.com/baitsbite/" class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #3b5998">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'facebook-f']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Facebook</div>
                <div>Like</div>
              </div>
            </a>
            <!-- Twitter -->
            <a href="https://www.twitter.com/baitsbite/" class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #00aced">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'twitter']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Twitter</div>
                <div>Like</div>
              </div>
            </a>
            <!-- Google+ -->
            <a href="https://www.google.com/baitsbite/" class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #dd4b39">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'google-plus-g']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Google+</div>
                <div>Like</div>
              </div>
            </a>
            <!-- Youtube -->
            <a href="https://www.youtube.com/baitsbite/" class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #dd1a2a">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'youtube']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Youtube</div>
                <div>Like</div>
              </div>
            </a>
            <!-- Instagram -->
            <a href="https://www.instagram.com/baitsbite/" class="w-full text-sm text-white flex flex-wrap items-center mb-2" style="background-color: #125688">
              <div class="w-10 h-10 flex items-center text-center bg-black bg-opacity-25 px-3 py-1">
                <span>
                  <font-awesome-icon class="pr-1 text-white w-5 h-5" :icon="['fab', 'instagram']" />
                </span>
              </div>
              <div class="flex-grow flex flex-wrap items-center justify-between px-4">
                <div>Instagram</div>
                <div>Like</div>
              </div>
            </a>
          </div>
          <!-- Popular Posts -->
          <div class="flex items-center lg:px-0 px-4">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Popular Posts </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div v-for="(blog, popularBlogIndex) in blogs.data.popular" :key="blog.url" @click="$router.push(`/blogs/article/${blog.url}`)">
            <div class="flex flex-wrap mt-4 mx-2">
              <div class="w-auto">
                <img :src="blog.thumbnails[0]" class="w-16 h-16 inline-block" />
              </div>
              <div class="w-3/4 ml-4">
                <span class="inline-block cursor-pointer text-baits-black-dark font-bold text-base hover:text-baits-blue leading-snug"> {{ blog.title }} </span>
              </div>
            </div>
            <div v-if="popularBlogIndex < blogs.data.popular.length - 1" class="h-px w-full bg-gray-300 my-3 mx-2"></div>
          </div>

          <!-- Categories -->
          <div class="flex items-center lg:px-0 px-4 mt-10 mb-6">
            <span class="w-4/12 tracking-wider uppercase font-semibold text-sm text-baits-black-dark"> Categories </span>
            <div class="w-8/12 h-px bg-gray-300"></div>
          </div>
          <div class="flex flex-wrap lg:mx-0 mx-4">
            <div
              v-for="(category, index) in blogs.data.categories"
              :key="index"
              class="py-2 px-3 text-baits-gray-lighter text-sm border border-gray-200 mr-1 mb-1"
            >
              {{ category }}
            </div>
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
import BlogSwiper from '@/components/common/Swiper';
import { convertFromUnixTime } from '@/services/index';
export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
    BlogSwiper,
  },
  data() {
    return {
      isDomReady: false,
    };
  },

  async fetch({ store }) {
    await store.dispatch('blog/getBlogListForPublic');
  },
  computed: {
    ...mapGetters({
      blogs: 'blog/isPublicBlog',
    }),
    mainBlogs() {
      return this.blogs.data.main;
    },
    calcWidth() {
      return this.windowWidth;
    },
    swiperOption() {
      return this.blogs.data.main.map((ele, index) => {
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
    this.isDomReady = true;
  },
  methods: {
    ...mapActions({
      getBlogListForPublic: 'blog/getBlogListForPublic',
    }),
    formatDateHandler(date) {
      return convertFromUnixTime(date);
    },
    getMoreBlogs() {
      this.$router.push('/blogs/search');
    },
  },
};
</script>
>
<style></style>
