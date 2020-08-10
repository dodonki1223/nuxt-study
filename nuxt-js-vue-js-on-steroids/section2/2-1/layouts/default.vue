<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
// WebPack により @ がルートフォルダに置き換わる
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style>

</style>
