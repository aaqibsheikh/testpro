import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_vuesocialsharingplugin_0bac5042 from 'nuxt_plugin_vuesocialsharingplugin_0bac5042' // Source: ./vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_vuescrollto_b953e3c0 from 'nuxt_plugin_vuescrollto_b953e3c0' // Source: ./vue-scrollto.js (mode: 'client')
import nuxt_plugin_cookieuniversalnuxt_3a88c171 from 'nuxt_plugin_cookieuniversalnuxt_3a88c171' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_7835d3c9 from 'nuxt_plugin_axios_7835d3c9' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_vuemodal_731984f0 from 'nuxt_plugin_vuemodal_731984f0' // Source: ../plugins/vue-modal (mode: 'client')
import nuxt_plugin_vuesocialsharing_dccf00ce from 'nuxt_plugin_vuesocialsharing_dccf00ce' // Source: ../plugins/vue-social-sharing (mode: 'client')
import nuxt_plugin_vueawesomeswiper_4af85e3f from 'nuxt_plugin_vueawesomeswiper_4af85e3f' // Source: ../plugins/vue-awesome-swiper (mode: 'client')
import nuxt_plugin_vueslideupdown_06f4d08a from 'nuxt_plugin_vueslideupdown_06f4d08a' // Source: ../plugins/vue-slide-up-down (mode: 'client')
import nuxt_plugin_accordion_02bc2e92 from 'nuxt_plugin_accordion_02bc2e92' // Source: ../plugins/accordion (mode: 'client')
import nuxt_plugin_vueripple_0f5f1766 from 'nuxt_plugin_vueripple_0f5f1766' // Source: ../plugins/vue-ripple (mode: 'client')
import nuxt_plugin_socketio_3c15614f from 'nuxt_plugin_socketio_3c15614f' // Source: ../plugins/socketio (mode: 'client')
import nuxt_plugin_vuepdf_163aeff5 from 'nuxt_plugin_vuepdf_163aeff5' // Source: ../plugins/vue-pdf (mode: 'client')
import nuxt_plugin_smoothscroll_4a637016 from 'nuxt_plugin_smoothscroll_4a637016' // Source: ../plugins/smooth-scroll (mode: 'client')
import nuxt_plugin_vuedatepicker_19e66559 from 'nuxt_plugin_vuedatepicker_19e66559' // Source: ../plugins/vue-datepicker (mode: 'client')
import nuxt_plugin_vclickoutside_661f0b13 from 'nuxt_plugin_vclickoutside_661f0b13' // Source: ../plugins/v-click-outside (mode: 'client')
import nuxt_plugin_starrating_4c3c177c from 'nuxt_plugin_starrating_4c3c177c' // Source: ../plugins/star-rating (mode: 'client')
import nuxt_plugin_paginate_2695a1ed from 'nuxt_plugin_paginate_2695a1ed' // Source: ../plugins/paginate (mode: 'client')
import nuxt_plugin_vueselect_0c6a19ce from 'nuxt_plugin_vueselect_0c6a19ce' // Source: ../plugins/vue-select (mode: 'client')
import nuxt_plugin_vueimageupload_b6f2d1e0 from 'nuxt_plugin_vueimageupload_b6f2d1e0' // Source: ../plugins/vue-image-upload (mode: 'client')
import nuxt_plugin_veevalidate_6e5ad03a from 'nuxt_plugin_veevalidate_6e5ad03a' // Source: ../plugins/vee-validate (mode: 'all')
import nuxt_plugin_vueloadingoverlay_7e0edf42 from 'nuxt_plugin_vueloadingoverlay_7e0edf42' // Source: ../plugins/vue-loading-overlay (mode: 'all')
import nuxt_plugin_vuetoastnotification_6590096e from 'nuxt_plugin_vuetoastnotification_6590096e' // Source: ../plugins/vue-toast-notification (mode: 'client')
import nuxt_plugin_mobiledetect_f3c7cb10 from 'nuxt_plugin_mobiledetect_f3c7cb10' // Source: ../plugins/mobile-detect (mode: 'client')
import nuxt_plugin_vuejstogglebutton_66316bf6 from 'nuxt_plugin_vuejstogglebutton_66316bf6' // Source: ../plugins/vue-js-toggle-button (mode: 'client')
import nuxt_plugin_ga_fb0a2534 from 'nuxt_plugin_ga_fb0a2534' // Source: ../plugins/ga.js (mode: 'client')
import nuxt_plugin_stripecheckout_4cdc4090 from 'nuxt_plugin_stripecheckout_4cdc4090' // Source: ../plugins/stripe-checkout (mode: 'client')
import nuxt_plugin_tinymce_ced4b34e from 'nuxt_plugin_tinymce_ced4b34e' // Source: ../plugins/tinymce (mode: 'client')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ../plugins/axios (mode: 'all')
import nuxt_plugin_fontawesome_b8d42804 from 'nuxt_plugin_fontawesome_b8d42804' // Source: ../plugins/fontawesome (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Baitsbite","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Baitsbite - Connecting Professionals To You"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.jpeg"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Lato:ital,wght@0,700;1,300&family=Raleway&display=swap"}],"style":[],"script":[{"hid":"gf-script","innerHTML":"(function (){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Lato:ital,wght@0,700;1,300&family=Raleway&display=swap\";document.querySelector(\"head\").appendChild(l);})();"}],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Lato:ital,wght@0,700;1,300&family=Raleway&display=swap\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_vuesocialsharingplugin_0bac5042 === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_0bac5042(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuescrollto_b953e3c0 === 'function') {
    await nuxt_plugin_vuescrollto_b953e3c0(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_3a88c171 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_3a88c171(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_7835d3c9 === 'function') {
    await nuxt_plugin_axios_7835d3c9(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuemodal_731984f0 === 'function') {
    await nuxt_plugin_vuemodal_731984f0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuesocialsharing_dccf00ce === 'function') {
    await nuxt_plugin_vuesocialsharing_dccf00ce(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueawesomeswiper_4af85e3f === 'function') {
    await nuxt_plugin_vueawesomeswiper_4af85e3f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueslideupdown_06f4d08a === 'function') {
    await nuxt_plugin_vueslideupdown_06f4d08a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_accordion_02bc2e92 === 'function') {
    await nuxt_plugin_accordion_02bc2e92(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueripple_0f5f1766 === 'function') {
    await nuxt_plugin_vueripple_0f5f1766(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_socketio_3c15614f === 'function') {
    await nuxt_plugin_socketio_3c15614f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuepdf_163aeff5 === 'function') {
    await nuxt_plugin_vuepdf_163aeff5(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_smoothscroll_4a637016 === 'function') {
    await nuxt_plugin_smoothscroll_4a637016(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuedatepicker_19e66559 === 'function') {
    await nuxt_plugin_vuedatepicker_19e66559(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vclickoutside_661f0b13 === 'function') {
    await nuxt_plugin_vclickoutside_661f0b13(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_starrating_4c3c177c === 'function') {
    await nuxt_plugin_starrating_4c3c177c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_paginate_2695a1ed === 'function') {
    await nuxt_plugin_paginate_2695a1ed(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueselect_0c6a19ce === 'function') {
    await nuxt_plugin_vueselect_0c6a19ce(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueimageupload_b6f2d1e0 === 'function') {
    await nuxt_plugin_vueimageupload_b6f2d1e0(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_6e5ad03a === 'function') {
    await nuxt_plugin_veevalidate_6e5ad03a(app.context, inject)
  }

  if (typeof nuxt_plugin_vueloadingoverlay_7e0edf42 === 'function') {
    await nuxt_plugin_vueloadingoverlay_7e0edf42(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuetoastnotification_6590096e === 'function') {
    await nuxt_plugin_vuetoastnotification_6590096e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_mobiledetect_f3c7cb10 === 'function') {
    await nuxt_plugin_mobiledetect_f3c7cb10(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuejstogglebutton_66316bf6 === 'function') {
    await nuxt_plugin_vuejstogglebutton_66316bf6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ga_fb0a2534 === 'function') {
    await nuxt_plugin_ga_fb0a2534(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_stripecheckout_4cdc4090 === 'function') {
    await nuxt_plugin_stripecheckout_4cdc4090(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_tinymce_ced4b34e === 'function') {
    await nuxt_plugin_tinymce_ced4b34e(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_b8d42804 === 'function') {
    await nuxt_plugin_fontawesome_b8d42804(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
