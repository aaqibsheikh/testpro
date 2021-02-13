<template>
  <div>
    <div>
      <div class="flex flex-wrap -mx-3 md:mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Gender
          </label>
          <input
            readonly
            v-model="baitProfile.gender"
            name="dateOfBirth"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
        <!--  -->
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Date of Birth
          </label>
          <input
            readonly
            v-model="dateOfBirth"
            name="dateOfBirth"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nationality
          </label>
          <input
            readonly
            v-model="baitProfile.nationality"
            name="companyName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Residing Country
          </label>
          <input
            readonly
            v-model="baitProfile.country"
            name="companyName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Industry
          </label>
          <input
            readonly
            v-model="baitProfile.industry"
            name="companyName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Company Name
          </label>
          <input
            readonly
            v-model="baitProfile.companyName"
            name="companyName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Designation
          </label>
          <input
            readonly
            v-model="baitProfile.designation"
            name="designation"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Date of Establishment (For employer)
          </label>
          <input
            readonly
            v-model="companyDateEstablishment"
            name="dateOfBirth"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <!--  -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Date of Employment (For employee)
          </label>
          <input
            readonly
            v-model="dateOfEmployment"
            name="dateOfBirth"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0"></div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: ['baitProfile'],
  computed: {
    dateOfBirth() {
      return moment.unix(this.baitProfile.dateOfBirth).format('YYYY-MM-DD');
    },
    companyDateEstablishment() {
      return moment.unix(this.baitProfile.companyDateEstablishment).format('YYYY-MM-DD');
    },
    dateOfEmployment() {
      return moment.unix(this.baitProfile.dateOfEmployment).format('YYYY-MM-DD');
    },
  },
};
</script>
