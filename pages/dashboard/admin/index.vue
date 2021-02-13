<template>
  <div class="w-full">
    <Header />
    <!-- strat content -->
    <div class="bg-gray-100 flex-1 p-6 md:mt-6">
      <!-- Status Block -->
      <StatusBlock />
      <!-- End Status Block -->

      <!-- strat Analytics -->
      <Analytics />
      <!-- end Analytics -->

      <!-- Sales Block -->
      <SalesBlock />
      <!-- End Sales Block -->

      <!-- Updates Block -->
      <UpdatesBlock />
      <!-- End Updates Block -->

      <!-- Updates Block -->
      <SocialLinks />
      <!-- End Updates Block -->
    </div>
    <!-- end content -->
  </div>
</template>
<script>
import Header from '@/components/dashboard/Header';
import StatusBlock from '@/components/dashboard/home/StatusBlock';
import SalesBlock from '@/components/dashboard/home/SalesBlock';
import UpdatesBlock from '@/components/dashboard/home/UpdatesBlock';
import SocialLinks from '@/components/dashboard/home/SocialLinks';
import Analytics from '@/components/dashboard/home/Analytics';

export default {
  layout: 'dashboard',
  components: {
    Header,
    StatusBlock,
    SalesBlock,
    UpdatesBlock,
    SocialLinks,
    Analytics,
  },
};
</script>
