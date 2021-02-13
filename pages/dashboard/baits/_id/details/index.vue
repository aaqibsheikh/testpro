<template>
  <div class="w-full px-6 md:px-12 m-auto sm:mt-8 mt-32 md:mt-16">
    <BaitsHeader :status="detail.status" text="Baits Details" />
    <BLOC :data="detail" v-if="detail.classification === 'BLOC'" />
    <BTL :data="detail" v-if="detail.classification === 'BTL'" />
    <PLOC :data="detail" v-if="detail.classification === 'PLOC'" />
    <PTL :data="detail" v-if="detail.classification === 'PTL'" />
    <PPL :data="detail" v-if="detail.classification === 'PPL'" />
    <BPL :data="detail" v-if="detail.classification === 'BPL'" />
    <PROC :data="detail" v-if="detail.classification === 'PROC'" />
    <PROR :data="detail" v-if="detail.classification === 'PROR'" />
    <PINS :data="detail" v-if="detail.classification === 'PINS'" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import BaitsHeader from '@/components/baits/BaitsHeader';
import BLOC from '@/components/baits/BLOC';
import BTL from '@/components/baits/BTL';
import PLOC from '@/components/baits/PLOC';
import PTL from '@/components/baits/PTL';
import PPL from '@/components/baits/PPL';
import BPL from '@/components/baits/BPL';
import PROC from '@/components/baits/PROC';
import PROR from '@/components/baits/PROR';
import PINS from '@/components/baits/PINS';
export default {
  components: {
    BaitsHeader,
    BLOC,
    BTL,
    PLOC,
    PTL,
    PPL,
    BPL,
    PROC,
    PROR,
    PINS,
  },
  async fetch({ app, params, store }) {
    await store.dispatch('baits/getBaitsDetail', params.id);
  },
  computed: {
    ...mapGetters({
      detail: 'baits/getBaitsDetail',
    }),
  },
};
</script>
<style></style>
