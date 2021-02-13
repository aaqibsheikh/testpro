<template>
  <!-- bait-detail-modal -->
  <modal id="bait-detail-modal" v-cloak class="bait-detail-modal">
    <div slot="body" class="text-left text-gray-700">
      <div class="w-full m-auto">
        <!-- <div class="grid grid-cols-2">
          <div class="text-lg col-span-12 sm:col-span-1 sm:mb-0 mb-3">
            <span
              class="text-gray-700 cursor-pointer"
              @click="$router.push('/dashboard/baits')"
              >My Baits</span
            >
            <span class="text-gray-700 px-1">/</span>
            <span class="font-bold text-baits-blue">Baits Details</span>
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:mt-10 mt-5 mb-2"
          v-if="detail.status !== 'Draft'"
        >
          <BaitsStepper />
        </div> -->
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
    </div>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import BaitsStepper from '@/components/common/widgets/BaitsStepper';
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
    BaitsStepper,
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
  computed: {
    ...mapGetters({
      detail: 'baits/getBaitsDetail',
    }),
  },
};
</script>
<style>
.bait-detail-modal > .modal-box {
  max-width: 75%;
}
</style>
