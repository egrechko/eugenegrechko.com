<template>
  <Layout>
    <div class="container">
      <HomeHero />

      <h3 class="posts-heading">Latest Posts</h3>
      <hr class="line">
      <section class="blog-posts">
        <PostList v-for="edge in $page.allBlogPost.edges" :key="edge.node.id" :post="edge.node" />
      </section>
    </div>

  </Layout>
</template>

<script>
import PostList from '~/components/PostList.vue';
import HomeHero from '~/components/HomeHero.vue';

export default {
  components: {
    PostList,
    HomeHero
  },
  metaInfo: {
    title: 'Home'
  }
}
</script>

<page-query>
query {
  allBlogPost(perPage: 9) {
    edges {
      node {
        id
        title
        description
        timeToRead
        path
        date(format: "MMMM DD, YYYY")
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
  .line {
    border: 0.5px solid #cdc8c5;
    margin: 3rem 0;
  }

  h3.posts-heading {
    color: $light;
    margin-top: 6rem;
    line-height: 0;
  }
</style>
