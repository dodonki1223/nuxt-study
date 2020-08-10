<template>
  <div>
    <!-- 
      ヘッダーなどのコンポーネントを他で使い回すには共通のレイアウトに設定してあげるのが１つの解らしい
      ※別の講習で他のやり方も説明してくれる
     -->
    <Header />
    <header>
      USERS SECTION
    </header>
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style>
</style>
