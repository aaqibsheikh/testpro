<template>
  <div class="w-full px-6 md:px-12 m-auto sm:mt-8 mt-32 md:mt-16">
    <div class="grid grid-cols-1">
      <div class="text-baits-blue font-bold text-lg">My Bites</div>
    </div>
    <div class="grid grid-cols-1 text-center mt-6 md:block hidden">
      <div
        class="cursor-pointer border border-gray-400 shadow-md py-16"
        @click="$router.push('/dashboard/bites/pool')"
      >
        <div>
          <img src="~/static/images/pool.png" class="inline-block" width="50" height="50" />
        </div>
        <div class="mt-5 text-baits-gray-dark font-bold">Baits Pool</div>
        <div class="text-baits-blue font-bold">({{ bite.pool }})</div>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 text-center mt-6 gap-4">
      <!-- This block is just for mobile screen -->
      <div
        class="block md:hidden cursor-pointer border border-gray-400 shadow-md py-16"
        @click="$router.push('/dashboard/bites/pool')"
      >
        <div>
          <img src="~/static/images/pool.png" class="inline-block" width="50" height="50" />
        </div>
        <div class="mt-5 text-baits-gray-dark font-bold">Baits Pool</div>
        <div class="text-baits-blue font-bold">({{ bite.pool }})</div>
      </div>
      <!----------------------------------------------------------------------------------------------------------------------->
      <div
        class="cursor-pointer border border-gray-400 shadow-md py-16"
        @click="$router.push('/dashboard/bites/pending')"
      >
        <div>
          <img src="~/static/images/pending.png" class="inline-block" width="50" height="50" />
        </div>
        <div class="mt-5 text-baits-gray-dark font-bold">Pending Bites</div>
        <div class="text-baits-blue font-bold">({{ bite.pending }})</div>
      </div>
      <div
        class="cursor-pointer border border-gray-400 shadow-md py-16"
        @click="$router.push('/dashboard/bites/open')"
      >
        <div>
          <img src="~/static/images/open.png" class="inline-block" width="50" height="50" />
        </div>
        <div class="mt-5 text-baits-gray-dark font-bold">Open Bites</div>
        <div class="text-baits-blue font-bold">({{ bite.open }})</div>
      </div>
      <div
        class="cursor-pointer border border-gray-400 shadow-md py-16"
        @click="$router.push('/dashboard/bites/closed')"
      >
        <div>
          <img src="~/static/images/closed.png" class="inline-block" width="50" height="50" />
        </div>
        <div class="mt-5 text-baits-gray-dark font-bold">Closed Bites</div>
        <div class="text-baits-blue font-bold">({{ bite.closed }})</div>
      </div>
    </div>
    <div class="grid grid-rows-1 md:grid-rows-2 md:grid-flow-col grid-flow-row mt-6 gap-4">
      <div class="row-span-1 cursor-pointer border border-gray-400 shadow-md py-8 text-center">
        <div class="text-baits-gray-dark font-bold">Service Rating</div>
        <div class="text-center">
          <star-rating
            :increment="0.5"
            :read-only="true"
            :star-size="20"
            :show-rating="false"
            v-model="bite.rating"
          ></star-rating>
        </div>
        <div class="text-baits-blue font-bold mt-2">{{ bite.rating }}/5</div>
      </div>
      <div class="row-span-1 cursor-pointer border border-gray-400 shadow-md py-8 text-center">
        <div class="text-baits-gray-dark font-bold">No. of Baitsbite achieved till date</div>
        <div class="text-baits-blue font-bold">{{ bite.baitsbiteTotal }}</div>
      </div>
      <div
        class="row-span-1 md:row-span-2 cursor-pointer border border-gray-400 shadow-md py-8 px-10"
      >
        <div class="text-baits-gray-dark font-bold">Top expertise match</div>
        <ul class="mt-6">
          <li class="py-2" v-for="(item, key) in bite.expertise" :key="key">
            <span class="text-baits-gray-dark">{{ item.expertise }}</span>
            <span class="float-right text-baits-blue font-bold">
              {{
              item.count
              }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  async fetch({ app, params, store }) {
    await store.dispatch('bite/getBitesDashboard');
  },
  computed: {
    ...mapGetters({
      bite: 'bite/getBitesDashboard',
    }),
  },
};
</script>
<style>
.vue-star-rating {
  display: block !important;
}
</style>
