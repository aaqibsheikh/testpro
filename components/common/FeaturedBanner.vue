<template>
  <div class="flex w-full justify-between bg-white py-10">
    <img
      v-for="path in imgs"
      :key="path.id"
      src="~/static/images/dummy1.png"
    >
  </div>
</template>

<script>
export default {
  name: 'FeaturedBanner',
  data: () => {
    return {
      imgs: [1,2,3]
    }
  }
}
</script>
<style lang="scss" scoped>
  img {
    height: 7rem;
  }
</style>
