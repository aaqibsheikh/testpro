<template>
  <div>
    <template v-if="calcWidth <= 1023 && isDomReady">
      <MobileNavbar />
    </template>
    <template v-if="calcWidth > 1023 && isDomReady">
      <Navbar />
    </template>
    <div class="header-margin">
      <!-- <h2 class="font-bold text-4xl text-center bg-baits-dark-blue lg:my-20 mt-32 heading">How it Works</h2> -->
      <div class="bg-baits-dark-blue py-10 text-center text-white">
        <h2 class="font-bold text-4xl">How it Works</h2>
        <p v-if="tab === 'customers'" class="text-sm mb-2 px-2 sm:px-0">
          Seek valuable financial advices from recommended financial professionals online privately
        </p>
        <p v-if="tab === 'professionals'" class="text-sm mb-2 px-2 sm:px-0">
          List and market yourself to attract potential customers on our costeffective platform.
        </p>
        <div class="bg-white rounded-full p-1 m-auto w-48 flex items-center justify-between">
          <div
            class="text-xs py-2 px-4 cursor-pointer"
            @click="toggleWork('customers')"
            :class="[tab === 'customers' ? 'bg-baits-blue rounded-full' : 'text-baits-hard-gray']"
          >
            Customers
          </div>
          <div
            class="text-xs p-2 cursor-pointer"
            @click="toggleWork('professionals')"
            :class="[tab === 'professionals' ? 'bg-baits-blue rounded-full' : 'text-baits-hard-gray']"
          >
            Professionals
          </div>
        </div>
      </div>
      <CustomersWork class="lg:w-3/5 sm:w-full custom-margin" v-if="tab === 'customers'" />
      <ProfessionalsWork class="lg:w-3/5 sm:w-full custom-margin" v-if="tab === 'professionals'" />
      <div id="faq" class="p-10"></div>
      <h2 class="font-bold text-4xl text-baits-blue text-center">Frequently asked questions</h2>
      <div class="lg:w-3/5 sm:w-full m-auto">
        <div class="flex flex-wrap mt-10 lg:px-0 px-4">
          <div class="md:w-1/2 w-full">
            <VueFaqAccordion :items="leftQuestions" />
          </div>
          <div class="md:w-1/2 w-full">
            <VueFaqAccordion :items="rightQuestions" />
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
import CustomersWork from '@/components/home/HowItWorks/CustomersWork';
import ProfessionalsWork from '@/components/home/HowItWorks/ProfessionalsWork';

export default {
  components: {
    Navbar,
    MobileNavbar,
    Footer,
    CustomersWork,
    ProfessionalsWork,
  },
  data() {
    return {
      tab: 'customers',
      isDomReady: false,
      leftQuestions: [
        {
          title: 'What is a bait?',
          value:
            'It refers to a <h2 class="text-baits-blue inline-block">request</h2> create by the customer. It can be something related to finance, property or insurance.',
        },
        {
          title: 'What is a bite?',
          value:
            'A bite is like a <h2 class="text-baits-blue inline-block">response</h2>. So whenever a banker or agent responded to a bait that match them, it’s a bite! ',
        },
        {
          title: 'What is a baitsbite?',
          value: 'A baitsbite happens every time a customer successfully accepted a bite to their bait.',
        },
        {
          title: 'Is there any sign up or brokerage fee?',
          value: 'No. We don’t charge anything to our customer.',
        },
        {
          title: 'Is my personal particular private and anonymous to others?',
          value: 'Yes. Your particular will not be revealed when you cast a bait. ',
        },
      ],

      rightQuestions: [
        {
          title: 'Why should I use baitsbite?',
          value:
            'Because it is the fastest and easiest way to reach out to the right financial/property/insurance experts for advice through our recommendation and review system. And it`s free!',
        },
        {
          title: 'Is the bankers, RMs or agents on baitsbite trustworthy?',
          value: 'Yes. All bankers and agents are screen through before we approve their applications. ',
        },
        {
          title: 'How fast can I get a response?',
          value:
            'It can be as fast as a few mins or even instantly as our bankers/agents can respond immediately with a bite with our real-time notification. ',
        },
        {
          title: 'Who can sign up for baitsbite?',
          value: 'A person or company who want to look for a banker, a relationship manager, a property agent or a insurance advisor.',
        },
        {
          title: 'Is baitsbite only for business?',
          value: 'No. You can also create personal bait.',
        },
      ],
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
  methods: {
    toggleWork(tab) {
      this.tab = tab;
    },
  },
};
</script>
<style>
.text-box {
  background-color: #fff;
  text-align: center;
  -webkit-box-shadow: 4px 7px 11px 0px rgba(101, 101, 101, 0.6196078431372549);
  box-shadow: 4px 7px 11px 0px rgba(101, 101, 101, 0.6196078431372549);
  padding: 30px 20px;
  /* margin-top: -170px; */
}

.zIndex9 {
  z-index: 9;
}

.accordion {
  border: none !important;
}

.accordion__item {
  border: none !important;
}

.accordion__title-text {
  font-size: 1.25rem;
  font-weight: 500;
}

.accordion__title_active {
  color: #ffffff !important;
  background-color: #0070c0 !important;
  border-radius: 0.5rem !important;
}

.accordion__title:hover {
  color: #ffffff !important;
  background-color: #0070c0 !important;
  border-radius: 0.5rem;
}

.accordion__title {
  padding: 10px 25px 10px 25px !important;
}

.accordion__value {
  font-size: 16px !important;
  color: #777 !important;
  font-family: 'akkurat-light' !important;
  line-height: 26px !important;
  padding: 1.25rem !important;
}

.accordion__toggle-button_active::before {
  background: #ffffff !important;
}

.accordion__toggle-button_active::after {
  background: #ffffff !important;
}

.accordion__title_active {
  color: white !important;
}

.accordion__title:hover .accordion__toggle-button::before,
.accordion__title:hover .accordion__toggle-button::after {
  background: #fff !important;
}

.accordion__toggle-button_active::before .accordion__toggle-button {
  width: 25px !important;
  height: 25px !important;
}

@media (min-width: 1280px) {
  .heading {
    margin-bottom: 1rem;
  }

  .custom-margin {
    width: 80%;
    margin: auto;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .heading {
    margin-bottom: 12rem;
  }

  .custom-margin {
    width: 80%;
    margin: auto;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .heading {
    margin-bottom: 7rem;
  }

  .custom-margin {
    width: 100%;
    margin: auto;
  }
}

@media (min-width: 560px) and (max-width: 767px) {
  .heading {
    margin-bottom: 0rem;
  }

  .custom-margin {
    width: 100%;
    margin: auto;
  }
}

@media (min-width: 320px) and (max-width: 559px) {
  .heading {
    margin-bottom: 1rem;
  }

  .custom-margin {
    width: 100%;
    margin: auto;
  }
}
</style>
