<template>
  <div class="w-full">
    <Header />
    <div class="w-full md:px-12 sm:px-6 px-0 m-auto sm:mt-8 mt-32 md:mt-16 providers">
      <div class="flex flex-wrap items-center justify-between mb-3 sm:mx-0 mx-4">
        <div class="text-baits-blue font-bold text-xl lg:mb-0 mb-4">Financial Professionals</div>
        <div class="flex">
          <input class="w-full sm:w-64 h-10 rounded-l-lg p-2 border border-gray-300 focus:outline-none" type="text" placeholder="Search" />
          <button class="bg-baits-blue px-3 rounded-r-lg focus:outline-none">
            <font-awesome-icon class="text-white w-6 h-6" :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <div class="flex flex-wrap items-center sm:mx-0 mx-4">
        <div class="lg:w-1/4 sm:w-1/3 w-full mb-4">
          <div class="relative">
            <v-select
              class="baits-input appearance-none block w-full py-1 px-4"
              :clearable="false"
              :options="expertise.industry"
              label="name"
              v-model="selectedIndustry"
              :reduce="(industry) => industry.name"
              v-validate="'required'"
              name="industry"
              @input="getExpertiseByIndustry"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
        </div>
        <!-- <div class="lg:w-1/4 sm:w-1/3 w-full mb-4">
          <div class="relative">
            <v-select
              :options="filteredExpertise"
              label="specialisation"
              v-model="selectedExpertise"
              :reduce="(expertise) => expertise.specialisation"
              v-validate="'required'"
              name="expertise1"
              data-vv-as="expertise"
            >
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
            </v-select>
          </div>
        </div> -->
      </div>
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-8">
        <div class="bg-white border border-baits-light-gray shadow-3xl rounded-2xl sm:mx-0 mx-4" v-for="(provider, key) in providersList" :key="key">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full">
              <div class="w-full">
                <img v-if="provider.avatar" :src="provider.avatar" class="object-cover object-top w-full rounded-t-2xl" style="height: 400px" />
                <img v-else src="~/static/images/default-user.jpg" class="object-cover object-top w-full rounded-t-2xl" style="height: 400px" />
              </div>
              <div class="absolute bottom-0 right-0 bg-white py-1 pl-6 pr-2 font-bold mr-2 mb-4 rounded-full flex items-center">
                <span class="text-baits-green font-normal mr-1">{{ provider.recommendation }}</span>
                <div class="inline-block bg-baits-green rounded-full text-center w-8 h-8 border-2 border-white z-10 flex items-center justify-center">
                  <font-awesome-icon class="text-white w-4 h-4" :icon="['fas', 'thumbs-up']" />
                </div>
                <div class="text-white text-xs font-bold bg-baits-green inline-block uppercase px-4 rounded-r-full py-1 -ml-2 z-0">Recommended</div>
              </div>
            </div>
            <div class="w-full px-4 mt-2 flex flex-wrap items-center justify-between">
              <h2 class="block text-baits-blue font-bold text-lg">{{ provider.firstName }} {{ provider.lastName }}</h2>
              <!-- wait for rating calculation -->
              <!-- <div class="flex items-center">
                <h2 class="text-baits-blue text-3xl inline-block">{{ provider.rating }}</h2>
                <div class="inline-block">
                  <star-rating :max-rating="1" :increment="0.1" :read-only="true" :star-size="18" :show-rating="false" v-model="provider.rating"></star-rating>
                </div>
              </div> -->
            </div>
            <div class="w-full px-4">
              <span class="text-sm text-gray-500">{{ provider.designation }}</span>
            </div>
            <div class="w-full px-4">
              <span class="text-sm text-gray-500">{{ provider.expertise[0] }} | {{ provider.location || 'N/A' }}</span>
            </div>

            <div class="w-full px-4 my-2">
              <p class="text-xs text-gray-500">
                <span>
                  {{ showSome(provider.desc) || 'N/A' }}
                </span>
                <span v-if="provider.desc" class="text-md text-baits-blue font-bold cursor-pointer" @click="$router.push(`/dashboard/providers/${provider.id}`)"
                  >Read more</span
                >
              </p>
            </div>

            <div class="w-full grid grid-cols-2 gap-2 my-3 px-4">
              <div>
                <button
                  class="shadow-sm w-full py-2 px-10 text-sm font-bold bg-baits-blue text-white rounded-lg focus:outline-none flex items-center justify-center"
                  @click="askProvider"
                >
                  <font-awesome-icon class="mr-1 w-4 h-4" :icon="['fas', 'question']" />
                  <span>Ask</span>
                </button>
              </div>
              <div>
                <button
                  class="shadow-sm w-full py-2 px-10 text-sm font-bold bg-baits-green text-white rounded-lg focus:outline-none flex items-center justify-center"
                  @click="$router.push(`/dashboard/providers/${provider.id}`)"
                >
                  <font-awesome-icon class="mr-1 w-4 h-4" :icon="['fas', 'eye']" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-6">
        <button class="focus:outline-none text-baits-blue border border-baits-blue rounded-3xl text-sm px-6 py-2" @click="showMore">Show More</button>
      </div>
    </div>
    <AskProviderModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/dashboard/Header';
