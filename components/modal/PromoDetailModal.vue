<template>
  <!-- promo-detail-modal -->
  <modal id="promo-detail-modal" v-cloak class="promo-detail-modal">
    <div slot="body" class="text-center px-6 py-6">
      <div class="flex flex-wrap">
        <div class="w-full pb-4 relative">
          <h2 class="text-baits-blue font-bold text-2xl px-5">
            {{ detail.title }}
          </h2>
          <div class="flex flex-wrap my-3 px-5">
            <div class="w-full text-md text-gray-700">
              {{ detail.description }}
            </div>
          </div>
          <div class="flex flex-wrap bg-white mt-3 mb-8">
            <div class="w-full">
              <div
                v-for="(image, key) in detail.images"
                :key="key"
                class="relative m-5 text-center"
              >
                <img ref="image" class="pb-2 inline-block" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap text-left">
            <div class="w-full">
              <span class="text-sm text-gray-900">Start Date:</span>
              <span class="text-sm">{{ detail.promoStartDate }}</span>
            </div>
            <div class="w-full">
              <span class="text-sm text-gray-900">End Date:</span>
              <span class="text-sm">{{ detail.promoStartDate }}</span>
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
  mounted() {
    for (let i = 0; i < this.detail.images.length; i++) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.image[i].src = reader.result;
      };
      reader.readAsDataURL(this.detail.images[i]);
    }
  },
};
</script>
<style>
.promo-detail-modal > .modal-box {
  max-width: 50%;
}
</style>