<template>
  <!-- Apply for a bite modal -->
  <modal id="ask-provider-modal" v-cloak class="ask-provider-modal">
    <div slot="body" class="px-10 text-xs sm:text-base text-gray-700">
      <div class="text-center">
        <img src="~/static/images/logo_blue.png" alt="baitsbite" class="w-48 inline-block" />
      </div>
      <br />
      <div class="font-semibold mb-3 text-baits-blue mt-3">Subject:</div>
      <div>
        <input v-model="subject" class="baits-input appearance-none block w-full py-1 px-4" v-validate="'required'" name="subject" type="text" />
        <div class="validate-error-msg text-red-500 text-sm">
          <span class="caption" v-if="errors.has('subject')">{{ errors.first('subject') }}</span>
        </div>
      </div>
      <div class="font-semibold mb-3 text-baits-blue mt-4">Message:</div>
      <div>
        <textarea v-validate="'required'" v-model="message" name="message" class="baits-textarea appearance-none block w-full" rows="8"></textarea>
        <div class="validate-error-msg text-red-500 text-sm">
          <span class="caption" v-if="errors.has('message')">{{ errors.first('message') }}</span>
        </div>
      </div>
      <div class="text-center mt-6">
        <button class="focus:outline-none bg-baits-green text-white font-bold py-1 px-16 rounded-full" @click="saveAskProviderModal">Submit</button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { convertToWhatsappFormat } from '@/services/index';

export default {
  data() {
    return {
      subject: null,
      message: null,
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      // goingForBite: 'bite/goingForBite',
      // getPoolBitesList: 'bite/getPoolBitesList',
    }),
    saveAskProviderModal() {
      VoerroModal.hide('ask-provider-modal');
      // this.setLoader(true);
      // const data = {
      //   proposal: this.message,
      //   biteId: this.biteId,
      // };
      // this.goingForBite(data).then((response) => {
      //   VoerroModal.hide('ask-provider-modal');
      //   this.getPoolBitesList({ pageNum: '', pageSize: '' });
      //   VoerroModal.show('success-message-for-bite-the-bait-modal');
      //   this.description = null;
      //   this.setLoader(false);
      //   this.$toast.open({
      //     message: 'Bite Successfully!',
      //     type: 'success',
      //     duration: 5000,
      //     dismissible: true,
      //   });
      // });
      this.openWhatsapp('9212312312', 'john doe');
    },
    openWhatsapp(number, firstName) {
      if (number === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      number = convertToWhatsappFormat(number);
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    },
    openTelegram(telegramUserId, firstName) {
      if (telegramUserId === '') {
        VoerroModal.show('wamobile-message-modal');
        return;
      }
      var text = '';
      if (firstName) {
        text = encodeURI(`Hi ${firstName}`);
      }
      window.open(`https://telegram.me/${telegramUserId}?start=${text}`, '_blank');
    },
  },
};
</script>
<style>
.ask-provider-modal > .modal-box {
  max-width: 50%;
}
</style>
