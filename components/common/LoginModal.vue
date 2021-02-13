<template>
  <div>
    <dialog id="userActionModal" style="top: 8rem" class="fixed h-auto w-11/12 md:w-1/2 p-5 bg-gray-200 rounded-md m-auto">
      <div class="flex flex-col w-full h-auto">
        <!-- Header -->
        <div class="flex w-full h-auto justify-center items-center">
          <div class="flex w-full h-auto py-3 justify-center items-center text-2xl font-bold">
            <img style="width: 10vw; max-width: 250px" src="~/static/images/logo_blue.png" />
          </div>
          <div @click="closeModal()" class="flex ml-auto h-auto justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#3182ce"
              stroke="#3182ce"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <!--Header End-->
        </div>
        <!-- Modal Content-->
        <div v-if="newUser" class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
          <Signup />
        </div>
        <div v-if="!newUser" class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
          <Login />
        </div>
        <!-- End of Modal Content-->
      </div>
    </dialog>
  </div>
</template>

<script>
import Signup from '@/components/signup/Signup';
import Login from '@/components/login/Login';

export default {
  name: 'LoginModal',
  components: {
    Signup,
    Login,
  },
  // props will be used with token implementation
  // props: {
  //   newUser: {
  //     type: Boolean,
  //     required: false,
  //     default: true,
  //   },
  // },
  data: () => {
    return {
      modal: Object,
      newUser: true,
    };
  },
  methods: {
    closeModal() {
      this.modal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
dialog[open] {
  animation: appear 0.15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
  backdrop-filter: blur(3px);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
