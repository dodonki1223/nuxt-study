const pkg = require('./package')
const bodyParser = require("body-parser")

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool Web Development Blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: 5000 },
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  *    Nuxt.js では JavaScript プラグインを定義することができ、それはルートの Vue.js アプリ
  *    ケーションがインスタンス化される前に実行されます。この機能は、自前のライブラリや外部の
  *    モジュールを使用する際にとりわけ有用です
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  * > Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能
  *   https://ja.nuxtjs.org/guide/modules/
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://sample.firebaseio.com',
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://sample.firebaseio.com',
    fbAPIKey: 'sampleApiKey'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    // 全部のページに対して middleware を実行したい時はRouteに設定する
    // ただしページでリダイレクト処理等行われているとその分実行されてしまう
    // middleware: 'log'
  },
  serverMiddleware: [
    bodyParser.json() ,
    "~/api"
  ]
}
