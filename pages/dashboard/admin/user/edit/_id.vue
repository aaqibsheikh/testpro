<template>
  <div class="w-full">
    <Header />
    <div class="edit-info max-w-full py-5 px-3 mx-auto max-w-screen-lg">
      <div class="border border-2 py-10 px-4">
        <user-card
          :img-url="user.avatar"
          :name="fullName(user.firstName, user.lastName)"
          :company-logo="user.companyAvatar"
          :company-name="user.companyName"
          :roles="user.roles"
          :is-editing="true"
        />
        <form class="col1 w-full py-16 px-10">
          <div class="personal border-b-2 border-gray-400">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">First Name</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder
                  v-model="user.firstName"
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Last Name</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder
                  v-model="user.lastName"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Email</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder
                  v-model="user.email"
                />
              </div>
            </div>
          </div>
          <div class="baits-profile py-4 border-b-2 border-gray-400" v-if="user.consumerProfile && user.consumerProfile.status !== 'na'">
            <p class="font-bold my-4">Profile</p>
            <BaitsFormDetails :baitProfile="user.consumerProfile" />
          </div>
          <div class="bites-profile border-b-2 border-gray-400" v-if="user.providerProfile && user.providerProfile.status !== 'na'">
            <p class="font-bold my-4">Provider Profile</p>
            <BitesFormDetails :biteProfile="user.providerProfile" />
          </div>
          <div class="bites-profile border-gray-400" v-if="user.providerProfile && user.providerProfile.pendingProfile">
            <p class="font-bold my-4">Pending Provider Profile</p>
            <BitesPendingProfile :biteProfile="user.providerProfile.pendingProfile" />
          </div>
        </form>
        <div class="text-right" v-if="hasAccess">
          <button @click="approvePendingProfileHandler" class="px-6 py-1 text-lg text-white rounded-full bg-baits-green focus:outline-none">Approve</button>
          <button @click="openRejectPendingProviderModal" class="px-6 py-1 text-lg ml-4 text-white rounded-full bg-red-500 focus:outline-none">Reject</button>
        </div>
      </div>
    </div>
    <RejectPendingProviderModal v-if="isDomReady" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '@/components/dashboard/Header';
import BaitsFormDetails from '@/components/admin/BaitsFormDetails';
import BitesFormDetails from '@/components/admin/BitesFormDetails';
import BitesPendingProfile from '@/components/admin/BitesPendingProfile';
import UserCard from '../UserCard';
import RejectPendingProviderModal from '@/components/modal/RejectPendingProviderModal';

export default {
  layout: 'dashboard',
  components: {
    Header,
    'user-card': UserCard,
    BaitsFormDetails,
    BitesFormDetails,
    BitesPendingProfile,
    RejectPendingProviderModal,
  },
  async fetch({ app, params, store }) {
    await store.dispatch('users/getSingleUser', { id: params.id });
  },
  data() {
    return {
      showButton: false,
      user: {},
      firstName: 'First name',
      userCompanyName: 'Company Name',
      userCode: 'Sub-category Name',
      lastName: 'Last name',
      isDomReady: false,
    };
  },
  computed: {
    ...mapGetters({
      selected: 'users/getSelectedUser',
    }),
    hasAccess() {
      this.selected.roles.filter((role) => {
        if (role.role === 'provider' && role.statusText === 'pending') {
          this.showButton = true;
        }
      });
      return this.showButton;
    },
  },
  methods: {
    ...mapMutations({
      setLoader: 'common/setLoader',
    }),
    ...mapActions({
      getUser: 'users/getSingleUser',
      approvePendingProfile: 'users/approvePendingProfile',
    }),
    openRejectPendingProviderModal() {
      VoerroModal.show('reject-pending-provider-modal');
    },
    fullName(first, last) {
      return `${first} ${last}`;
    },
    approvePendingProfileHandler() {
      this.setLoader(true);
      this.approvePendingProfile({ id: this.$route.params.id })
        .then((response) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'User profile approved',
            type: 'success',
            duration: 5000,
            dismissible: true,
          });
          if (response.data.result) {
            window.location.reload();
          }
        })
        .catch((error) => {
          this.setLoader(false);
          this.$toast.open({
            message: 'Error',
            type: 'success',
            duration: 5000,
            dismissible: true,
          });
        });
    },
  },
  mounted() {
    this.user = this.selected;
    this.isDomReady = true;
    if (this.user.company) {
      this.user.companyName = this.user.company.name;
      this.user.companyAvatar = this.user.company.avatar;
    }
  },
  watch: {
    selected(x, y) {
      this.user = this.selected;
    },
  },
};
</script>
<style scoped>
button:focus {
  outline: none;
}

.info {
  min-width: 100%;
}

input[type='file'] {
  width: 4%;
  visibility: hidden;
}

@media (max-width: 960px) {
  .edit-info {
    flex-direction: column;
  }

  .edit-info > .col1 {
    width: 100%;
  }
}

@media (max-width: 620px) {
  .p-16 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
