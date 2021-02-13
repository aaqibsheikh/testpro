const env = require('dotenv').config();
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: env.parsed,
  head: {
    title: 'Baitsbite', //process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpeg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,300&family=Raleway&display=swap'
      }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/custom.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-modal', ssr: false },
    { src: '~/plugins/vue-social-sharing', ssr: false },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-slide-up-down', ssr: false },
    { src: '~/plugins/accordion', ssr: false },
    { src: '~/plugins/vue-ripple', ssr: false },
    { src: '~/plugins/socketio', ssr: false },
    { src: '~/plugins/vue-pdf', ssr: false },
    { src: '~/plugins/smooth-scroll', ssr: false },
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/v-click-outside', ssr: false },
    { src: '~/plugins/star-rating', ssr: false },
    { src: '~/plugins/paginate', ssr: false },
    { src: '~/plugins/vue-select', ssr: false },
    { src: '~/plugins/vue-image-upload', ssr: false },
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/vue-loading-overlay' },
    { src: '~/plugins/vue-toast-notification', ssr: false },
    { src: '~/plugins/mobile-detect', ssr: false },
    { src: '~plugins/vue-js-toggle-button', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~/plugins/stripe-checkout', ssr: false },
    { src: '~/plugins/tinymce', ssr: false },
    '~/plugins/axios',
    '~/plugins/fontawesome',
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-purgecss'
  ],
  purgeCSS: {
    enabled: true, // set this to make purgeCSS run in both dev and prod. Default is prod only
    whitelistPatterns: [
      // /svg.*/, /fa.*/ // font-awesome. use tailwind h w to control size instead
    ],
    whitelistPatternsChildren: [
      /swiper/,
      /^fa-*/,
      /^modal-*/, // for plugin @voerro/vue-modal
      /^mx-*/, // for plugin vue2-datepicker
      /^vs--*/, /^vs__*/, // for plugin v-select
      /^vld-*/, // for plugin vue-loading-overlay
      /^vue-ads-*/, /^focus:vue-ads-*/, /^hover:vue-ads-*/, // for plugin vue-ads-pagination
      /notices/, // for plugin vue-toast-notification
      /accordion/, // for plugin vue-faq-accordion
    ],
  },

  // Defaults options
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    'nuxt-purgecss',
    '@nuxtjs/style-resources',
    'vue-social-sharing/nuxt'
  ],

  axios: {
    baseURL: process.env.API_URL,
    proxy: process.env.API_PROXY === '1' ? true : false,
    proxyHeaders: process.env.API_PROXY === '1' ? true : false,
    credentials: true,
    init(axios, context) {
      axios.defaults.baseURL = context.env.API_URL;
    },
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },

  styleResources: {
    scss: [
      '~/assets/scss/style.scss'
    ]
  },
  // router: {
  //   linkActiveClass: 'active-link',
  //   linkExactActiveClass: 'active-link'
  // }
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      if (ctx && ctx.isClient) {
        config.optimization.splitChunks.maxSize = 51200;
      }
      config.output.globalObject = 'this';
      config.module.rules.push({
        test: /\.pdf$/,
        loader: 'url-loader',
      });
    },
  },
  watchers: {
    webpack: {
      ignored: /node_modules/
    }
  }
};
