<template>
  <div
    class="w-full lg:w-1/2 px-6 lg:pb-0 pb-4 lg:order-first order-last lg:shadow-none shadow-md lg:mx-0 mx-4"
  >
    <h2 class="md:text-4xl text-3xl font-bold text-gray-800 text-left mt-10">
      With baitsbite you
    </h2>
    <ul class="text-xl">
      <li class="my-6 pl-10">
        <font-awesome-icon
          class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
          :icon="['fas', 'check']"
        />Connect with professional experts to provide dedicated solutions to
        your financial and property problems.
      </li>
      <li class="my-6 pl-10">
        <font-awesome-icon
          class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
          :icon="['fas', 'check']"
        />Minimize fraud risk as documents are send and access directly by the
        professionals.
      </li>
      <li class="my-6 pl-10">
        <font-awesome-icon
          class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
          :icon="['fas', 'check']"
        />Minimize fraud risk as documents are send and access directly by the
        professionals.
      </li>
    </ul>
    <p class="py-4 text-xl">
      For more information please visit our
      <nuxt-link
        :to="{ path: '/how-it-works', hash: '#faq' }"
        class="text-blue-500"
        >FAQ</nuxt-link
      >.
    </p>
    <p class="text-xl">
      Already registered?
      <a
        href="javascript:void(0)"
        @click="onToggleTab('login')"
        class="text-blue-500"
        >Log in here</a
      >.
    </p>
  </div>
</template>
<script>
export default {
  methods: {
    onToggleTab(tab) {
      this.$emit('onToggleTab', tab);
    },
  },
};
</script>
