<template>
  <!-- blog-detail-modal -->
  <modal id="blog-detail-modal" v-cloak class="blog-detail-modal">
    <div slot="body" class="text-center px-6 py-6">
      <div class="flex flex-wrap">
        <div class="w-full pb-4 relative">
          <h2 class="text-baits-blue font-bold text-2xl px-5">
            {{ detail.title }}
          </h2>
          <div class="flex flex-wrap my-3 px-5">
            <div
              class="w-full text-md text-gray-700"
              v-html="detail.description"
            ></div>
          </div>
          <div class="flex flex-wrap text-left">
            <div class="w-full">
              <span class="text-sm text-gray-900">Category:</span>
              <span class="text-sm">{{ detail.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: ['detail'],
};
</script>
<style>
.blog-detail-modal > .modal-box {
  max-width: 50%;
}
</style>