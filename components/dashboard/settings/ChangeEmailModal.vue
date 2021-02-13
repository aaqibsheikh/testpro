<template>
  <!-- Update Email Modal -->
  <modal id="change-email-modal" v-cloak ref="change-email-modal">
    <div slot="title" class="sm:px-8">
      <h2 class="font-bold text-xl text-gray-700">Update Email</h2>
    </div>
    <div slot="body" class="sm:px-8 text-gray-700">
      <div class="my-4">
        <form @submit.prevent="updateEmail">
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">Current Email</label>
            <input
              class="baits-input appearance-none block w-full py-1 px-4"
              type="email"
              :value="user.email"
              readonly
            />
          </div>
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">New Email</label>
            <input
              class="baits-input appearance-none block w-full py-1 px-4"
              type="email"
              name="email"
              ref="email"
              v-validate="'required|email'"
              v-model="email"
            />
            <div class="validate-error-msg text-sm text-red-500 text-xs italic">
              <span class="caption" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">Confirm New Email</label>
            <input
              v-model="confirmEmail"
              v-validate="'required|email|confirmed:email'"
              data-vv-as="confirm email"
              name="confirmEmail"
              class="baits-input appearance-none block w-full py-1 px-4"
              type="email"
            />
            <div class="validate-error-msg text-sm text-red-500 text-xs italic">
              <span
                class="caption"
                v-if="errors.has('confirmEmail')"
              >{{ errors.first('confirmEmail') }}</span>
            </div>
          </div>
          <div class="w-full block">
            <p class="pt-3">
              <button type="submit" class="btn baits-btn baits-btn-blue px-12 py-1">Update</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      email: null,
      confirmEmail: null,
    };
  },
  computed: {
    ...mapGetters({
      user: 'profile/isUserProfile',
    }),
  },
  created() {
    window.VoerroModalEvent.$on('show', (optionsOrId, options) => {
      this.$validator.reset();
    });
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    updateEmail() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setLoader(true);

          var api = '/user/updateEmail';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }
          const response = this.$axios
            .post(api, { newEmail: this.email })
            .then((res) => {
              if (res.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Email successfully updated',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });

                this.email = null;
                this.confirmEmail = null;
                VoerroModal.hide('change-email-modal');
                VoerroModal.show('change-email-confirmation-modal');
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Failed to update email.',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });
              }
            })
            .catch((error) => {
              this.setLoader(false);
              console.log(error);
            });
        }
      });
    },
  },
};
</script>