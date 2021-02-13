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
        <template v-slot:title>Email Verification</template>
        <template v-slot:content>
          <h2 class="text-lg font-bold mb-4 w-full text-center">
            {{ resMessage }}
          </h2>
          <div class="flex items-center justify-between">
            <button type="button" class="focus:outline-none mt-2 py-2 px-10 text-lg text-white rounded bg-baits-blue m-auto" @click="goBack" v-if="showGoBack">
              Let's go!
            </button>
          </div>
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
      showGoBack: false,
      token: '',
      resMessage: 'Checking . . . ',
    };
  },
  created() {
    this.setLoader(true);
  },
  mounted() {
    this.verifyEmail();
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
      setToken: 'user/setToken',
    }),
    ...mapActions({
      confirmEmail: 'user/confirmEmail',
      fetchUser: 'user/fetchUser',
    }),
    goBack() {
      this.$router.push('/');
    },
    async verifyEmail() {
      this.setLoader(true);
      const token = this.$route.query.token;
      if (token) {
        const response = await this.confirmEmail({ data: { token: token } });
        this.showGoBack = true;
        if (response.data.result) {
          // Confirmed email modal

          this.$nextTick(() => {
            // Confirmed email modal
            this.resMessage = 'Thank you for the verification. You will be redirected shortly.';

            // Loggin user
            this.setLoader(false);
            this.$cookies.set('baitsToken', response.data.data.accessToken);
            this.setToken(response.data.data.accessToken);
            this.fetchUser(response.data.data.accessToken).then((userData) => {
              setTimeout(() => this.$router.push({ path: '/dashboard' }), 3000);
              // if (userData.roles.length > 1 || userData.roles[0] == 'provider') {
              //   setTimeout(() => this.$router.push({ path: '/dashboard/bites' }), 3000);
              // } else {
              //   setTimeout(() => this.$router.push({ path: '/dashboard/baits' }), 3000);
              // }
            });
          });
        } else {
          this.setLoader(false);
          this.$nextTick(() => {
            // Invalid email modal
            this.resMessage = response.data.error;
          });
        }
      } else {
        this.showGoBack = true;
        this.setLoader(false);
        this.resMessage = 'Invalid request.';
      }
    },
  },
};
</script>
