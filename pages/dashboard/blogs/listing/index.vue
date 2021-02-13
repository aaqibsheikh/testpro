<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap md:mt-2 sm:mt-8 mt-20">
      <div class="w-full mt-6">
        <div class="flex flex-wrap justify-between items-center mb-3 px-5 md:px-12">
          <div class="text-baits-blue font-bold text-xl">Blogs List</div>
          <div>
            <button @click="addBlog" class="w-48 px-4 py-1 sm:text-xl text-sm font-bold text-white rounded-full bg-baits-green focus:outline-none">
              New Blog
            </button>
          </div>
        </div>
      </div>
      <template v-if="generalUserBlog.data.length > 0">
        <div class="lg:w-1/2 md:w-4/6 sm:w-4/5 w-full mx-auto">
          <div class="flex flex-wrap" v-for="(blog, index) in generalUserBlogList" :key="index">
            <div class="w-full bg-white pt-5 mt-8 pb-4 rounded-sm shadow-3xl relative">
              <h2 class="text-baits-blue font-bold text-2xl px-5">
                {{ blog.title }}
              </h2>
              <div class="flex flex-wrap my-3 px-5">
                <div class="w-full text-md text-gray-700">
                  <!-- {{ blog.description }} -->
                </div>
              </div>
              <div class="flex flex-wrap bg-white mt-3">
                <div class="w-full">
                  <img style="height: 500px" :src="blog.thumbnails[0]" class="object-cover w-full mt-3 mb-1" />
                </div>
              </div>

              <span :title="blog.likeCount" class="rounded-full ml-4 cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'thumbs-up']" />
              </span>
              <span :title="blog.shareCount" class="rounded-full cursor-pointer">
                <font-awesome-icon class="text-baits-blue w-4 h-4" :icon="['fas', 'eye']" />
              </span>

              <hr class="mx-4" style="border-bottom: 1px solid #e2e8f0" />

              <div class="flex flex-wrap items-center justify-start sm:mx-4 mx-0 mt-1">
                <div class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'" @click="feebackBlogHandler(blog)">
                  <div class="flex flex-wrap items-center justify-center py-2 sm:px-2 px-0">
                    <div class="w-8 pt-0 cursor-pointer inline-block">
                      <font-awesome-icon :class="[blog.isLike ? 'text-baits-blue' : 'text-gray-700']" class="pr-2 w-7 h-7" :icon="['fas', 'thumbs-up']" />
                    </div>
                    <span :class="[blog.isLike ? 'text-baits-blue' : 'text-gray-700']" class="sm:text-lg text-sm sm:pl-2 pl-0">Like</span>
                  </div>
                </div>
                <div @click="getBlogById(blog.id)" class="w-1/3 cursor-pointer hover:baits-ripple" v-ripple="'rgba(0, 0, 0, .05)'">
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
                <!-- <SocialSharing :data="blog" text="blog" /> -->
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-full text-center">
          <h2 class="text-gray-800 font-bold text-xl p-20">There is currently no blog</h2>
        </div>
      </template>
    </div>
    <div class="grid grid-rows-1 grid-flow-col px-5 md:px-12" v-if="generalUserBlog.data.length > 0">
      <div>
        <vue-ads-pagination
          :total-items="generalUserBlog.total"
          :items-per-page="Number.parseInt(generalUserBlog.page.pageSize)"
          :page="page"
          :loading="loading"
          @page-change="pageChange"
        >
          <template slot-scope="props">
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
              {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} blog
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
import { mapGetters, mapActions } from 'vuex';
export default {
  layout: 'dashboard',
  components: {
    Header,
    SocialSharing,
  },
  data() {
    return {
      loading: false,
      page: 0,
      selectItems: 5,
    };
  },
  async fetch({ store }) {
    await store.dispatch('blog/getBlogListForGeneralUsers', {
      pageNum: '',
      pageSize: '',
    });
  },
  computed: {
    ...mapGetters({
      generalUserBlog: 'blog/isUserBlog',
    }),
    generalUserBlogList() {
      return this.generalUserBlog.data.filter((blog) => {
        // if (blog.status) {
        blog.hover = false;
        return blog;
        // }
      });
    },
  },
  mounted() {
    this.page = Number.parseInt(this.generalUserBlog.page.pageNum) - 1;
  },
  methods: {
    ...mapActions({
      getBlogListForGeneralUsers: 'blog/getBlogListForGeneralUsers',
      feedbackBlog: 'blog/feedbackBlog',
    }),
    addBlog() {
      this.$router.push('/dashboard/blogs/add');
    },
    feebackBlogHandler(blog) {
      let data = {
        like: blog.isLike ? 0 : 1,
      };

      this.feedbackBlog({
        id: blog.id,
        data: data,
      })
        .then((res) => {
          if (res.data.result) {
            this.getBlogListForGeneralUsers({
              pageNum: this.page,
              pageSize: this.generalUserBlog.page.pageSize,
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
      this.generalUserBlog.data.filter((blog) => {
        if (blog.status) {
          blog.hover = false;
          return blog;
        }
      });
    },
    pageChange(page) {
      this.page = page;
      this.getBlogListForGeneralUsers({
        pageNum: this.page,
        pageSize: this.generalUserBlog.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getBlogListForGeneralUsers({
        pageNum: '',
        pageSize: pageSize,
      });
    },
    getBlogById(id) {
      this.$router.push(`/dashboard/blogs/listing/${id}`);
    },
  },
};
</script>
