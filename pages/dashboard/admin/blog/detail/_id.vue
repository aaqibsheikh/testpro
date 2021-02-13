<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap px-10 my-10">
      <button @click="$router.go(-1)" class="bg-baits-blue px-2 py-1 text-sm text-white rounded-md focus:outline-none">Back</button>
    </div>
    <div class="flex flex-wrap px-10 my-10">
      <div class="text-left lg:w-1/2 md:w-4/6 sm:w-4/5 w-full">
        <h2 class="text-baits-blue font-bold text-4xl">{{ blog.title }}</h2>
        <h6 class="text-md text-gray-500">{{ blog.industry }}</h6>
        <p>
          <span class="text-sm text-gray-900">Created date:</span>
          <span class="text-sm">
            {{ formatDateMonthYearHandler(blog.createdDate) }}
          </span>
        </p>
        <!-- <img v-if="blog.banner" :src="blog.banner" class="inline-block" />
        <img v-else src="~/static/images/promo-default.png" class="inline-block" /> -->
        <p class="text-base text-gray-900 py-2" v-for="(description, key) in blog.segments" :key="key" v-html="decodeURI(description.content)"></p>

        <div class="flex flex-wrap items-center justify-evenly my-10">
          <button
            @click="editBlog(blog.id)"
            class="focus:outline-none sm:mt-0 mt-2 mr-1 sm:w-3/12 w-full bg-baits-blue px-5 py-2 rounded-full text-white text-sm font-bold"
          >
            Edit
          </button>
          <button
            v-if="blog.status === 'Pending'"
            @click="approveBlogHandler(blog.id)"
            class="focus:outline-none sm:mt-0 mt-2 mr-1 sm:w-3/12 w-full bg-baits-blue px-5 py-2 rounded-full text-white text-sm font-bold"
          >
            Approve
          </button>
          <button
            v-if="blog.status === 'Pending'"
            @click="rejectBlogHandler(blog.id)"
            class="focus:outline-none sm:mt-0 mt-2 sm:w-3/12 w-full bg-gray-400 px-5 py-2 rounded-full text-white text-sm font-bold"
          >
            Reject
          </button>
        </div>
      </div>
    </div>

    <ConfirmRejectBlog v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Header from '@/components/dashboard/Header';
import ConfirmRejectBlog from '@/components/modal/ConfirmRejectBlog';
import { formatDateMonthYear } from '@/services';
export default {
  layout: 'dashboard',
  components: {
    Header,
    ConfirmRejectBlog,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  async fetch({ store, params }) {
    await store.dispatch('blog/getBlogDetailById', {
      id: params.id,
    });
  },
  computed: {
    ...mapGetters({
      blog: 'blog/getBlogById',
    }),
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getBlogListForAdmin: 'blog/getBlogListForAdmin',
      _approveBlog: 'blog/approveBlog',
      _rejectBlog: 'blog/rejectBlog',
    }),
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },
    editBlog(id) {
      this.$router.push(`/dashboard/admin/blog/edit/${id}`);
    },
    approveBlogHandler(id) {
      this.setLoader(true);
      this._approveBlog({ id: id })
        .then((res) => {
          this.setLoader(false);
          if (res.data.result) {
            VoerroModal.hide('blog-detail-modal');
            this.$toast.open({
              message: 'Blog approved',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
            this.getBlogListForAdmin({
              pageNum: '',
              pageSize: '',
            });
          }
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Error',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
    rejectBlogHandler() {
      VoerroModal.show('confirm-reject-blog-modal');
    },
  },
};
</script>
