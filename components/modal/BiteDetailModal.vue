<template>
  <!-- bite-detail-modal -->
  <modal id="bite-detail-modal" v-cloak class="bite-detail-modal">
    <div slot="body" class="text-left text-gray-700">
      <div class="w-full m-auto">
        <BLOC :data="detail" v-if="detail.classification === 'BLOC'" />
        <BTL :data="detail" v-if="detail.classification === 'BTL'" />
        <PLOC :data="detail" v-if="detail.classification === 'PLOC'" />
        <PTL :data="detail" v-if="detail.classification === 'PTL'" />
        <PPL :data="detail" v-if="detail.classification === 'PPL'" />
        <BPL :data="detail" v-if="detail.classification === 'BPL'" />
        <PROC :data="detail" v-if="detail.classification === 'PROC'" />
        <PROR :data="detail" v-if="detail.classification === 'PROR'" />
        <PINS :data="detail" v-if="detail.classification === 'PINS'" />
        <Fab class="block sm:hidden" />
      </div>
    </div>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import Fab from '@/components/common/widgets/Fab';
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
    Fab,
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
      detail: 'bite/getBiteDetail',
    }),
  },
};
</script>
<style>
.bite-detail-modal > .modal-box {
  max-width: 75%;
}
</style>