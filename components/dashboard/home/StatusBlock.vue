<template>
  <div>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
      <div class="py-3 text-white rounded-md bg-c-yellow">
        <div class="px-5">
          <p class="text-md text-2xl">$30200</p>
          <div class="flex flex-wrap items-center">
            <div class="text-sm w-3/5">All Earnings</div>
            <div class="w-2/5 pl-6">
              <bar-chart></bar-chart>
            </div>
          </div>
        </div>
        <div class="border border-white my-2"></div>
        <div class="px-5 flex flex-wrap items-center">
          <span>
            <font-awesome-icon class="mr-1 w-3.5 h-3.5 text-white" :icon="['fas', 'clock']" />
          </span>
          <span class="text-sm">update: 2:15am</span>
        </div>
      </div>
      <div class="py-3 text-white rounded-md bg-c-green">
        <div class="px-5">
          <p class="text-md text-2xl">290+</p>
          <div class="flex flex-wrap items-center">
            <div class="text-sm w-3/5">Page Views</div>
            <div class="w-2/5 pl-6">
              <bar-chart></bar-chart>
            </div>
          </div>
        </div>
        <div class="border border-white my-2"></div>
        <div class="px-5 flex flex-wrap items-center">
          <span>
            <font-awesome-icon class="mr-1 w-3.5 h-3.5 text-white" :icon="['fas', 'clock']" />
          </span>
          <span class="text-sm">update: 2:15am</span>
        </div>
      </div>
      <div class="py-3 text-white rounded-md bg-c-pink">
        <div class="px-5">
          <p class="text-md text-2xl">145</p>
          <div class="flex flex-wrap items-center">
            <div class="text-sm w-3/5">Task Completed</div>
            <div class="w-2/5 pl-6">
              <bar-chart></bar-chart>
            </div>
          </div>
        </div>
        <div class="border border-white my-2"></div>
        <div class="px-5 flex flex-wrap items-center">
          <span>
            <font-awesome-icon class="mr-1 w-3.5 h-3.5 text-white" :icon="['fas', 'clock']" />
          </span>
          <span class="text-sm">update: 2:15am</span>
        </div>
      </div>
      <div class="py-3 text-white rounded-md bg-c-lite-green">
        <div class="px-5">
          <p class="text-md text-2xl">500</p>
          <div class="flex flex-wrap items-center">
            <div class="text-sm w-3/5">Downloads</div>
            <div class="w-2/5 pl-6">
              <bar-chart></bar-chart>
            </div>
          </div>
        </div>
        <div class="border border-white my-2"></div>
        <div class="px-5 flex flex-wrap items-center">
          <span>
            <font-awesome-icon class="mr-1 w-3.5 h-3.5 text-white" :icon="['fas', 'clock']" />
          </span>
          <span class="text-sm">update: 2:15am</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from '@/components/charts/BarChart';
export default {
  components: {
    BarChart,
  },
};
</script>
<style>
.bg-c-lite-green {
  background: -webkit-gradient(linear, left top, right top, from(#01a9ac), to(#01dbdf));
  background: linear-gradient(to right, #01a9ac, #01dbdf);
}
.bg-c-pink {
  background: -webkit-gradient(linear, left top, right top, from(#fe5d70), to(#fe909d));
  background: linear-gradient(to right, #fe5d70, #fe909d);
}
.bg-c-green {
  background: -webkit-gradient(linear, left top, right top, from(#0ac282), to(#0df3a3));
  background: linear-gradient(to right, #0ac282, #0df3a3);
}
.bg-c-yellow {
  background: -webkit-gradient(linear, left top, right top, from(#fe9365), to(#feb798));
  background: linear-gradient(to right, #fe9365, #feb798);
}

#bar-chart {
  /* display: inline-block !important; */
  /* width: 70px !important; */
  height: 30px !important;
}
</style>
