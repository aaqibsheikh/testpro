<template>
  <div :class="[calcWidth < 640 ? 'fixed w-full top-0 bg-white z-50' : '']">
    <div class="flex flex-wrap justify-between py-3 px-5">
      <!-- Side Menu for responsive design mobile tab -->
      <div class="inline-block mr-6">
        <!--  -->
        <div class="sidebar">
          <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
          <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel bg-baits-blue relative">
              <Sidebar />
            </div>
          </transition>
        </div>
        <!--  -->
        <div
          id="burger"
          :class="{ active212: isBurgerActive }"
          @click.prevent="toggle"
          class="rounded-full h-12 w-12 flex items-center justify-center bg-baits-blue text-white shadow-lg xl:hidden"
        >
          <slot>
            <button type="button" class="burger-button" title="Menu">
              <span class="hidden">Toggle menu</span>
              <span class="burger-bar burger-bar--1"></span>
              <span class="burger-bar burger-bar--2"></span>
              <span class="burger-bar burger-bar--3"></span>
            </button>
          </slot>
        </div>
        <!--  -->
      </div>
      <div class="sm:w-56 w-40 inline-block sm:mt-0 mt-2">
        <!-- <img src="~/static/images/logo_blue.png" class="inline-block cursor-pointer"> -->
      </div>
      <div class="flex flex-wrap items-center">
        <div class="grid grid-cols-2 sm:gap-4 gap-2">
          <div>
            <!-- <img src="~/static/images/icon_ref_0017.png" class="cursor-pointer sm:w-6 w-4" /> -->
            <svg class="inline-block h-6 w-6" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m13.5 4.18c-.276 0-.5-.224-.5-.5v-1.68c0-.551-.449-1-1-1s-1 .449-1 1v1.68c0 .276-.224.5-.5.5s-.5-.223-.5-.5v-1.68c0-1.103.897-2 2-2s2 .897 2 2v1.68c0 .277-.224.5-.5.5z"
              />
              <path
                d="m12 24c-1.93 0-3.5-1.57-3.5-3.5 0-.276.224-.5.5-.5s.5.224.5.5c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5c0-.276.224-.5.5-.5s.5.224.5.5c0 1.93-1.57 3.5-3.5 3.5z"
              />
              <path
                d="m20.5 21h-17c-.827 0-1.5-.673-1.5-1.5 0-.439.191-.854.525-1.14 1.576-1.332 2.475-3.27 2.475-5.322v-3.038c0-3.86 3.14-7 7-7 3.86 0 7 3.14 7 7v3.038c0 2.053.899 3.99 2.467 5.315.342.293.533.708.533 1.147 0 .827-.672 1.5-1.5 1.5zm-8.5-17c-3.309 0-6 2.691-6 6v3.038c0 2.348-1.028 4.563-2.821 6.079-.115.098-.179.237-.179.383 0 .276.224.5.5.5h17c.276 0 .5-.224.5-.5 0-.146-.064-.285-.175-.38-1.796-1.519-2.825-3.735-2.825-6.082v-3.038c0-3.309-2.691-6-6-6z"
              />
            </svg>
          </div>
          <div>
            <nuxt-link to="/dashboard/settings">
              <svg
                class="inline-block h-6 w-6"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m272.066 512h-32.133c-25.989 0-47.134-21.144-47.134-47.133v-10.871c-11.049-3.53-21.784-7.986-32.097-13.323l-7.704 7.704c-18.659 18.682-48.548 18.134-66.665-.007l-22.711-22.71c-18.149-18.129-18.671-48.008.006-66.665l7.698-7.698c-5.337-10.313-9.792-21.046-13.323-32.097h-10.87c-25.988 0-47.133-21.144-47.133-47.133v-32.134c0-25.989 21.145-47.133 47.134-47.133h10.87c3.531-11.05 7.986-21.784 13.323-32.097l-7.704-7.703c-18.666-18.646-18.151-48.528.006-66.665l22.713-22.712c18.159-18.184 48.041-18.638 66.664.006l7.697 7.697c10.313-5.336 21.048-9.792 32.097-13.323v-10.87c0-25.989 21.144-47.133 47.134-47.133h32.133c25.989 0 47.133 21.144 47.133 47.133v10.871c11.049 3.53 21.784 7.986 32.097 13.323l7.704-7.704c18.659-18.682 48.548-18.134 66.665.007l22.711 22.71c18.149 18.129 18.671 48.008-.006 66.665l-7.698 7.698c5.337 10.313 9.792 21.046 13.323 32.097h10.87c25.989 0 47.134 21.144 47.134 47.133v32.134c0 25.989-21.145 47.133-47.134 47.133h-10.87c-3.531 11.05-7.986 21.784-13.323 32.097l7.704 7.704c18.666 18.646 18.151 48.528-.006 66.665l-22.713 22.712c-18.159 18.184-48.041 18.638-66.664-.006l-7.697-7.697c-10.313 5.336-21.048 9.792-32.097 13.323v10.871c0 25.987-21.144 47.131-47.134 47.131zm-106.349-102.83c14.327 8.473 29.747 14.874 45.831 19.025 6.624 1.709 11.252 7.683 11.252 14.524v22.148c0 9.447 7.687 17.133 17.134 17.133h32.133c9.447 0 17.134-7.686 17.134-17.133v-22.148c0-6.841 4.628-12.815 11.252-14.524 16.084-4.151 31.504-10.552 45.831-19.025 5.895-3.486 13.4-2.538 18.243 2.305l15.688 15.689c6.764 6.772 17.626 6.615 24.224.007l22.727-22.726c6.582-6.574 6.802-17.438.006-24.225l-15.695-15.695c-4.842-4.842-5.79-12.348-2.305-18.242 8.473-14.326 14.873-29.746 19.024-45.831 1.71-6.624 7.684-11.251 14.524-11.251h22.147c9.447 0 17.134-7.686 17.134-17.133v-32.134c0-9.447-7.687-17.133-17.134-17.133h-22.147c-6.841 0-12.814-4.628-14.524-11.251-4.151-16.085-10.552-31.505-19.024-45.831-3.485-5.894-2.537-13.4 2.305-18.242l15.689-15.689c6.782-6.774 6.605-17.634.006-24.225l-22.725-22.725c-6.587-6.596-17.451-6.789-24.225-.006l-15.694 15.695c-4.842 4.843-12.35 5.791-18.243 2.305-14.327-8.473-29.747-14.874-45.831-19.025-6.624-1.709-11.252-7.683-11.252-14.524v-22.15c0-9.447-7.687-17.133-17.134-17.133h-32.133c-9.447 0-17.134 7.686-17.134 17.133v22.148c0 6.841-4.628 12.815-11.252 14.524-16.084 4.151-31.504 10.552-45.831 19.025-5.896 3.485-13.401 2.537-18.243-2.305l-15.688-15.689c-6.764-6.772-17.627-6.615-24.224-.007l-22.727 22.726c-6.582 6.574-6.802 17.437-.006 24.225l15.695 15.695c4.842 4.842 5.79 12.348 2.305 18.242-8.473 14.326-14.873 29.746-19.024 45.831-1.71 6.624-7.684 11.251-14.524 11.251h-22.148c-9.447.001-17.134 7.687-17.134 17.134v32.134c0 9.447 7.687 17.133 17.134 17.133h22.147c6.841 0 12.814 4.628 14.524 11.251 4.151 16.085 10.552 31.505 19.024 45.831 3.485 5.894 2.537 13.4-2.305 18.242l-15.689 15.689c-6.782 6.774-6.605 17.634-.006 24.225l22.725 22.725c6.587 6.596 17.451 6.789 24.225.006l15.694-15.695c3.568-3.567 10.991-6.594 18.244-2.304z"
                />
                <path
                  d="m256 367.4c-61.427 0-111.4-49.974-111.4-111.4s49.973-111.4 111.4-111.4 111.4 49.974 111.4 111.4-49.973 111.4-111.4 111.4zm0-192.8c-44.885 0-81.4 36.516-81.4 81.4s36.516 81.4 81.4 81.4 81.4-36.516 81.4-81.4-36.515-81.4-81.4-81.4z"
                />
              </svg>
            </nuxt-link>
          </div>
          <!-- <div class="relative" v-click-outside="closeProfileDropDown">
            <img src="~/static/images/icon_ref_0016.png" class="cursor-pointer sm:w-6 w-4" @click="showProfileDropDown = !showProfileDropDown" />
            <div class="absolute right-0 w-40 border-2 border-gray-400 bg-white account_menu_dd" v-if="showProfileDropDown">
              <nuxt-link to="/dashboard/" class="block py-2 text-gray-800 px-3 text-xl hover:bg-gray-400">Profile</nuxt-link>
              <nuxt-link to="/dashboard/settings" class="block py-2 text-gray-800 px-3 text-xl hover:bg-gray-400">Settings</nuxt-link>
              <div @click="logout" class="cursor-pointer block py-2 text-gray-800 px-3 text-xl hover:bg-gray-400">Logout</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/dashboard/Sidebar';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  layout: 'header',
  components: {
    Sidebar,
  },
  data() {
    return {
      showProfileDropDown: false,
    };
  },
  computed: {
    ...mapGetters({
      isPanelOpen: 'common/isPanelOpen',
      isBurgerActive: 'common/isBurgerActive',
    }),
    calcWidth() {
      return this.windowWidth;
    },
  },
  methods: {
    ...mapMutations({
      setPanel: 'common/setPanel',
      setBurger: 'common/setBurger',
    }),
    ...mapActions({
      userLogout: 'user/userLogout',
    }),
    closeProfileDropDown() {
      this.showProfileDropDown = false;
    },
    toggle() {
      this.setBurger(true);
      this.setPanel(true);
    },
    closeSidebarPanel() {
      this.setBurger(false);
      this.setPanel(false);
    },
    logout() {
      this.$router.push('/dashboard/logout');
    },
  },
};
</script>
