<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "First Post",
              previewText: "This is our first post!",
              thumbnail: "https://techcrunchjp.files.wordpress.com/2016/05/codecode1.jpg?w=738"
            },
            {
              id: "2",
              title: "Second Post",
              previewText: "This is our second post!",
              thumbnail: "https://techcrunchjp.files.wordpress.com/2016/05/codecode1.jpg?w=738"
            }
          ]
        });
      }, 1000);
      // // エラーを無理やり起こす場合
      // reject(new Error())
    })
    .then(data => {
      return data
    })
    .catch(e => {
      context.error(e)
    })
  }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
