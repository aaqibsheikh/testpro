<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 border border-gray-400">
      <div
        class="grid sm:grid-cols-2 grid-cols-1 px-10 pt-4 lg:pt-8 pb-2 lg:pt-4"
      >
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
      <div class="px-10">
        <div
          class="inline-block"
          v-for="(location, index) in data.proc.propertyLocation"
          v-bind:key="location"
        >
          {{ location
          }}{{ data.proc.propertyLocation.length - 1 === index ? '' : ',' }}
          &nbsp;
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
          <span>{{ data.proc.type }}</span>
        </div>
        <div>
          <span class="font-bold">Property Type</span>
          <br />
          <span>{{ data.proc.propertyType }}</span>
        </div>
        <div>
          <span class="font-bold">Number of Rooms</span>
          <br />
          <span>{{ data.proc.propertyRoom }}</span>
        </div>
        <div>
          <span class="font-bold">Property size (sq ft)</span>
          <br />
          <span>
            {{ numberWithCommasHandler(data.proc.propertySize) }}
          </span>
        </div>
        <div>
          <span class="font-bold">Estimated Price</span>
          <br />
          <span>${{ numberWithCommasHandler(data.proc.price) }}</span>
        </div>
        <div>
          <span class="font-bold">Category</span>
          <br />
          <span>{{ data.proc.category }}</span>
        </div>
        <div>
          <span class="font-bold">Preferred Date</span>
          <br />
          <span>{{ data.proc.datePreferredBy }}</span>
        </div>
        <div>
          <span class="font-bold">Tenancy</span>
          <br />
          <span>{{ data.proc.propertyTenancy }}</span>
        </div>
        <div class="sm:col-span-2">
          <div class="font-bold">Remarks</div>
          <div>{{ data.proc.remarks }}</div>
        </div>
        <div>
          <span class="font-bold">Activity on this bait</span>
          <br />
          <span>
            {{ findDaysAgoHandler(data.castOn) }}
          </span>
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
