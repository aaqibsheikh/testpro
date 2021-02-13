<template>
  <div>
    <div
      class="flex flex-wrap fixed p-3 text-white cookie-wrapper justify-between items-center w-full"
    >
      <div style="width: Calc(100% - 155px)">
        This website uses cookies to ensure you get the best experience on our
        website.
        <nuxt-link class="underline" to="/terms">Learn More</nuxt-link>
      </div>
      <div class="inline-block cursor-pointer">
        <div class="cookie-btn rounded-lg" @click="acceptCookie()">
          Accept Cookies
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    acceptCookie() {
      localStorage.setItem('user-cookie', true);
      this.$emit('setCookie');
    },
  },
};
</script>
<style>
.cookie-wrapper {
  bottom: 0px;
  background-color: rgba(16, 16, 16, 0.86);
  font-size: 15px;
  z-index: 999999 !important;
}
.cookie-btn {
  background-color: #333;
  padding: 9px 20px;
  font-size: 14px;
  border: 1px solid #ddd;
  display: inline-block;
}
</style>
