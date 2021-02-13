<template>
  <div>
    <client-only v-cloak>
      <div class="w-full bg-white px-10">
        <!-- <login-modal ref="userModal" :new-user="true" /> -->
      </div>
      <div class="banner-bg overflow-hidden">
        <template v-if="calcWidth <= 1023 && isDomReady">
          <MobileNavbar />
        </template>
        <template v-if="calcWidth > 1023 && isDomReady">
          <Navbar @user-enter="callUserAction($event)" />
        </template>
        <!-- <div v-if="false" class="flex flex-wrap banner-box">
          <div class="lg:w-1/2 w-full lg:p-0 px-4 lg:text-left text-center lg:py-0 py-10">
            <h2 class="banner-heading font-bold text-white mt-12 leading-none">
              Finding the right Bankers, Property Agents or Insurance Agents for your solution?
            </h2>
            <p class="w-full text-2xl text-white lg:my-6 mt-20">Access to more than 10,000 bankers, agents and advisors with just a few clicks now!</p>
            <button class="focus:outline-none lg:mt-0 mt-12 px-8 py-3 text-xl font-bold text-white rounded-lg btn-getStarted-bg" @click="show">
              Get Started
            </button>
          </div>
          <div class="md:w-1/2 banner-image">
            <img src="~/static/images/Property-Agents-Bankers-Homapage-Banner.png" class="inline-block" />
          </div>
        </div> -->
        <div class="w-full">
          <Hero />
          <!-- <div class="w-1/2 bg-white">
            <button @click="openLoginModal" class="focus:outline-none lg:mt-0 mt-12 px-8 py-3 text-xl font-bold text-white rounded-lg btn-getStarted-bg">
              Login Modal
            </button>
            <button @click="openSignupModal" class="focus:outline-none lg:mt-0 mt-12 px-8 py-3 text-xl font-bold text-white rounded-lg btn-getStarted-bg">
              Signup Modal
            </button>
          </div> -->
        </div>
        <div class="hidden w-full bg-white px-10">
          <!-- temporary hidden for now -->
          <FeaturedBanner />
        </div>
      </div>
      <div class="container m-auto">
        <div class="flex flex-wrap">
          <div class="w-full">
            <h2 class="md:px-0 px-4 md:text-4xl sm:text-2xl text-2xl font-bold text-center md:mt-16 mt-8 mb-4 text-baits-blue">Popular Services</h2>
          </div>
        </div>
        <div class="w-full">
          <PopularFeatures />
        </div>

        <div class="flex flex-wrap">
          <div class="w-full">
            <h2 class="md:px-0 px-4 md:text-4xl sm:text-2xl text-2xl font-bold text-center md:mt-16 mt-8 mb-4 text-baits-blue">Top Professionals</h2>
          </div>
        </div>
        <div class="w-full">
          <Popular v-if="calcWidth > 768 && isDomReady" />
          <PopularSlider v-if="calcWidth <= 768 && isDomReady" />
          <div class="container m-auto my-12 flex justify-center">
            <nuxt-link
              to="/providers"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 font-black src-btn"
            >
              See more
            </nuxt-link>
          </div>
        </div>

        <!-- <div class="flex flex-wrap">
          <div class="w-full">
            <h2 class="md:px-0 px-4 md:text-4xl sm:text-2xl text-2xl font-bold text-center md:mt-16 mt-8 mb-4 text-baits-blue">
              What Can You Get From Baitsbite
            </h2>
          </div>
        </div>
        <div class="w-full">
          <CoreFeatures />
        </div> -->

        <div class="flex flex-wrap">
          <div class="w-full">
            <h2 class="md:px-0 px-4 md:text-4xl sm:text-2xl text-2xl font-bold text-center md:mt-16 mt-8 mb-4 text-baits-blue">Why People Choose Us</h2>
          </div>
        </div>

        <div class="w-full">
          <Perks />
        </div>

        <div class="w-full px-6 my-10">
          <h2 class="text-baits-blue text-xl mb-4 font-bold">Looking for the right Financial Professionals?</h2>
          <p class="text-baits-black-dark text-sm mb-2">
            With our partner investment bankers, mortgage specialists, real estate agents, financial advisors and many other financial professionals from over
            100 banks and agencies, we have the confidence to connect you the right fit with the best solution.
          </p>
          <p class="text-baits-black-dark text-sm mb-4">Tell us more about your requirements and allow us to connect you.</p>
          <button class="focus:outline-none rounded-full px-2 py-1 text-sm text-baits-blue border-2 border-baits-blue font-bold" @click="show">
            Get Started
          </button>

          <div class="text-center">
            <h2 class="text-baits-blue text-xl mt-12 mb-6 font-bold">Have any questions for us?</h2>

            <nuxt-link to="/contact">
              <button class="focus:outline-none rounded-full px-4 py-2 text-sm text-white bg-baits-blue font-bold">Get in touch</button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- <div class="about-us-bg text-white" id="about-box">
        <div class="container m-auto">
          <div class="flex flex-wrap"></div>
          <div class="grid justify-items-center">
            <div class="lg:w-1/2 w-full mx-auto">
              <div class="flex flex-wrap items-center">
                <div class="text-left px-12 py-16">
                  <p class="font-bold md:text-2xl text-center text-lg">Engage with the right people, it matters Get connected to the top experts now</p>
                </div>
              </div>
            </div>
            <div class="pb-8 mx-auto">
              <button
                class="bg-transparent bg-white hover:bg-baits-blue text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded"
              >
                Cast A Bait Now
              </button>
            </div>
          </div>
        </div>
      </div> -->

      <!-- <div class="container m-auto">
        <div class="flex flex-wrap">
          <div class="w-full">
            <h2 class="md:px-0 px-4 text-4xl font-bold text-center md:my-12 my-8">Testimonials</h2>
          </div>
          <div class="w-full md:m-auto mt-12 md:px-0 px-4">
            <div class="grid md:grid-cols-3 grid-cols-1 gap-6 content-center">
              <div class="text-center">
                <div class="py-10 px-4 text-center bank-bg">
                  <img src="~/static/images/bank-icon.png" class="w-16 inline-block" />
                  <h2 class="text-lg text-white font-bold mt-3">BANKING & FINANCE</h2>
                </div>
                <button class="focus:outline-none mt-6 py-2 px-4 text-md text-white rounded-md bank-bg" @click="$router.push('/services/banking-&-finance')">
                  Read More
                </button>
              </div>
              <div class="text-center">
                <div class="py-10 px-4 text-center property-bg">
                  <img src="~/static/images/property-icon.png" class="w-16 inline-block" />
                  <h2 class="text-lg text-white font-bold mt-3">PROPERTY</h2>
                </div>
                <button class="focus:outline-none mt-6 py-2 px-4 text-md text-white rounded-md property-bg" @click="$router.push('/services/property')">
                  Read More
                </button>
              </div>
              <div class="text-center">
                <div class="py-10 px-4 text-center insurance-bg">
                  <img src="~/static/images/insurance-icon.png" class="w-16 inline-block" />
                  <h2 class="text-lg text-white font-bold mt-3">INSURANCE</h2>
                </div>
                <button class="focus:outline-none mt-6 py-2 px-4 text-md text-white rounded-md insurance-bg" @click="$router.push('/services/insurance')">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <Footer />
      <QuestionaireModal page="home" v-if="isDomReady" />
      <LoginModal v-if="isDomReady" />
      <SignupModal v-if="isDomReady" />
    </client-only>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/common/Hero';
