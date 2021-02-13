<template>
  <!-- Reset Email Modal -->
  <modal id="reset-password-modal" v-cloak ref="reset-password-modal" class="reset-password-modal">
    <div slot="body" class="pb-8">
      <div class="absolute w-full text-center left-0 px-6" style="top: -30px">
        <div class="py-6 px-20 lg:px-24 lg:text-2xl text-white rounded-md bg-baits-blue shadow-lg inline-block">Reset Password</div>
      </div>
      <div class="flex mt-12 px-6">
        <div class="flex items-center">
          <font-awesome-icon class="cursor-pointer mr-3 text-gray-500 fa-2x w-6 h-6" :icon="['fas', 'envelope']" />
        </div>
        <div class="flex items-center border-b border-b-2 border-baits-blue py-2 w-full">
          <input
            v-model="credientials.email"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="email"
            type="email"
            placeholder="Email Address"
            v-validate="'required|email'"
          />
          <button
            class="focus:outline-none flex-shrink-0 bg-baits-blue hover:bg-baits-blue border-baits-blue hover:border-baits-blue text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            @click="send_reset_email()"
          >
            Reset
          </button>
        </div>
      </div>
      <div class="validate-error-msg pl-16 mt-2 text-sm">
        <span class="caption" v-if="errors.has('email')">
          {{ errors.first('email') }}
        </span>
      </div>
      <div class="block py-4 text-baits-blue px-3 nuxt-link-exact-active nuxt-link-active mt-4 text-center cursor-pointer" @click="hide">Back to Login</div>
    </div>
  </modal>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      credientials: {
        email: '',
      },
    };
  },
  created() {
    if (process.client) {
      window.VoerroModalEvent.$on('show', (optionsOrId, options) => {
        this.$validator.reset();
        this.credientials.email = '';
      });
    }
  },
  methods: {
    ...mapActions({
      resetPassword: 'user/resetPassword',
    }),
    hide() {
      VoerroModal.hide('reset-password-modal');
    },
    send_reset_email() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const loginData = {
            email: this.credientials.email,
          };

          VoerroModal.hide('reset-password-modal');
          this.resetPassword({ data: loginData }).then((response) => {
            this.$toast.open({
              message: 'Reset email sent. Please check your inbox!',
              type: 'success',
              duration: 5000,
              dismissible: true,
            });
          });
        }
      });
    },
  },
};
</script>
<style>
.reset-password-modal > .modal-box > .modal-body {
  position: initial;
}

.reset-password-modal > .modal-box > .close-modal {
  display: none;
}
</style>
