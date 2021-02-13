<template>
  <div class="w-full">
    <Header />
    <div class="flex flex-wrap md:mt-2 sm:mt-8 mt-20">
      <h2
        class="w-full text-center text-5xl font-bold underline"
        style="color: #414056;"
      >{{ promotion.title }}</h2>
      <div class="w-full">
        <img :src="promotion.banner" class="inline-block" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import { mapGetters, mapActions } from 'vuex';
export default {
  layout: 'dashboard',
  components: {
    Header,
  },
  async fetch({ store, params }) {
    await store.dispatch('promotion/getPromotionDetailById', { id: params.id });
  },
  mounted() {},
  computed: {
    ...mapGetters({
      promotion: 'promotion/getPromotionById',
    }),
  },
  methods: {
    ...mapActions({}),
  },
};
</script>
