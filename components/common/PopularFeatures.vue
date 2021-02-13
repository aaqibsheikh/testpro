<template>
  <div>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/mortgage-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Mortgage Loan</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/retirement-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Retirement Planning</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/property-buy-sell-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Buy/Sell Property</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/investment-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Investment</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/business-loan-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Business Loan</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 sm:p-10 text-center cursor-pointer text-baits-blue card-container">
        <div class="py-8 max-w-sm rounded overflow-hidden shadow-lg bg-white card">
          <div class="space-y-3">
            <img src="~/static/images/endowment-540.png" class="sm:w-20 w-10" />
            <div class="card-title">
              <h3 class="font-bold text-gray-500 sm:text-xl text-sm raleway">Endowment</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularFeatures',
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
