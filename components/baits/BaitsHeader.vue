<template>
  <div>
    <div class="grid grid-cols-2">
      <div class="text-lg col-span-12 sm:col-span-1 sm:mb-0 mb-3">
        <span
          class="text-gray-700 cursor-pointer"
          @click="$router.push('/dashboard/baits')"
        >My Baits</span>
        <span class="text-gray-700 px-1">/</span>
        <span class="font-bold text-baits-blue">{{text}}</span>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:mt-10 mt-5 mb-2" v-if="status !== 'Draft'">
      <BaitsStepper />
    </div>
  </div>
</template>
<script>
import BaitsStepper from '@/components/common/widgets/BaitsStepper';

export default {
  props: {
    status: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
  },
  components: {
    BaitsStepper,
  },
};
</script>