import FeaturedBanner from '@/components/common/FeaturedBanner';
import PopularFeatures from '@/components/common/PopularFeatures';
import CoreFeatures from '@/components/common/CoreFeatures';
import Popular from '@/components/common/Popular';
import PopularSlider from '@/components/common/PopularSlider';
import MobileNavbar from '@/components/common/MobileNavbar';
import Footer from '@/components/common/Footer';
import QuestionaireModal from '@/components/modal/QuestionaireModal';
import Perks from '@/components/common/Perks';
import LoginModal from '@/components/login/Login';
import SignupModal from '@/components/signup/Signup';

export default {
  components: {
    Navbar,
    MobileNavbar,
    Hero,
    FeaturedBanner,
    Popular,
    PopularSlider,
    Footer,
    QuestionaireModal,
    CoreFeatures,
    PopularFeatures,
    Perks,
    LoginModal,
    SignupModal,
  },
  data() {
    return {
      isDomReady: false,
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('questionaires/getQuestionaires');
    await store.dispatch('questionaires/getQuestionaires');
    await store.dispatch('provider/fetchAllProviders', { industry: 'Banking & Finance', type: 'public' });
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
    show() {
      VoerroModal.show('questionaire-modal');
    },
    openLoginModal() {
      VoerroModal.hide('signup-modal');
      VoerroModal.show('login-modal');
    },
    openSignupModal() {
      VoerroModal.hide('login-modal');
      VoerroModal.show('signup-modal');
    },
    callUserAction(modalName) {
      // VoerroModal.show(modalName);
      // this.$refs.userModal.newUser = e === 'signup';
      // this.$refs.userModal.modal.showModal();
    },
  },
};
</script>
<style type="text/css">
h2 {
  font-family: 'Raleway';
}

.src-btn {
  background: linear-gradient(162deg, rgba(0, 112, 192, 1) 0%, rgba(0, 112, 192, 1) 47%, rgb(92, 172, 241) 100%);
  max-width: 190px;
}

.about-us-bg {
  background: rgb(0, 112, 192);
  background: linear-gradient(162deg, rgba(0, 112, 192, 1) 0%, rgba(0, 112, 192, 1) 47%, rgba(181, 209, 234, 1) 100%);
}

.bank-bg {
  background: rgb(0, 119, 216);
  background: linear-gradient(0deg, rgba(0, 119, 216, 1) 0%, rgba(33, 214, 225, 1) 100%);
}

.insurance-bg {
  background: rgb(0, 146, 0);
  background: linear-gradient(0deg, rgba(0, 146, 0, 1) 0%, rgba(1, 251, 3, 1) 100%);
}

.property-bg {
  background: rgb(227, 99, 2);
  background: linear-gradient(0deg, rgba(227, 99, 2, 1) 0%);
}

.btn-getStarted-bg {
  background: rgb(1, 205, 154);
  background: linear-gradient(180deg, rgba(1, 205, 154, 1) 0%, rgba(134, 230, 216, 1) 88%, rgba(217, 231, 244, 1) 100%);
}

.text-box {
  background-color: #fff;
  text-align: center;
  -webkit-box-shadow: 4px 7px 11px 0px rgba(101, 101, 101, 0.6196078431372549);
  box-shadow: 4px 7px 11px 0px rgba(101, 101, 101, 0.6196078431372549);
  padding: 30px 20px;
  z-index: 9;
  margin-top: -95px;
}

#about-box {
  min-height: 33vh;
}

