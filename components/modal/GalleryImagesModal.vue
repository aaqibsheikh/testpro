<template>
  <!-- gallery-image-modal -->
  <modal id="gallery-image-modal" v-cloak class="gallery-image-modal">
    <div slot="body" class="text-center">
      <div class="flex flex-wrap">
        <div class="w-full pb-4 relative">
          <div class="flex flex-wrap bg-white my-3">
            <div class="w-full relative">
              <div class="absolute z-50 w-full h-full">
                <div class="flex flex-wrap items-center justify-between content-center h-full px-3">
                  <div @click="previousImage">
                    <font-awesome-icon class="cursor-pointer text-black opacity-75 w-8 h-8" :icon="['fas', 'arrow-left']" />
                  </div>
                  <div @click="nextImage">
                    <font-awesome-icon class="cursor-pointer text-black opacity-75 w-8 h-8" :icon="['fas', 'arrow-right']" />
                  </div>
                </div>
              </div>
              <img :src="image.path" class="inline-block shadow object-cover rounded-md" />
            </div>
          </div>
          <h2 class="text-baits-blue font-bold text-2xl px-5">
            {{ image.fileName }}
          </h2>
          <div class="flex flex-wrap my-3 px-5">
            <div class="w-full text-md text-gray-700">
              <div class="flex items-center justify-center">
                <input
                  v-model="image.path"
                  id="path"
                  class="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 text-xs px-2 leading-tight focus:outline-none"
                  type="text"
                  :readonly="true"
                />

                <!-- <div class="w-11/12 bg-gray-200 text-baits-black-dark text-sm py-2 px-1 whitespace-no-wrap">{{ image.path }}</div> -->
                <button class="focus:outline-none py-2 px-1 bg-baits-blue text-white text-xs" @click="onCopy">Copy</button>
              </div>
              <div class="flex flex-wrap items-center justify-around my-2">
                <div>
                  <span>Width: </span>
                  <span>{{ image.width }}</span>
                </div>
                <div>
                  <span>Height: </span>
                  <span>{{ image.height }}</span>
                </div>
                <div>
                  <span>Size: </span>
                  <span>{{ convertFileSize(image.fileSize) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-around">
            <button type="button" class="focus:outline-none px-6 py-1 w-32 text-white text-sm bg-baits-blue shadow rounded-full" @click="addThumbnailImage">
              Thumbnail
            </button>
            <button type="button" class="focus:outline-none px-6 py-1 w-32 text-white text-sm bg-baits-blue shadow rounded-full" @click="addBannerImage">
              Banner
            </button>
            <button type="button" class="focus:outline-none px-6 py-1 w-32 text-white text-sm bg-baits-gray shadow rounded-full" @click="closeGalleryModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: ['image', 'galleryImages'],
  methods: {
    closeGalleryModal() {
      VoerroModal.hide('gallery-image-modal');
    },
    addThumbnailImage() {
      this.$emit('selectImage', { type: 'thumbnail', image: this.image });
    },
    addBannerImage() {
      this.$emit('selectImage', { type: 'banner', image: this.image });
    },
    convertFileSize(fileSize) {
      if (fileSize > 0) return (fileSize / 1024).toFixed(2) + 'kb';
      else return 'N/A';
    },
    onCopy() {
      /* Get the text field */
      var copyText = document.getElementById('path');

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand('copy');

      this.$toast.open({
        message: 'Copied!',
        type: 'success',
        duration: 3000,
        dismissible: true,
      });
    },
    nextImage() {
      this.$emit('nextImage', this.image);
    },
    previousImage() {
      this.$emit('previousImage', this.image);
    },
  },
};
</script>
<style>
.gallery-image-modal > .modal-box {
  max-width: 50%;
}
</style>
