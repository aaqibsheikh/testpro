<template>
  <div>
    <Loading :width="100" :height="100" :active.sync="isLoading" loader="bars" :can-cancel="false" :is-full-page="true" color="#0070C0"></Loading>
    <div v-cloak>
      <nuxt />
    </div>
    <AcceptCookies v-if="cookie" @setCookie="changeCookie" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import AcceptCookies from '@/components/common/widgets/AcceptCookies';
export default {
  components: {
    AcceptCookies,
  },
  computed: {
    ...mapGetters({
      isLoading: 'common/isLoading',
    }),
  },
  data() {
    return {
      cookie: false,
    };
  },
  mounted() {
    if (localStorage.getItem('user-cookie') === null) {
      this.cookie = true;
    }
  },
  methods: {
    changeCookie() {
      this.cookie = false;
    },
  },
};
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

/* Loader CSS */
/* Loader CSS */
.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon,
.vld-parent {
  position: relative;
}

/* Vue toast notifcation style */

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.fadeOut {
  animation-name: fadeOut;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInDown {
  animation-name: fadeInDown;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInUp {
  animation-name: fadeInUp;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.notices {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2em;
  overflow: hidden;
  z-index: 1052;
  pointer-events: none;
}

.notices .toast {
  display: inline-flex;
  align-items: center;
  animation-duration: 150ms;
  margin: 0.5em 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 0.25em;
  pointer-events: auto;
  opacity: 0.92;
  color: #fff;
  min-height: 3em;
  cursor: pointer;
}

.notices .toast .toast-text {
  margin: 0;
  padding: 0.5em 1em;
  word-break: break-all;
}

.notices .toast .toast-icon {
  display: none;
}

.notices .toast-success {
  background-color: #28a745;
}

.notices .toast-info {
  background-color: #17a2b8;
}

.notices .toast-warning {
  background-color: #ffc107;
}

.notices .toast-error {
  background-color: #dc3545;
}

.notices .toast-default {
  background-color: #343a40;
}

.notices .toast.is-top,
.notices .toast.is-bottom {
  align-self: center;
}

.notices .toast.is-top-right,
.notices .toast.is-bottom-right {
  align-self: flex-end;
}

.notices .toast.is-top-left,
.notices .toast.is-bottom-left {
  align-self: flex-start;
}

.notices.is-top {
  flex-direction: column;
}

.notices.is-bottom {
  flex-direction: column-reverse;
}

.notices.is-custom-parent {
  position: absolute;
}

@media screen and (max-width: 768px) {
  .notices {
    padding: 0;
    position: fixed !important;
  }
}
</style>
