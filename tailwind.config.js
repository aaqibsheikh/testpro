/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
    },
    extend: {
      colors: {
        'baits-blue': '#0070C0',
        'baits-dark-blue': '#383852',
        'baits-hard-gray': '#727577',
        'baits-green': '#06EBC3',
        'baits-gray-dark': '#595959',
        'baits-gray': '#a6a6a6',
        'baits-gray-lighter': '#666',
        'baits-gray-lightest': '#B7B7B7',
        'baits-light-gray': '#d8d8d8',
        'baits-black-dark': '#222',
        'baits-footer': '#2D285B',
        'smoke-900': 'rgba(0, 0, 0, 0.9)',
        'smoke-800': 'rgba(0, 0, 0, 0.75)',
        'invert-smoke-800': 'rgba(255, 255, 255, 0.8)',
        'smoke-600': 'rgba(0, 0, 0, 0.6)',
        smoke: 'rgba(0, 0, 0, 0.5)',
        'smoke-400': 'rgba(0, 0, 0, 0.4)',
        'smoke-200': 'rgba(0, 0, 0, 0.25)',
        'smoke-100': 'rgba(0, 0, 0, 0.1)',
        'profile-bg-blue-1': '#123d5c',
        'profile-bg-blue-2': '#2f5673',
        'profile-bg-blue-3': '#476781',
        'baits-heading-blue': '#1f699e',
        'indigo': {
          '100': '#0490f385',
          '200': '#0490f3',
          '300': '#048ae9d4',
          '400': '#048ae9',
          '500': '#0070c0a1',
          '600': '#0070c0b8',
          '700': '#0070c0e0',
          '800': '#0070c0',
          '900': '#005795',
        }
      },
      screens: {
        '2xl': '1580px'
      }
    },
    boxShadow: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 0 15px -2px rgba(0,0,0,0.4)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
  },
  variants: {
    backgroundColor: ['even', 'odd', 'hover'],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
};
