<template>
  <!-- Update Passowrd Modal -->
  <modal id="change-password-modal" v-cloak ref="change-password-modal">
    <div slot="title" class="sm:px-8">
      <h2 class="font-bold text-xl text-gray-700">Update Password</h2>
    </div>
    <div slot="body" class="sm:px-8 text-gray-700">
      <div class="my-4">
        <form @submit.prevent="updatePassword">
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">Current Password</label>
            <div class="relative">
              <input
                class="baits-input appearance-none block w-full py-1 px-4"
                :type="visibilityForCurrentNo"
                v-model="currentPassword"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                @click="toggleVisibilityForCurrentNumber"
              >
                <font-awesome-icon
                  v-if="visibilityForCurrentNo === 'password'"
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye']"
                />
                <font-awesome-icon
                  v-else
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye-slash']"
                />
              </div>
            </div>
          </div>
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">New Password</label>
            <div class="relative">
              <input
                class="baits-input appearance-none block w-full py-1 px-4"
                :type="visibilityForNewNo"
                name="password"
                data-vv-as="password"
                ref="password"
                v-validate="'required|min:8'"
                v-model="password"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                @click="toggleVisibilityForNewNumber"
              >
                <font-awesome-icon
                  v-if="visibilityForNewNo === 'password'"
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye']"
                />
                <font-awesome-icon
                  v-else
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye-slash']"
                />
              </div>
            </div>
            <div class="validate-error-msg text-sm text-red-500 text-xs italic">
              <span class="caption" v-if="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="md:w-2/3 mb-4">
            <label class="block tracking-wide mb-2">Confirm New Password</label>
            <div class="relative">
              <input
                class="baits-input appearance-none block w-full py-1 px-4"
                :type="visibilityForConfirmNo"
                v-model="confirmPassword"
                v-validate="'required|min:8|confirmed:password'"
                data-vv-as="confirm password"
                name="confirmPassword"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                @click="toggleVisibilityForConfirmNumber"
              >
                <font-awesome-icon
                  v-if="visibilityForConfirmNo === 'password'"
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye']"
                />
                <font-awesome-icon
                  v-else
                  class="h-5 inline-block cursor-pointer -ml-10 mr-3 text-blue-500"
                  :icon="['fas', 'eye-slash']"
                />
              </div>
            </div>
            <div class="validate-error-msg text-sm text-red-500 text-xs italic">
              <span
                class="caption"
                v-if="errors.has('confirmPassword')"
              >{{ errors.first('confirmPassword') }}</span>
            </div>
          </div>
          <div class="w-full block mb-2">
            <p class="pt-3">
              <button
                type="submit"
                class="btn baits-btn baits-btn-blue px-12 py-1"
              >Update</button>
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
      currentPassword: null,
      password: null,
      confirmPassword: null,
      visibilityForCurrentNo: 'password',
      visibilityForNewNo: 'password',
      visibilityForConfirmNo: 'password',
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
    toggleVisibilityForCurrentNumber() {
      this.visibilityForCurrentNo =
        this.visibilityForCurrentNo === 'password' ? 'text' : 'password';
    },
    toggleVisibilityForNewNumber() {
      this.visibilityForNewNo =
        this.visibilityForNewNo === 'password' ? 'text' : 'password';
    },
    toggleVisibilityForConfirmNumber() {
      this.visibilityForConfirmNo =
        this.visibilityForConfirmNo === 'password' ? 'text' : 'password';
    },
    updatePassword() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setLoader(true);

          var api = '/user/updatePassword';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }
          const response = this.$axios
            .post(api, {
              password: this.currentPassword,
              newPassword: this.password,
            })
            .then((res) => {
              if (res.data.result) {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Password successfully updated',
                  type: 'success',
                  duration: 5000,
                  dismissible: true,
                });

                this.password = null;
                this.confirmPassword = null;
                VoerroModal.hide('change-password-modal');
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Unable to update password.',
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
