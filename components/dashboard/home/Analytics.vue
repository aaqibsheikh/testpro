<template>
  <div>
    <div class="flex flex-wrap -mx-2">
      <div class="xl:w-9/12 w-full px-2">
        <div class="rounded-md boxShadow mb-8 bg-white">
          <div class="flex flex-wrap items-center justify-between pt-6 px-5">
            <div class="text-sm" style="color: #505458">Sales Analytics</div>
            <div class="">
              <div class="flex flex-wrap items-center-right">
                <div>
                  <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'compress-arrows-alt']" />
                </div>
                <div>
                  <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'window-minimize']" />
                </div>
                <div>
                  <font-awesome-icon class="cursor-pointer pr-2 text-simple-c-dark w-5 h-5" :icon="['fas', 'trash-alt']" />
                </div>
              </div>
            </div>
          </div>
          <div class="text-sm mt-1 block pb-6 px-5 text-simple-c-dark">
            For more details about usage, please refer
            <a href="https://www.amcharts.com/online-store/" target="_blank">amCharts</a>
            licences.
          </div>
          <div class="px-5 linechartbox">
            <line-chart></line-chart>
          </div>
        </div>
      </div>
      <div class="xl:w-3/12 w-full px-2">
        <div class="rounded-md boxShadow mb-8 bg-white user-card2">
          <div class="p-5 text-center">
            <h6 class="mb-4 text-sm">Project Risk</h6>
            <div class="risk-rate">
              <span><b>5</b></span>
            </div>
            <h6 class="my-2 text-xs">Balanced</h6>
            <a href="#!" class="text-c-yellow b-b-warning">Change Your Risk</a>
            <div class="flex flex-wrap justify-center mt-3 border-t-2 ml-0 mr-0">
              <div class="w-1/2 mt-3 border-r-2">
                <h6 class="text-xs text-simple-c-dark">Nr</h6>
                <h6 class="text-sm">AWS 2455</h6>
              </div>
              <div class="w-1/2 mt-3">
                <h6 class="text-xs text-simple-c-dark">Created</h6>
                <h6 class="text-sm">30th Sep</h6>
              </div>
            </div>
          </div>
          <button class="c-btn download-button w-full py-4 py-4">Download Overall Report</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/charts/LineChart';

export default {
  components: {
    LineChart,
  },
};
</script>
<style></style>
