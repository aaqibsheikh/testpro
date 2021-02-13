<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap px-10 my-10">
      <div class="text-left lg:w-1/2 md:w-4/6 sm:w-4/5 w-full">
        <h2 class="text-baits-blue font-bold text-4xl">{{ promotion.title }}</h2>
        <h6 class="text-md text-gray-500">{{ promotion.industry }}</h6>
        <p>
          <span class="text-sm text-gray-900">Validity:</span>
          <span class="text-sm">
            {{ formatDateMonthYearHandler(promotion.promoStartDate) }} to
            {{ formatDateMonthYearHandler(promotion.promoEndDate) }}
          </span>
        </p>
        <img v-if="promotion.banner" :src="promotion.banner" class="inline-block" />
        <img v-else src="~/static/images/promo-default.png" class="inline-block" />
        <p class="text-base text-gray-900 py-2">{{ promotion.description }}</p>

        <div class="flex flex-wrap items-center justify-evenly my-10">
          <button
            @click="editPromotion(promotion.id)"
            class="focus:outline-none sm:mt-0 mt-2 mr-1 sm:w-3/12 w-full bg-baits-blue px-5 py-2 rounded-full text-white text-sm font-bold"
          >Edit</button>
          <button
            v-if="promotion.status === 'Pending'"
            @click="approvePromotionHandler(promotion.id)"
            class="focus:outline-none sm:mt-0 mt-2 mr-1 sm:w-3/12 w-full bg-baits-blue px-5 py-2 rounded-full text-white text-sm font-bold"
          >Approve</button>
          <button
            v-if="promotion.status === 'Pending'"
            @click="rejectPromotionHandler(promotion.id)"
            class="focus:outline-none sm:mt-0 mt-2 sm:w-3/12 w-full bg-gray-400 px-5 py-2 rounded-full text-white text-sm font-bold"
          >Reject</button>
        </div>
      </div>
    </div>

    <ConfirmRejectPromotion v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Header from '@/components/dashboard/Header';
import ConfirmRejectPromotion from '@/components/modal/ConfirmRejectPromotion';
import { formatDateMonthYear } from '@/services';
export default {
  layout: 'dashboard',
  components: {
    Header,
    ConfirmRejectPromotion,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  async fetch({ store, params }) {
    await store.dispatch('promotion/getPromotionDetailById', {
      id: params.id,
    });
  },
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
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
      getPromotionListForAdmin: 'promotion/getPromotionListForAdmin',
      _approvePromotion: 'promotion/approvePromotion',
      _rejectPromotion: 'promotion/rejectPromotion',
    }),
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },
    editPromotion(id) {
      this.$router.push(`/dashboard/admin/promotion/edit/${id}`);
    },
    approvePromotionHandler(id) {
      this.setLoader(true);
      this._approvePromotion({ id: id })
        .then((res) => {
          this.setLoader(false);
          if (res.data.result) {
            VoerroModal.hide('promo-detail-modal');
            this.$toast.open({
              message: 'Promotion approved',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
            this.getPromotionListForAdmin({
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
    rejectPromotionHandler() {
      VoerroModal.show('confirm-reject-promotion-modal');
    },
  },
};
</script>
