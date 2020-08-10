<template>
  <h1>A singule user, with ID: {{ $route.params.id }}</h1>
</template>

<script>
export default {
  validate({ params }) {
    // 数値以外の場合は４０４を返すようにする
    // この辺に書かれている→https://ja.nuxtjs.org/api/pages-validate/
    return /^\d+$/.test(params.id)
  },
  // 共通のレイアウト（default.vue）がデフォルトで適用されるが別のものを適用
  // したい場合は別途、layoutsフォルダusersを当てるやり方
  layout: 'users'
}
</script>
