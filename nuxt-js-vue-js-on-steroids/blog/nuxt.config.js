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
  */
  loading: { color: '#3B8070' },

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
  }
}
