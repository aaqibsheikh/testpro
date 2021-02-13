<template>
  <div>
    <div class="hidden sm:block">
      <div class="arrow-steps clearfix grid grid-cols-4 capitalize">
        <div
          class="step"
          :class="[
            $route.path === `/dashboard/baits/${$route.params.id}/details`
              ? 'current'
              : '',
          ]"
          @click="$router.push(`/dashboard/baits/${$route.params.id}/details`)"
        >
          <span>Bait Details</span>
        </div>
        <div
          class="step"
          :class="[
            $route.path === `/dashboard/baits/${$route.params.id}/pending`
              ? 'current'
              : '',
          ]"
          @click="$router.push(`/dashboard/baits/${$route.params.id}/pending`)"
        >
          <span>Pending ({{ baits.pendingTab }})</span>
        </div>
        <div
          class="step"
          :class="[
            $route.path === `/dashboard/baits/${$route.params.id}/open`
              ? 'current'
              : '',
          ]"
          @click="$router.push(`/dashboard/baits/${$route.params.id}/open`)"
        >
          <span>Open ({{ baits.openTab }})</span>
        </div>
        <div
          class="step"
          :class="[
            $route.path === `/dashboard/baits/${$route.params.id}/closed`
              ? 'current'
              : '',
          ]"
          @click="$router.push(`/dashboard/baits/${$route.params.id}/closed`)"
        >
          <span>Closed ({{ baits.closedTab }})</span>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-4 text-center border border-gray-300 sm:text-sm text-xs block sm:hidden"
    >
      <div
        class="border-r py-2 cursor-pointer"
        :class="[
          $route.path === `/dashboard/baits/${$route.params.id}/details`
            ? 'bg-baits-blue text-white'
            : '',
        ]"
        @click="$router.push(`/dashboard/baits/${$route.params.id}/details`)"
      >
        Details
      </div>
      <div
        class="border-r py-2 cursor-pointer"
        :class="[
          $route.path === `/dashboard/baits/${$route.params.id}/pending`
            ? 'bg-baits-blue text-white'
            : '',
        ]"
        @click="$router.push(`/dashboard/baits/${$route.params.id}/pending`)"
      >
        Pending ({{ baits.pendingTab }})
      </div>
      <div
        class="border-r py-2 cursor-pointer"
        :class="[
          $route.path === `/dashboard/baits/${$route.params.id}/open`
            ? 'bg-baits-blue text-white'
            : '',
        ]"
        @click="$router.push(`/dashboard/baits/${$route.params.id}/open`)"
      >
        Open ({{ baits.openTab }})
      </div>
      <div
        class="py-2 cursor-pointer"
        :class="[
          $route.path === `/dashboard/baits/${$route.params.id}/closed`
            ? 'bg-baits-blue text-white'
            : '',
        ]"
        @click="$router.push(`/dashboard/baits/${$route.params.id}/closed`)"
      >
        Closed ({{ baits.closedTab }})
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      baits: 'baits/isBaitsStepper',
    }),
  },
};
</script>
<style>
.clearfix:after {
  clear: both;
  content: '';
  display: block;
  height: 0;
}

/* Responsive Arrow Progress Bar */

.container {
  font-family: 'Lato', sans-serif;
}

.arrow-steps .step {
  font-size: 14px;
  text-align: center;
  color: #777;
  cursor: default;
  margin: 0 1px 0 0;
  padding: 10px 0px 10px 0px;
  cursor: pointer;
  float: left;
  position: relative;
  background-color: #ddd;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.arrow-steps .step a {
  color: #777;
  text-decoration: none;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
  content: '';
  position: absolute;
  top: 0;
  right: -19px;
  width: 0;
  height: 0;
  border-top: 21px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #ddd;
  z-index: 2;
}

.arrow-steps .step:before {
  right: auto;
  left: 0;
  border-left: 20px solid #fff;
  z-index: 0;
}

.arrow-steps .step:first-child:before {
  border: none;
}

.arrow-steps .step:last-child:after {
  /* border: none; */
}

.arrow-steps .step:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.arrow-steps .step:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.arrow-steps .step span {
  position: relative;
}

*.arrow-steps .step.done span:before {
  opacity: 1;
  content: '';
  position: absolute;
  top: -2px;
  left: -10px;
  font-size: 11px;
  line-height: 21px;
}

.arrow-steps .step.current {
  color: #fff;
  background-color: #0070c0;
}

.arrow-steps .step.current a {
  color: #fff;
  text-decoration: none;
}

.arrow-steps .step.current:after {
  border-left: 20px solid #0070c0;
}

.arrow-steps .step.done {
  color: #173352;
  background-color: #2f69aa;
}

.arrow-steps .step.done a {
  color: #173352;
  text-decoration: none;
}

.arrow-steps .step.done:after {
  border-left: 20px solid #2f69aa;
}
</style>
