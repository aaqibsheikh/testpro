<template>
  <div>
    <div class="overflow-hidden">
      <template v-if="calcWidth <= 1023 && isDomReady">
        <MobileNavbar />
      </template>
      <div class="container m-auto">
        <template v-if="calcWidth > 1023 && isDomReady">
          <Navbar />
        </template>
      </div>
      <div class="container m-auto lg:mt-20 mt-32 lg:mb-20 mb-10 px-8">
        <h2 class="text-baits-blue font-black text-xl">Insurance</h2>
        <!-- <div class="my-10">
          <p @click="toggleTab('personal')" :class="[tab === 'personal' ? 'text-baits-blue': 'text-gray-600']" class="inline-block cursor-pointer text-lg font-bold">Personal</p>
          <span>|</span>
          <p @click="toggleTab('commercial')" :class="[tab === 'commercial' ? 'text-baits-blue': 'text-gray-600']" class="inline-block cursor-pointer text-lg font-bold">Commercial</p>
        </div>
        <div v-if="tab === 'personal'">
          <Personal />
        </div>
        <div v-if="tab === 'commercial'">
          <Commercial />
        </div>-->
        <Personal />
      </div>
      <div class="flex flex-wrap my-12 justify-center">
        <button
          class="focus:outline-none py-3 px-6 text-xl font-bold text-white rounded-md bg-baits-blue"
          @click="show"
        >Cast A Bait Now</button>
      </div>
    </div>
    <QuestionaireModal page="home" v-if="isDomReady" />
  </div>
</template>
<script>
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Personal from '@/components/home/Insurance/Personal';
import QuestionaireModal from '@/components/modal/QuestionaireModal';

export default {
  components: {
    Navbar,
    MobileNavbar,
    Personal,
    QuestionaireModal,
  },
  data() {
    return {
      tab: 'personal',
      isDomReady: false,
    };
  },
  computed: {
    calcWidth() {
      return this.windowWidth;
    },
  },
  mounted() {
    this.isDomReady = true;
  },
  methods: {
    toggleTab(tab) {
      this.tab = tab;
    },
    show() {
      VoerroModal.show('questionaire-modal');
    },
  },
  watch: {
    $route() {
      this.tab = this.$route.query.tab;
    },
  },
};
</script>
<style>
.customFont {
  width: 20px !important;
  font-size: 20px !important;
  display: inline-block !important;
}

.iconColor:hover svg path,
.iconColor:hover {
  fill: white;
  color: white;
}

.iconColor2:hover svg path,
.iconColor2:hover {
  fill: white;
  color: white;
}

.customFont2 {
  width: 20px !important;
  font-size: 14px !important;
  display: inline-block !important;
}
</style>
