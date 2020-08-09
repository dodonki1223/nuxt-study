<!--
  http://localhost:3000/users/ のルーティングを作成したい時は以下のようなフォルダ構成にする必要あり  
    - pages/users.vue
    - pages/users/index.vue
  -->
<template>
  <div>
    <input type="text" v-model="userId">
    <button @click="onLoadUser">Load User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: ''
    }
  },
  methods: {
    onLoadUser() {
      this.$router.push('/users/' + this.userId)
    }
  }
}
</script>
