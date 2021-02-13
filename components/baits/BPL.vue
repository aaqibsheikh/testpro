<template>
  <div class="grid grid-cols-12">
    <div class="lg:col-span-9 col-span-12 border border-gray-400">
      <div class="grid sm:grid-cols-2 grid-cols-1 px-10 py-4 lg:py-8">
        <div class="font-bold sm:text-xl text-lg">
          {{ data.product }}
        </div>
        <div class="sm:text-right text-left">
          <span class="font-bold">Casted On:</span>
          <span>
            {{ formatDateMonthYearHandler(data.castOn) }}
          </span>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-10 py-4 lg:py-8 gap-x-4 gap-y-4">
        <div class="sm:col-span-2 lg:col-span-3">
          <span class="font-bold">Bait ID</span>
          <br />
          <span class="text-baits-blue font-bold">{{ data.ticketId }}</span>
        </div>
        <div>
          <span class="font-bold">Bait Type</span>
          <br />
          <span>{{ data.bpl.type }}</span>
        </div>
        <!-- <div class="lg:block hidden"></div> -->
        <div>
          <span class="font-bold">Category</span>
          <br />
          <span>{{ data.bpl.category }}</span>
        </div>
        <div>
          <span class="font-bold">Product</span>
          <br />
          <span>{{ data.bpl.product }}</span>
        </div>
        <div>
          <span class="font-bold">Property Type</span>
          <br />
          <span>{{ data.bpl.propertyType }}</span>
        </div>
        <div>
          <span class="font-bold">Amount Required</span>
          <br />
          <span>${{ numberWithCommasHandler(data.bpl.loanAmount) }}</span>
        </div>
        <div>
          <span class="font-bold">Repayment Period</span>
          <br />
          <span>{{ data.bpl.loanPeriod }}</span>
        </div>
        <div class="sm:col-span-2">
          <div class="font-bold">Remarks</div>
          <div>{{ data.bpl.remarks }}</div>
        </div>
        <div>
          <span class="font-bold">Activity on this bait</span>
          <br />
          <span>
            {{ findDaysAgoHandler(data.castOn) }}
          </span>
        </div>
        <div v-if="data.pendingTab || data.openTab || data.closedTab" class="sm:col-span-2 lg:col-span-3">
          <span class="font-bold">Pending Users: </span>
          <span>{{ data.pendingUsers || 'None' }}</span>
          <br />
          <span class="font-bold">Open Users: </span>
          <span>{{ data.openUsers || 'None' }}</span>
          <br />
          <span class="font-bold">Closed Users: </span>
          <span>{{ data.closedUsers || 'None' }}</span>
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 col-span-12 px-10 sm:py-0 py-4 lg:py-8 border border-gray-400">
      <div class="grid grid-rows-5 grid-flow-col">
        <div class="flex items-center">
          <div class="hidden">
            <font-awesome-icon class="text-black pr-2 w-7 h-7" :icon="['fas', 'eye']" />
          </div>
          <p class="inline-block text-black font-bold">About the customer</p>
        </div>
        <div class="pb-4">
          <span class="font-bold">Nationality:</span>
          <br />
          <span>{{ data.bpl.customerNationality }}</span>
        </div>
        <!-- <div class="pb-4">
          <span class="font-bold">Home ownership:</span>
          <br />
          <span>
            {{ data.bpl.customerResidenceStatus }}
          </span>
        </div> -->
        <div class="pb-4">
          <span class="font-bold">Employment Status:</span>
          <br />
          <span>
            {{ data.bpl.customerEmploymentStatus }}
          </span>
        </div>
        <div class="pb-4">
          <span class="font-bold">Years in Current Employment:</span>
          <br />
          <span>
            {{ findDaysAgoHandler(data.bpl.customerEmploymentDate) }}
          </span>
        </div>
        <!-- <div class="pb-4">
          <span class="font-bold">Employment Income:</span>
          <br />
          <span>
            {{ data.bpl.customerEmploymentIncome }}
          </span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { formatDateMonthYear, findDaysAgo, numberWithCommas } from '@/services/index';
export default {
  props: ['data'],
  methods: {
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },
    findDaysAgoHandler(date) {
      return findDaysAgo(date);
    },
    numberWithCommasHandler(amount) {
      return numberWithCommas(amount);
    },
  },
};
</script>
