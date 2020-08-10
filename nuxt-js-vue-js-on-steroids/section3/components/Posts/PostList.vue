<template>
  <section class="post-list">
    <PostPreview 
      id="1"
      thumbnail="https://techcrunchjp.files.wordpress.com/2016/05/codecode1.jpg?w=738"
      title="Hello there!"
      previewText="This my first post!" />
    <PostPreview 
      id="2"
      thumbnail="https://techcrunchjp.files.wordpress.com/2016/05/codecode1.jpg?w=738"
      title="Hello there! second time!"
      previewText="This my second post!" />
    <PostPreview 
      id="3"
      thumbnail="https://techcrunchjp.files.wordpress.com/2016/05/codecode1.jpg?w=738"
      title="Hello there! third time!"
      previewText="This my third post!" />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
