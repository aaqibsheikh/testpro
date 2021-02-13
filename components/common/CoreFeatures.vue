<template>
  <div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 feat-grid">
      <div class="p-2 sm:p-10 text-center cursor-pointer card-container">
        <div
          class="py-8
          bg-baits-blue max-w-sm rounded overflow-hidden shadow-lg hover:shadow-md transition duration-500 shadow-md card"
        >
          <div class="space-y-3">
            <img src="~/static/images/income-growth.png" />
            <div class="card-title">
              <h3 class="font-bold text-white text-4xl raleway">Increase your Savings</h3>
            </div>
            <div class="px-6 py-4">
              <div class="space-y-5">
                <div
                  class="font-bold text-xl text-white mb-2 lato">Find out the lowest interest loans for business, property, car, renovation and many more. </div>
                <p class="text-white font-bold text-xl text-base more">
                 Learn more >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div
          class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card"
        >
          <div class="space-y-3">
            <img src="~/static/images/grow.jpg" />
            <div class="card-title">
              <h3 class="font-bold text-baits-blue text-4xl raleway">
                Grow your <br> wealth
              </h3>
            </div>
            <div class="px-6 py-4">
              <div class="space-y-5">
                <div
                  class="font-bold text-xl text-baits-blue mb-2 lato">Explore options of investment instruments and strategies from certified experts. </div>
                <p class="text-baits-blue font-bold text-xl text-base more mt-20">
                 Learn more >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer card-container">
        <div
          class="py-8
          bg-baits-blue max-w-sm rounded overflow-hidden shadow-lg hover:shadow-md transition duration-500 shadow-md card"
        >
          <div class="space-y-3">
            <img src="~/static/images/assets.png" />
            <div class="card-title">
              <h3 class="font-bold text-white text-4xl raleway">Build Your <br> Assets</h3>
            </div>
            <div class="px-6 py-4">
              <div class="space-y-5">
                <div
                  class="font-bold text-xl text-white mb-2 lato">Multiply your assets  and maximize their valuations with advices from  market experts. </div>
                <p class="text-white font-bold text-xl text-base more">
                 Learn more >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoreFeatures',
};
</script>

<style lang="scss" scoped>

.lato {
  font-family: 'Lato', sans-serif;
}

.raleway {
  font-family: 'Raleway';
}

.card {
  border-radius: 10px;
  // min-height: 50rem;
  img {
    max-width: 100%;
    height: auto;
    max-height: 20rem;
    margin: 0 auto;
  }
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 2px 8px 45px;
  transform: translate3d(0px, -2px, 0px);
}

.more {
  bottom: 0;
  position: relative;
}

@media (max-width: 1023px) {
  .feat-grid {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
</style>
