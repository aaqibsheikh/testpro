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
          <div class="grid grid-cols-1 my-2">
            <div class="flex flex-wrap mb-8" v-for="blog in blogs.data.recent" :key="blog.url" @click="$router.push(`/blogs/${blog.url}`)">
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
                  <img v-if="blog.thumbnails" :src="blog.thumbnails[0]" class="w-full lg:h-48 h-full shadow" />
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
                    <span class="text-baits-gray-lightest text-xs">{{ formatDateHanler(blog.createdDate) }}</span>
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
            <blog-pagination :totalPages="blogs.page.pageTotal" :total="blogs.total" :currentPage="blogs.page.pageNum" @pagechanged="pagechanged" />
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
          <div v-for="(blog, popularBlogIndex) in blogs.data.popular" :key="blog.url" @click="$router.push(`/blogs/${blog.url}`)">
            <div class="flex flex-wrap mt-4 mx-2">
              <div class="w-auto">
                <img v-if="blog.thumbnails" :src="blog.thumbnails[0]" class="w-16 h-16 inline-block" />
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
import BlogPagination from '@/components/common/BlogPagination';
import { convertFromUnixTime } from '@/services/index';
export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
    BlogPagination,
  },
  data() {
    return {
      isDomReady: false,
    };
  },

  async fetch({ store, query }) {
    await store.dispatch('blog/getBlogListForPublicBySearch', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      blogs: 'blog/isPublicBlogSearch',
    }),
    calcWidth() {
      return this.windowWidth;
    },
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapActions({
      getBlogListForPublicBySearch: 'blog/getBlogListForPublicBySearch',
    }),
    formatDateHanler(date) {
      return convertFromUnixTime(date);
    },
    pagechanged(page) {
      window.scrollTo(0, 0);
      this.getBlogListForPublicBySearch({
        pageNum: page,
        pageSize: this.blogs.page.pageSize,
      });
    },
  },
};
</script>
>
<style></style>
