<template>
  <div>
    <client-only>
      <swiper :ref="reference" class="swiper" :options="options">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :style="styleObj" :src="image" :class="classes" />
        </swiper-slide>
        <div v-if="images.length > 1" :id="`bulltets-baitsbite${index}`" class="swiper-pagination" slot="pagination"></div>
        <div v-if="images.length > 1" :id="`button-prev-baitsbite${index}`" class="swiper-button-prev" slot="button-prev"></div>
        <div v-if="images.length > 1" :id="`button-next-baitsbite${index}`" class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </client-only>
  </div>
</template>
<script>
export default {
  props: ['images', 'options', 'reference', 'styleObj', 'classes', 'index'],
  data() {
    return {};
  },
};
</script>