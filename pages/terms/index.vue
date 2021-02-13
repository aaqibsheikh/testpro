<template>
  <div>
    <div class="overflow-hidden">
      <template v-if="calcWidth <= 1023 && isDomReady">
        <MobileNavbar />
      </template>
      <template v-if="calcWidth > 1023 && isDomReady">
        <Navbar />
      </template>
      <div class="container m-auto md:mt-20 mt-10 md:mb-20 mb-10 shadow-none">
        <div>
          <pdf v-for="i in 4" :key="i" :src="require('~/static/Baitsbite_Website_Terms_of_Use.pdf')" :page="i" class="mb-5 border shadow-lg"></pdf>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';

export default {
  components: {
    Navbar,
    MobileNavbar,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  mounted() {
    this.isDomReady = true;
  },
  computed: {
    calcWidth() {
      return this.windowWidth;
    },
  },
};
</script>
