<template>
  <footer class="mt-8">
    <div class="container m-auto">
      <div class="flex flex-wrap justify-center py-6 sm:py-20">
        <div class="md:w-24 w-full ml-8 md:ml-0 md:mr-12">
          <div class="flex justify-center">
            <img src="~/static/images/logo-white.png" class="inline-block h-28 w-32 md:block hidden" />
            <img src="~/static/images/logo.png" class="inline-block h-12 md:hidden block" />
          </div>

          <div class="social flex justify-center text-white">
            <a href="https://www.facebook.com/baitsbite/" target="_blank">
              <font-awesome-icon class="mr-2 w-6 h-6" :icon="['fab', 'facebook-f']" />
            </a>
            <a href="https://www.instagram.com/baitsbite/" target="_blank">
              <font-awesome-icon class="mr-2 w-6 h-6" :icon="['fab', 'instagram']" />
            </a>
            <a href="https://www.linkedin.com/company/baitsbite" target="_blank">
              <font-awesome-icon class="mr-2 w-6 h-6" :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>
        <!-- <div class="md:w-1/4 w-full md:ml-0 ml-8 md:mt-0 mt-12 md:mb-0 mb-4">
          <h2 class="lg:text-4xl text-2xl text-baits-green mb-1 font-bold">Quicklinks</h2>
          <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Baits Listing</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Increase Savings</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Grow Wealth</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Build Assets</nuxt-link>
        </div> -->
        <!-- <div class="md:w-1/5 w-full md:ml-0 ml-8 md:mt-0 mt-12 md:mb-0 mb-4">
          <h2 class="lg:text-4xl text-2xl text-baits-green mb-1 font-bold">Services</h2>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">Temporary Bridging Loan</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">SME Working Capital</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">Sell Property</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">Residential Property Financing</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">Endowment</nuxt-link>
          <nuxt-link to class="block text-white py-2 lg:text-xl hover:underline text-lg">Investment</nuxt-link>
        </div> -->
        <div class="md:w-1/4 w-full md:ml-0 ml-8 md:mt-0 mt-4 md:mb-0 mb-12 text-white">
          <h2 class="text-2xl text-baits-green mb-1 font-bold">Company</h2>
          <nuxt-link to="/how-it-works" class="block py-2 lg:text-xl text-lg">How it works</nuxt-link>
          <nuxt-link to="/how-it-works#faq" class="block py-2 lg:text-xl text-lg">FAQ</nuxt-link>
          <nuxt-link to="about-us" class="block py-2 lg:text-xl text-lg">About us</nuxt-link>
          <!-- <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Careers</nuxt-link> -->
          <nuxt-link to="/contact" class="block py-2 lg:text-xl text-lg">Contact</nuxt-link>
        </div>
        <div class="md:w-1/4 w-full md:ml-0 ml-8 md:mt-0 mt-4 md:mb-0 mb-4 text-white">
          <h2 class="text-2xl text-baits-green mb-1 font-bold">Resources</h2>
          <nuxt-link to="/blogs" class="block py-2 lg:text-xl text-lg">Blog</nuxt-link>
          <!-- <nuxt-link to class="block text-white py-2 lg:text-xl text-lg">Press</nuxt-link> -->
          <nuxt-link to="/account?tab=login" class="block py-2 lg:text-xl text-lg">Login</nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center bg-white">
      <div class="md:w-full w-2/3 text-center py-4">
        <!-- Desktop View -->
        <p class="text-gray-800 font-bold lg:block hidden">
          Copyright ©2020 Baitsbite Pte Ltd. All rights reserved. Use of this site constitutes acceptance of our
          <nuxt-link to="/terms" class="text-baits-blue mr-1">Terms of Use</nuxt-link>and
          <nuxt-link to="/policy" class="text-baits-blue">Privacy Policy</nuxt-link>
        </p>
        <!-- Mobile View -->
        <p class="text-baits-gray-dark font-bold lg:hidden block">
          <nuxt-link to="/terms" class="text-baits-blue">Terms of Use</nuxt-link>
          <span class="seperator"></span>
          <nuxt-link to="/policy" class="text-baits-blue ml-1">Privacy Policy</nuxt-link>
          <br />Copyright ©2020 Baitsbite Pte Ltd
        </p>
      </div>
    </div>
  </footer>
</template>
<style>
.fa-facebook-f {
  width: 30px;
  height: 30px;
  color: #fff;
  display: inline-block;
}

.fa-instagram {
  width: 30px;
  height: 30px;
  color: #fff;
  display: inline-block;
}

.fa-linkedin {
  width: 30px;
  height: 30px;
  color: #fff;
  display: inline-block;
}

.seperator {
  width: 1px;
  height: 1px;
  border: 1px solid;
  margin: 0px 4px;
  color: #595959;
}

.social a {
  margin: 1rem 0;
}
</style>
