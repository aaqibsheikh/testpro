<template>
  <div class="w-full">
    <Header />
    <div class="md:px-12 px-4 m-auto md:mt-16 sm:mt-8 mt-32">
      <div class="flex flex-wrap">
        <button @click="$router.go(-1)" class="bg-baits-blue px-2 py-1 text-sm text-white rounded-md focus:outline-none">Back</button>
      </div>
      <form>
        <div class="flex flex-wrap bg-white p-4 mt-2 rounded-sm">
          <div class="lg:w-2/3 w-full">
            <div class="table-container px-10 pt-6">
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th class="px-6 py-3 bg-gray-50 text-left text-sm font-bold leading-4 text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-sm font-bold leading-4 text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-sm font-bold leading-4 text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="(category, index) in categories.data" :key="index">
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="text-sm leading-5 text-gray-900">
                                {{ category.name }}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="text-sm leading-5 text-gray-900">
                                {{ promotionStatus(category.status) }}
                              </div>
                            </td>
                            <td class="text-left text-baits-blue px-6 py-4 whitespace-no-wrap">
                              <font-awesome-icon title="Edit" @click="editBlogCategory(category)" :icon="['fas', 'edit']" class="cursor-pointer w-4 h-4" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 w-full">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full px-2 mb-4">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Category Name</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  v-validate="'required'"
                  name="categoryName"
                  data-vv-as="category name"
                  v-model="categoryName"
                />
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('categoryName')">{{ errors.first('categoryName') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full mb-4 px-2">
                <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">Status</label>
                <v-select
                  :options="status"
                  label="text"
                  :reduce="(status) => status.value"
                  v-model="statusSelected"
                  :clearable="false"
                  v-validate="'required'"
                  name="status"
                >
                  <template #search="{ attributes, events }">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                  </template>
                </v-select>
                <div class="validate-error-msg text-red-500 text-sm">
                  <span class="caption" v-if="errors.has('status')">{{ errors.first('status') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap justify-around">
              <button
                @click="createOrUpdateBlogCategory"
                type="button"
                class="my-2 py-1 px-8 focus:outline-none rounded-full bg-baits-blue text-white font-bold text-lg"
              >
                {{ editBtn ? 'Edit' : 'Create' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import Header from '@/components/dashboard/Header';

export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  data() {
    return {
      categoryName: '',
      statusSelected: null,
      status: [
        { text: 'New', value: 0 },
        { text: 'Pending', value: 1 },
        { text: 'Approved', value: 2 },
        { text: 'Rejected', value: 3 },
      ],
      editBtn: false,
      editCatId: null,
    };
  },
  async fetch({ store }) {
    await store.dispatch('blog/getBlogCategoriesForAdmin');
  },
  computed: {
    ...mapGetters({
      categories: 'blog/isAdminBlogCategories',
    }),
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getBlogCategoriesForAdmin: 'blog/getBlogCategoriesForAdmin',
    }),
    editBlogCategory(cat) {
      this.editBtn = true;
      this.editCatId = cat.id;
      this.categoryName = cat.name;
      this.statusSelected = cat.status;
    },
    promotionStatus(status) {
      if (status === 0) return 'New';
      else if (status === 1) return 'Pending';
      else if (status === 2) return 'Approved';
      else if (status === 3) return 'Rejected';
    },
    async createOrUpdateBlogCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setLoader(true);

          if (this.editCatId !== null) {
            var api = `/blog/category/${this.editCatId}`;
            if (process.env.API_PROXY === '1' && process.client) {
              api = '/api' + api;
            }
          } else {
            var api = '/blog/category';
            if (process.env.API_PROXY === '1' && process.client) {
              api = '/api' + api;
            }
          }

          const postData = {
            name: this.categoryName,
            status: this.statusSelected,
          };

          this.$axios
            .post(api, postData)
            .then((response) => {
              if (response.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: `Category ${this.editBtn ? 'updated' : 'created'} successfully`,
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });

                this.resetForm();
                this.getBlogCategoriesForAdmin();
              } else {
                this.resetForm();
                this.setLoader(false);
                this.$toast.open({
                  message: `Failed to ${this.editBtn ? 'update' : 'create'} category`,
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
              }
            })
            .catch((error) => {
              this.setLoader(false);
              console.log(error);
            });
        }
      });
    },
    resetForm() {
      this.$validator.reset();
      this.categoryName = '';
      this.statusSelected = null;
      this.editBtn = false;
      this.editCatId = null;
    },
  },
};
</script>
