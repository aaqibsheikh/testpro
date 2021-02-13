<template>
  <div class="pb-40">
    <div class="mx-6">
      <div class="container w-full sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 m-auto relative bg-white shadow-full rounded px-8 pt-6 mb-4 mt-20 pb-8">
        <div class="m-auto pt-20">
          <div class="absolute w-full text-center left-0 px-6" style="top: -30px;">
            <div type="button" class="py-6 px-20 lg:px-24 text-xl text-white rounded-md bg-baits-blue shadow-lg">
              <slot name="title"></slot>
            </div>
          </div>
          <div class="">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--  -->
<script>
export default {}

</script>
