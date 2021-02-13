<template>
  <div class="w-full">
    <Header />
    <div class="flex justify-between px-10 pt-10">
      <div class="search-container">
        <font-awesome-icon class="transform absolute translate-y-3 translate-x-2 w-5 h-5" icon="search" style="color: #cccccc" />
        <input
          class="appearance-none pl-8 block w-64 bg-gray-100 text-gray-700 border-2 border-gray-400 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white text-left"
          id="grid-first-name"
          v-model="searchQuery"
          type="text"
          placeholder="Search Blogs"
        />
      </div>
      <div>
        <button @click="createBlogCategory" class="w-48 px-4 py-1 sm:text-xl text-sm font-bold text-white rounded-full bg-baits-green focus:outline-none">
          Blog Category
        </button>
      </div>
    </div>
    <div class="table-container pt-10 px-10 mx-auto">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-baits-blue text-white">
                  <tr>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Author</th>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Created Date</th>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Publish Date</th>
                    <th class="px-6 py-3 text-left text-sm font-bold leading-4 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-gray-900">
                  <tr v-for="(blog, index) in blogs.data" :key="index" class="even:bg-gray-100">
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">
                        {{ blog.title }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">
                        {{ blog.author }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">
                        {{ blog.status }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">
                        {{ blog.createdDate }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">
                        {{ blog.publishDate }}
                      </div>
                    </td>
                    <td class="flex text-left text-baits-blue px-6 py-4 whitespace-no-wrap">
                      <font-awesome-icon title="Edit" @click="editBlog(blog.id)" :icon="['fas', 'edit']" class="cursor-pointer w-4 h-4" />
                      <font-awesome-icon title="View" @click="viewBlog(blog.id)" :icon="['fas', 'eye']" class="ml-4 cursor-pointer w-4 h-4" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="blogs.result > 0">
      <div class="grid grid-rows-1 grid-flow-col sm:px-6 lg:px-8">
        <div>
          <vue-ads-pagination
            :total-items="blogs.total"
            :items-per-page="Number.parseInt(blogs.page.pageSize)"
            :page="page"
            :loading="loading"
            @page-change="pageChange"
          >
            <template slot-scope="props">
              <div class="vue-ads-pr-2 vue-ads-leading-loose">
                {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} blogs
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
    </template>
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';

export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  data() {
    return {
      searchQuery: '',
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      blogDetail: {},
    };
  },
  async fetch({ store }) {
    await store.dispatch('blog/getBlogListForAdmin', {
      pageNum: '',
      pageSize: '',
    });
  },

  computed: {
    ...mapGetters({
      blogs: 'blog/isAdminBlog',
    }),
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapActions({
      getBlogListForAdmin: 'blog/getBlogListForAdmin',
    }),
    editBlog(id) {
      this.$router.push(`/dashboard/admin/blog/edit/${id}`);
    },
    viewBlog(id) {
      this.$router.push(`/dashboard/admin/blog/detail/${id}`);
    },
    createBlogCategory() {
      this.$router.push(`/dashboard/admin/category`);
    },
    pageChange(page) {
      this.page = page;
      this.getBlogListForAdmin({
        pageNum: this.page,
        pageSize: this.blogs.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getBlogListForAdmin({ pageNum: '', pageSize: pageSize });
    },
  },
};
</script>
<style>
button:focus {
  outline: none;
}
</style>