@media (min-width: 1280px) {
  .banner-box {
    margin: 0 35px;
  }

  .banner-image {
    position: absolute !important;
    top: 45rem !important;
    right: 0px !important;
    text-align: center;
  }

  .banner-heading {
    font-size: 49px;
    line-height: 60px;
  }

  .about-us-img {
    margin-top: -60px;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .banner-box {
    margin: 0 35px;
  }

  .banner-image {
    text-align: center;
    position: absolute;
    top: 19rem;
    right: 0px;
  }

  .banner-heading {
    font-size: 38px;
    line-height: 60px;
  }

  .banner-wave-image {
    width: 100%;
    margin-left: 0rem;
    margin-top: 1rem;
  }

  .about-us-img {
    margin-top: -5px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .banner-image {
    display: none;
  }

  .banner-box {
    margin: 0 35px;
  }

  .banner-heading {
    font-size: 36px;
    line-height: 60px;
  }

  .banner-wave-image {
    width: 100%;
    margin-left: 0rem;
    margin-top: 1rem;
  }

  .about-us-img {
    margin-top: -60px;
  }
}

@media (min-width: 560px) and (max-width: 767px) {
  .banner-image {
    display: none;
  }

  .banner-box {
    margin: 0 35px;
  }

  .banner-heading {
    font-size: 36px;
    line-height: 60px;
  }

  .banner-wave-image {
    width: 100%;
    margin-left: 0rem;
    margin-top: 1rem;
  }

  .about-us-img {
    margin-top: -60px;
  }
}

@media (min-width: 320px) and (max-width: 559px) {
  .banner-image {
    display: none;
  }

  .banner-box {
    margin: 0 35px;
  }

  .banner-heading {
    font-size: 34px;
    line-height: 60px;
  }

  .banner-wave-image {
    width: 100%;
    margin-left: 0rem;
    margin-top: 1rem;
  }

  .about-us-img {
    margin-top: -60px;
  }
}
</style>
