<template>
  <Layout>
    <div class="post-container">
      <h1>{{ $page.blogPost.title }}</h1>
      <strong>{{ $page.blogPost.description }}</strong>
      <p v-html="$page.blogPost.content" />
    </div>
  </Layout>
</template>

<script>
export default {
  
}
</script>

<page-query>
query BlogPost ($path: String!) {
   blogPost: blogPost (path: $path) {
    id
    title
    description
    content
  }
}
</page-query>

<style lang="scss" scoped>

</style>