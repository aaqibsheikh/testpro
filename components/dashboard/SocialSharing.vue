<template>
  <ul>
    <li class="w-12 h-12 cursor-pointer rounded-t-md" style="background-color: #4167b2">
      <ShareNetwork
        @open="networkHandler"
        network="facebook"
        :url="`${baseUrl}/${text}/${data.url}`"
        :title="data.title"
        :description="data.description"
        quote
        hashtags="baitsbite"
      >
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'facebook-f']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #007bb6">
      <ShareNetwork @open="networkHandler" network="linkedin" :url="`${baseUrl}/${text}/${data.url}`">
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'linkedin-in']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #5da9dd">
      <ShareNetwork
        @open="networkHandler"
        network="twitter"
        :url="`${baseUrl}/${text}/${data.url}`"
        :title="data.title"
        hashtags="baitsbite"
        twitter-user="baitsbite"
      >
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'twitter']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #c20000">
      <ShareNetwork
        @open="networkHandler"
        network="pinterest"
        :url="`${baseUrl}/${text}/${data.url}`"
        :title="data.title"
        :description="data.description"
        :media="data.banners.length > 0 ? `${data.banners[0]}` : ''"
        hashtags="vuejs,vite,javascript"
      >
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'pinterest']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #ff2000">
      <ShareNetwork @open="networkHandler" network="reddit" :url="`${baseUrl}/${text}/${data.url}`" :title="data.title">
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'reddit-alien']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #258ace">
      <ShareNetwork @open="networkHandler" network="telegram" :url="`${baseUrl}/${text}/${data.url}`" :title="data.title" :description="data.description">
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'telegram-plane']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer" style="background-color: #24de5f">
      <ShareNetwork @open="networkHandler" network="whatsapp" :url="`${baseUrl}/${text}/${data.url}`" :title="data.title" :description="data.description">
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fab', 'whatsapp']" />
      </ShareNetwork>
    </li>
    <li class="w-12 h-12 cursor-pointer rounded-b-md" style="background-color: #5200ff">
      <ShareNetwork @open="networkHandler" network="email" :url="`${baseUrl}/${text}/${data.url}`" :title="data.title" :description="data.description">
        <font-awesome-icon class="text-white mt-2 text-center w-7 h-7" :icon="['fas', 'envelope']" />
      </ShareNetwork>
    </li>
  </ul>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: ['data', 'text'],
  data() {
    return {
      baseUrl: process.env.BASE_URL,
    };
  },
  methods: {
    ...mapActions({
      feedbackPromotion: 'promotion/feedbackPromotion',
    }),
    networkHandler() {
      let data = {
        share: 1,
      };

      this.feedbackPromotion({
        id: this.data.id,
        data: data,
      })
        .then((res) => {
          if (res.data.result) {
            console.log('shared');
          }
        })
        .catch((error) => {
          this.$toast.open({
            message: error,
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
};
</script>
