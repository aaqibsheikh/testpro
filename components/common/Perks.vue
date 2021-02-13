<template>
  <div class="cards-container flex">
    <div class="row1">
      <div class="card mx-3">
        <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl">
          <!--horizantil margin is just for display-->
          <div class="flex items-start px-4 py-6">
            <img class="w-24 h-24 rounded-full object-cover mr-4" src="~static/images/no_fee.png" alt="avatar" />
            <div class="">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-black -mt-1">No Fee</h2>
              </div>
              <p class="mt-3 text-black text-sm">
                Casting a bait is easy and free! Once we match you with the perfect professionals, a small nominal fee is charged to the professional. It won't
                cost you a dime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card mx-3">
        <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl">
          <!--horizantil margin is just for display-->
          <div class="flex items-start px-4 py-6">
            <img class="w-24 h-24 rounded-full object-cover mr-4" src="~static/images/credibility.jpg" alt="avatar" />
            <div class="">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-black -mt-1">Credibility</h2>
              </div>
              <p class="mt-3 text-black text-sm">
                We verify our professionals, publish their reviews and rating scores. There will also be other data to help you identify the right professionals
                across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row2">
      <div class="card mx-3">
        <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl">
          <!--horizantil margin is just for display-->
          <div class="flex items-start px-4 py-6">
            <img class="w-24 h-24 rounded-full object-cover mr-4" src="~static/images/privacy.png" alt="avatar" />
            <div class="">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-black -mt-1">Privacy</h2>
              </div>
              <p class="mt-3 text-black text-sm">Keep your identity and contact anonymous. Your contact details are not revealed when you cast bait.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card mx-3">
        <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl">
          <!--horizantil margin is just for display-->
          <div class="flex items-start px-4 py-6">
            <img class="w-24 h-24 rounded-full object-cover mr-4" src="~static/images/productivity.png" alt="avatar" />
            <div class="">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-black -mt-1">Productivity</h2>
              </div>
              <p class="mt-3 text-black text-sm">
                A notification to multiple relevant professionals when you cast your bait to increase your chance of a perfect match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Perks',
};
</script>

<style lang="scss" scoped>
h2 {
  font-family: 'Raleway';
}

p {
  font-family: Lato;
}

@media (max-width: 790px) {
  .cards-container {
    flex-direction: column;
    align-items: center;

    .row1 .my-10 {
      margin-bottom: 0 !important;
    }
  }

  // #f1f2f4
}
</style>
