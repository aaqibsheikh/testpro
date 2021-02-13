<template>
  <div>
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Service Categories</label>
        <input
          readonly
          v-model="biteProfile.industry"
          name="industry"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Bank/Institution/Agency</label>
        <input
          readonly
          v-model="biteProfile.companyName"
          name="companyName"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Designation</label>
        <input
          readonly
          v-model="biteProfile.designation"
          name="designation"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Work Email</label>
        <input
          readonly
          v-model="biteProfile.workEmail"
          name="workEmail"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
    </div>
    <!--  -->
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">CEA No</label>
        <input
          readonly
          v-model="biteProfile.ceaNumber"
          name="ceaNumber"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Date Joined</label>
        <input
          readonly
          v-model="dateJoin"
          name="dateJoin"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
    </div>
    <!--  -->
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Office Location</label>
        <input
          readonly
          v-model="biteProfile.country"
          name="country"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if="biteProfile.documents.length > 0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Name Card (Front & Back)</label>
        <div v-if="biteProfile.documents.length > 0">
          <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file, index) in biteProfile.documents" :key="index">
            <div class="text-lg text-baits-blue font-bold" @click="downloadDocument(file)">{{ file.fileName }}</div>
          </div>
          <!-- <div class="flex mt-2 border-b pb-1 cursor-pointer" v-for="(file,index) in biteProfile.documents" :key="index">
            <div class="text-lg text-baits-blue font-bold">{{file.fileName}}</div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Short Introduction</label>
        <textarea
          readonly
          v-model="biteProfile.descIntro"
          name="descIntro"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >{{ biteProfile.descIntro }}</textarea
        >
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Expertise</label>
        <template v-for="skill in biteProfile.expertise">
          <div class="py-2 px-4 mr-2 text-gray-700 rounded bg-gray-200 focus:outline-none inline-block">{{ skill }}</div>
        </template>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 md:mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">Awards/ Accreditations / Achievements</label>
        <textarea
          readonly
          v-model="biteProfile.descAwards"
          name="descAwards"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >{{ biteProfile.descAwards }}</textarea
        >
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapMutations } from 'vuex';

export default {
  props: ['biteProfile'],
  computed: {
    dateJoin() {
      return moment.unix(this.biteProfile.dateJoin).format('YYYY-MM-DD');
    },
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    downloadDocument(fileObj) {
      var url = fileObj.path;
      var fileName = url.split('/').pop();
      var api = `/user/profile/bite/document/${fileName}`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }

      this.$axios
        .get(api, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileObj.fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          this.setLoader(false);
          console.log(error);
        });
    },
  },
};
</script>
