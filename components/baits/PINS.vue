<template>
  <div class="grid grid-cols-12">
    <div class="lg:col-span-9 col-span-12 border border-gray-400">
      <div class="grid sm:grid-cols-2 grid-cols-1 px-10 py-2 lg:py-4">
        <div class="font-bold sm:text-xl text-lg">
          {{ data.title || data.product }}
        </div>
        <div class="sm:text-right text-left">
          <span class="font-bold">Casted On:</span>
          <span>{{ formatDateMonthYearHandler(data.castOn) }}</span>
        </div>
      </div>
      <div
        class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-10 py-4 lg:py-8 gap-x-4 gap-y-4"
      >
        <div class="sm:col-span-2 lg:col-span-3">
          <span class="font-bold">Bait ID</span>
          <br />
          <span class="text-baits-blue font-bold">{{ data.ticketId }}</span>
        </div>
        <div>
          <span class="font-bold">Bait Type</span>
          <br />
          <span>{{ data.pins.type }}</span>
        </div>
        <div>
          <span class="font-bold">Category</span>
          <br />
          <span>{{ data.pins.category }}</span>
        </div>
        <div>
          <span class="font-bold">Customer Requirement:</span>
          <br />
          <div class="mt-4">
            <div
              v-for="(selection, index) in data.pins.customerSelection"
              :key="index"
            >
              {{ selection }}
            </div>
          </div>
        </div>
        <div>
          <span class="font-bold">Budget</span>
          <br />
          <span>{{ data.pins.customerBudget }}</span>
        </div>
        <div>
          <span class="font-bold">Total Sum Assured</span>
          <br />
          <span
            >${{ numberWithCommasHandler(data.pins.customerSumAssured) }}</span
          >
        </div>
        <!-- <div>
          <span class="font-bold">Tenancy</span>
          <br />
          <span >{{ data.pins.propertyTenancy }}</span>
        </div>-->
        <div class="sm:col-span-2">
          <div class="font-bold">Remarks</div>
          <div>{{ data.pins.remarks }}</div>
        </div>
        <div>
          <span class="font-bold">Activity on this bait</span>
          <br />
          <span>{{ findDaysAgoHandler(data.castOn) }}</span>
        </div>
        <div
          v-if="data.pendingTab || data.openTab || data.closedTab"
          class="sm:col-span-2 lg:col-span-3"
        >
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
    <div
      class="lg:col-span-3 col-span-12 px-10 sm:py-0 py-2 lg:py-4 border border-gray-400"
    >
      <div class="pb-4">
        <div>
          <p class="text-black font-bold">About the customer</p>
        </div>
        <div class="py-2 lg:py-4">
          <span class="font-bold">Income</span>
          <br />
          <span>
            {{ data.pins.customerEmploymentIncome }}
          </span>
        </div>
        <div class="py-2 lg:py-4">
          <span class="font-bold">Gender</span>
          <br />
          <span>{{ data.pins.customerGender }}</span>
        </div>
        <div class="py-2 lg:py-4">
          <span class="font-bold">Profile</span>
          <br />
          <span>{{ data.pins.customerProfile }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  formatDateMonthYear,
  findDaysAgo,
  numberWithCommas,
} from '@/services/index';
export default {
  props: ['data'],
  methods: {
    formatDateMonthYearHandler(date) {
      return formatDateMonthYear(date);
    },
    findDaysAgoHandler(date) {
      return findDaysAgo(date);
    },
    numberWithCommasHandler(x) {
      return numberWithCommas(x);
    },
  },
};
</script>
