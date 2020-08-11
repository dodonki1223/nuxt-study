const pkg = require('./package')

module.exports = {
  /*
      サーバーサイドレンダリング(`universal`)かSPA(`spa`)のどちらかを選択できる
      プロジェクトを作った時に選択されたものになる
      SPAだと事前レンダリングを使用しない形になる（単一のViewファイルが読み込まれるだけ）
      事前レンダリングを使用したい時は `universal` にする
   */
  mode: 'universal',

  /*
  ** Headers of the page
  *  共通で使用される head セクションを設定することができる
  *  CDNの設定を行うのもあり
  *  上書きしたい場合は特定ページで書き換えてやればよい
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  *  上に表示される読み込み時のローディングバーのCSSを変更することができる奴
  *  Rails の turbolinks みたいな奴だと思う。必要ない場合は false にすることもできる
  */
  // loading: false,
  loading: { color: '#fa923f', height: '4px', duration: 5000 },
  /*
      上の設定は画面上部に現れる奴で loadingIndicator はページのど真ん中に表示されるもの
      Circleを設定するとクルクルと回ってユーザーの視点的にはわかりやすくなると思われる
   */
  loadingIndicator: {
    name: 'circle',
    color: '#ffa923f'
  },
 
  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

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
  // 環境変数を設定することができる
  env: {
    baseUrl: process.env.BASE_URL || "https://sample.firebaseio.com"
  },

  router: {
    // <nuxt-link> のデフォルトの active class をグローバルに設定する
    // https://ja.nuxtjs.org/api/configuration-router/#linkactiveclass
    linkActiveClass: 'active'
    // 存在しないページへ遷移した時、404にならずに `pages/index.vue` のページを表示する設定になります
    /*
      extendRoutes(routes, resolve) {
        routes.push({
          path: '*',
          component: resolve(__dirname, 'pages/index.vue')
        })
      }
     */
  }
}
