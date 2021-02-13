<template>
  <div class="flex flex-wrap -mx-2">
    <div class="lg:w-4/12 md:w-1/2 w-full px-2">
      <div class="relative rounded-md boxShadow mb-8 social-card bg-simple-c-blue">
        <div class="p-5">
          <div class="flex flex-wrap items-center -mx-2">
            <div class="custom-width-auto px-2">
              <span class="feather text-c-blue social-icon">
                <font-awesome-icon class="cursor-pointer w-5 h-5 text-baits-blue w-4 h-4" style="color: #01a9ac" :icon="['fas', 'envelope']" />
              </span>
            </div>
            <div class="col px-2">
              <h6 class="mb-0 text-sm">Mail</h6>
              <p class="text-sm">231.2w downloads</p>
              <p class="mb-0 text-sm">Lorem Ipsum is simply dummy text of the printing</p>
            </div>
          </div>
        </div>
        <a href="#!" class="download-icon">
          <font-awesome-icon class="cursor-pointer w-4 h-4" :icon="['fas', 'arrow-down']" />
        </a>
      </div>
    </div>
    <div class="lg:w-4/12 md:w-1/2 w-full px-2">
      <div class="relative rounded-md boxShadow mb-8 social-card bg-simple-c-pink">
        <div class="p-5">
          <div class="flex flex-wrap items-center -mx-2">
            <div class="custom-width-auto px-2">
              <span class="feather text-c-pink social-icon">
                <font-awesome-icon class="cursor-pointer w-5 h-5" style="color: #fe5d70" :icon="['fab', 'twitter']" />
              </span>
            </div>
            <div class="col px-2">
              <h6 class="mb-0 text-sm">Twitter</h6>
              <p class="text-sm">231.2w downloads</p>
              <p class="mb-0 text-sm">Lorem Ipsum is simply dummy text of the printing</p>
            </div>
          </div>
        </div>
        <a href="#!" class="download-icon">
          <font-awesome-icon class="cursor-pointer w-4 h-4" :icon="['fas', 'arrow-down']" />
        </a>
      </div>
    </div>
    <div class="lg:w-4/12 w-full px-2">
      <div class="relative rounded-md boxShadow mb-8 social-card bg-simple-c-green">
        <div class="p-5">
          <div class="flex flex-wrap items-center -mx-2">
            <div class="custom-width-auto px-2">
              <span class="feather text-c-green social-icon">
                <font-awesome-icon class="cursor-pointer w-5 h-5" style="color: #01a9ac" :icon="['fab', 'instagram']" />
              </span>
            </div>
            <div class="col px-2">
              <h6 class="mb-0 text-sm">Instagram</h6>
              <p class="text-sm">231.2w downloads</p>
              <p class="mb-0 text-sm">Lorem Ipsum is simply dummy text of the printing</p>
            </div>
          </div>
        </div>
        <a href="#!" class="download-icon">
          <font-awesome-icon class="cursor-pointer w-4 h-4" :icon="['fas', 'arrow-down']" />
        </a>
      </div>
    </div>
  </div>
</template>
<style>
.custom-width-auto {
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
}
.col {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}
</style>