import AskProviderModal from '@/components/modal/AskProviderModal';
export default {
  layout: 'dashboard',
  components: {
    Header,
    AskProviderModal,
  },
  data() {
    return {
      limit: true,
      isDomReady: false,
      selectedIndustry: null,
      selectedExpertise: null,
      filteredExpertise: [],
    };
  },
  async fetch({ app, params, store }) {
    await store.dispatch('expertise/getIndustyExpertise');
    await store.dispatch('provider/fetchAllProviders', { industry: 'Banking', type: 'dashboard' });
  },
  computed: {
    ...mapGetters({
      providers: 'provider/getProviders',
      expertise: 'expertise/getAllExpertise',
    }),
    providersList() {
      return this.limit ? this.providers.slice(0, 6) : this.providers;
    },
  },
  mounted() {
    this.isDomReady = true;
    // initialize industry and expertise dropdown
    this.setDropdown();
  },
  methods: {
    ...mapActions({
      fetchAllProviders: 'provider/fetchAllProviders',
    }),
    setDropdown() {
      this.selectedIndustry = this.expertise.industry[0].name;
      // filter expertise based on industry
      this.filteredExpertise = this.expertise.expertise.filter((skill) => {
        if (skill.category === this.selectedIndustry) {
          return skill;
        }
      });

      // default value for expertise
      for (let skill of this.expertise.expertise) {
        if (skill.category === this.selectedIndustry) {
          this.selectedExpertise = skill.specialisation;
          break;
        } else {
          this.selectedExpertise = null;
        }
      }
    },
    getExpertiseByIndustry(industry) {
      // filter expertise based on industry
      this.filteredExpertise = this.expertise.expertise.filter((skill) => {
        if (skill.category === industry) {
          return skill;
        }
      });

      // default value for expertise
      for (let skill of this.expertise.expertise) {
        if (skill.category === this.selectedIndustry) {
          this.selectedExpertise = skill.specialisation;
          break;
        } else {
          this.selectedExpertise = null;
        }
      }
      this.fetchAllProviders({ industry: this.selectedIndustry, type: 'dashboard' });
    },
    showMore() {
      if (!this.limit) {
        VoerroModal.show('providers-modal');
      }
      this.limit = false;
    },
    askProvider() {
      VoerroModal.show('ask-provider-modal');
    },
    showSome(textString) {
      if (textString.length > 100) {
        return textString.substring(0, 100) + '...';
      } else {
        return textString;
      }
    },
  },
};
</script>
<style>
.baits-input .vs__dropdown-toggle {
  border: none !important;
  border-radius: 0px !important;
}
</style>
