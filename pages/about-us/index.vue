<template>
  <div>
    <template v-if="calcWidth <= 1023 && isDomReady">
      <MobileNavbar />
    </template>
    <template v-if="calcWidth > 1023 && isDomReady">
      <Navbar />
    </template>
    <div class="header-margin">
      <div class="custom-margin">
        <div class="flex flex-wrap mt-20">
          <div class="sm:w-1/2 w-full">
            <h2 class="text-baits-blue font-bold text-3xl mb-3">The Baitsbite Story</h2>
            <p class="text-baits-gray-dark mb-2">
              Most of our friends around us would have encountered at least one bad experience when it comes to dealing with financial professionals. These
              financial professionals can be your friends, family or even complete strangers that approached you at roadshows or via street canvassing.
            </p>
            <br />
            <p class="text-baits-gray-dark mb-2">
              With more than a decade of experience in the financial industry, we understand the importance of getting a good financial expert and the pain of
              engaging the wrong ones.
            </p>
            <br />
            <p class="text-baits-gray-dark mb-2">
              We understand this pain and came together with a common goal to develop Baitsbite to bridge this gap. We believe that a good financial
              professional can be a major asset when it comes to making the right long-term financial decisions.
            </p>
            <br />
            <p class="text-baits-gray-dark mb-2">
              Founded in 2019, Baitsbite was eventually developed to match and connect the right “trusted and recommended” financial professionals to people or
              businesses that seek sound financial solutions.
            </p>
          </div>
          <div class="sm:w-1/2 w-full">
            <img src="~/static/images/about_hero.png" />
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center mt-20">
          <div class="sm:w-1/3 w-full">
            <h2 class="text-baits-blue text-2xl font-black">Vision</h2>
          </div>
          <div class="sm:w-1/3 w-full">
            Baitsbite aims to create an online platform that helps to connect trusted and recommended financial professionals around the world to people and
            businesses that seek sound financial solutions.
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center mt-20">
          <div class="sm:w-1/3 w-full">
            <h2 class="text-baits-blue text-2xl font-black">Our Mission</h2>
          </div>
          <div class="sm:w-1/3 w-full">
            Entering into a post COVID-19 era, we aim to shape the way how people and businesses engage financial professionals remotely and globally.
          </div>
        </div>
        <h2 class="block font-black text-3xl text-baits-blue mt-20 text-left sm:text-center">Our values</h2>
        <div class="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 text-center mt-10">
          <div class="p-10 bg-baits-blue">
            <h2 class="text-2xl text-white mb-6 font-bold">Trust</h2>
            <p class="text-base text-baits-light-gray">Trust is essential to an effective team, because it provides a sense of safety.</p>
          </div>
          <div class="p-10 bg-baits-blue">
            <h2 class="text-2xl text-white mb-6 font-bold">Integrity</h2>
            <p class="text-base text-baits-light-gray">
              Integrity leads to the decision to do the right thing by co-workers, customers, and stakeholders alike.
            </p>
          </div>
          <div class="p-10 bg-baits-blue">
            <h2 class="text-2xl text-white mb-6 font-bold">Motivated</h2>
            <p class="text-base text-baits-light-gray">
              Motivated employee is key to an organization’s success. It's the level of commitment, drive and energy that a company's workers bring to the role
              everyday
            </p>
          </div>
          <div class="p-10 bg-baits-blue">
            <h2 class="text-2xl text-white mb-6 font-bold">Empathy</h2>
            <p class="text-base text-baits-light-gray">
              Empathy generates an interest in and appreciation for others, paving the way to more productive working relationships
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/common/Navbar';
import MobileNavbar from '@/components/common/MobileNavbar';
import Footer from '@/components/common/Footer';

export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
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
  methods: {},
};
</script>
<style scoped>
.custom-margin {
  width: 80%;
  margin: auto;
}
</style>
