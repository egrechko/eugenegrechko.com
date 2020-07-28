export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '| Eugene Grechko Freelance Web Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/scss/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/filters.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://content.nuxtjs.org/
    '@nuxt/content',
    // https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm'
  ],
  styleResources: {
    scss: './assets/scss/vars/*.scss'
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  gtm: {
    id: 'GTM-MWPBNDV'
  },
  // generate routes for blog posts
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content('blog')
        .only(['path'])
        .fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    }
  },
  sitemap: {
    hostname: 'https://eugenegrechko.com'
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
