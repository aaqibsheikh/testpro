<template>
  <div>
    <div class="overflow-hidden">
      <div class="container m-auto">
        <div class="md:flex justify-between h-full py-5">
          <div class="logo w-full md:w-64 flex justify-between">
            <nuxt-link to="/">
              <img src="~/static/images/logo_blue.png" class="w-48" />
            </nuxt-link>
          </div>
        </div>
      </div>
      <VuetifyCard>
        <template v-slot:title>Set Password</template>
        <template v-slot:content>
          <form @submit.prevent="updatePassword" method="post" v-if="!redirecting">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                ref="password"
                v-validate="'required|min:8'"
                v-model="password"
                name="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-relaxed focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
              />
              <div class="validate-error-msg text-sm text-red-500 text-xs italic">
                <span class="caption" v-if="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >Confirm Password</label>
              <input
                v-model="confirmPassword"
                v-validate="'required|min:8|confirmed:password'"
                data-vv-as="confirm password"
                name="confirmPassword"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-relaxed focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Re-enter password"
              />
              <div class="validate-error-msg text-sm text-red-500 text-xs italic">
                <span
                  class="caption"
                  v-if="errors.has('confirmPassword')"
                >{{ errors.first('confirmPassword') }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="mt-2 py-2 px-10 text-lg text-white rounded bg-baits-blue m-auto focus:outline-none"
              >Set Password</button>
            </div>
          </form>
          <div v-else>Redirecting . . . .</div>
        </template>
      </VuetifyCard>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import VuetifyCard from '@/components/common/widgets/VuetifyCard';

export default {
  components: {
    VuetifyCard,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      redirecting: false,
    };
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setToken: 'user/setToken',
    }),
    ...mapActions({
      fetchUser: 'user/fetchUser',
    }),
    updatePassword() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setLoader(true);
          const updatePasswordData = {
            token: this.$route.query.token,
            password: this.password,
          };

          var api = '/update-password';
          if (process.env.API_PROXY === '1' && process.client) {
            api = '/api' + api;
          }
          const response = this.$axios
            .post(api, updatePasswordData)
            .then((res) => {
              if (res.data.result) {
                this.setLoader(false);
                this.$nextTick(() => {
                  this.$toast.open({
                    message: 'Password successfully updated',
                    type: 'success',
                    duration: 5000,
                    dismissible: true,
                  });
                  this.redirecting = true;
                  this.$cookies.set('baitsToken', res.data.data.accessToken);
                  this.setToken(res.data.data.accessToken);
                  this.fetchUser(res.data.data.accessToken).then((userData) => {
                    if (
                      userData.roles.length > 1 ||
                      userData.roles.includes('consumer')
                    ) {
                      setTimeout(
                        () => this.$router.push({ path: '/dashboard/baits' }),
                        3000,
                      );
                    } else {
                      setTimeout(
                        () => this.$router.push({ path: '/dashboard/bites' }),
                        3000,
                      );
                    }
                  });
                });
              } else {
                this.setLoader(false);
                this.$toast.open({
                  message: 'Invalid or expired token.',
                  type: 'error',
                  duration: 5000,
                  dismissible: true,
                });

                setTimeout(() => this.$router.push({ path: '/account' }), 5000);
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
