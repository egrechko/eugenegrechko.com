<template>
  <Layout>

    <h3>Latest Posts</h3>
    <section class="blog-posts">
      <PostList v-for="edge in $page.allBlogPost.edges" :key="edge.node.id" :post="edge.node" />
    </section>

  </Layout>
</template>

<script>
import PostList from '~/components/PostList.vue';

export default {
  components: {
    PostList
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<page-query>
query {
  allBlogPost {
    edges {
      node {
        id
        title
        description
        timeToRead
        path
      }
    }
  }
}
</page-query>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
