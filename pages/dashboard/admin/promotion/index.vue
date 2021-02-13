<template>
  <div class="w-full">
    <Header />
    <div class="container mx-auto flex justify-between p-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded-full" label="Add New" @click="addNew()">
        <font-awesome-icon class="w-5 h-5" icon="plus" style="color: #fff" />
      </button>
      <div class="search-container">
        <font-awesome-icon class="transform absolute translate-y-3 translate-x-2 text-gray-500 w-5 h-5" icon="search" />
        <input
          class="appearance-none pl-8 block w-48 bg-gray-100 text-gray-700 border-2 border-gray-400 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white text-left"
          id="grid-first-name"
          v-model="searchQuery"
          type="text"
          placeholder="Search Promotions"
        />
      </div>
    </div>
    <div class="table-container px-10 mx-auto">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-baits-blue text-white">
                  <tr>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Industry</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Start Date</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">End Date</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left font-bold leading-4 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-gray-900">
                  <tr v-for="(promotion, index) in promotions.data" :key="index" class="even:bg-gray-100">
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.title }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.industry }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.description.substring(0, 20) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.promoStartDate }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.promoEndDate }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="leading-5">{{ promotion.status }}</div>
                    </td>
                    <td class="flex text-left text-baits-blue px-6 py-4 whitespace-no-wrap">
                      <font-awesome-icon title="Edit" @click="editPromotion(promotion.id)" :icon="['fas', 'edit']" class="cursor-pointer w-5 h-5" />
                      <font-awesome-icon title="View" @click="viewPromotion(promotion.id)" :icon="['fas', 'eye']" class="ml-4 cursor-pointer w-5 h-5" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="promotions.result > 0">
      <div class="grid grid-rows-1 grid-flow-col px-10 mx-auto">
        <div>
          <vue-ads-pagination
            :total-items="promotions.total"
            :items-per-page="Number.parseInt(promotions.page.pageSize)"
            :page="page"
            :loading="loading"
            @page-change="pageChange"
          >
            <template slot-scope="props">
              <div class="vue-ads-pr-2 vue-ads-leading-loose">
                {{ Number.parseInt(props.start) }} to {{ Number.parseInt(props.end) }} of {{ Number.parseInt(props.total) }} promotions
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
      selected: {},
      isEditing: false,
      promotionToDel: {},
      loading: false,
      page: 0,
      selectItems: 5,
      isDomReady: false,
      promotionDetail: {},
    };
  },
  async fetch({ store }) {
    await store.dispatch('promotion/getPromotionListForAdmin', {
      pageNum: '',
      pageSize: '',
    });
  },

  computed: {
    ...mapGetters({
      promotions: 'promotion/isAdminPromotions',
    }),
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    ...mapActions({
      getPromotionListForAdmin: 'promotion/getPromotionListForAdmin',
    }),
    // promotionStatus(status) {
    //   if (status === 0) return 'New';
    //   else if (status === 1) return 'Pending';
    //   else if (status === 2) return 'Approved';
    //   else if (status === 3) return 'Rejected';
    // },
    editPromotion(id) {
      this.$router.push(`/dashboard/admin/promotion/edit/${id}`);
    },
    viewPromotion(id) {
      this.$router.push(`/dashboard/admin/promotion/detail/${id}`);
    },
    viewPromoDetail(promotion) {
      this.promotionDetail = promotion;
      this.$nextTick(() => {
        VoerroModal.show('promo-detail-modal');
      });
    },
    pageChange(page) {
      this.page = page;
      this.getPromotionListForAdmin({
        pageNum: this.page,
        pageSize: this.promotions.page.pageSize,
      });
    },
    getSelectedItemsByPaging(pageSize) {
      this.getPromotionListForAdmin({ pageNum: '', pageSize: pageSize });
    },
    addNew() {
      this.$router.push('/dashboard/admin/promotion/add');
    },
  },
};
</script>
<style>
button:focus {
  outline: none;
}
</style>
