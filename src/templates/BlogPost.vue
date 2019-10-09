<template>
  <Layout>
    <BlogHero />
    <div class="container">
      <p class="blog-content" v-html="$page.blogPost.content" />
    </div>
  </Layout>
</template>

<script>
import BlogHero from '~/components/BlogHero.vue';

export default {
  components: {
    BlogHero
  },
  metaInfo() {
    return {
      title: this.$page.blogPost.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.blogPost.description
        }
      ]
    }
  }
}
</script>

<page-query>
query BlogPost ($path: String!) {
   blogPost: blogPost (path: $path) {
    id
    title
    description
    content
    timeToRead
    date(format: "MMMM DD, YYYY")
  }
}
</page-query>

<style lang="scss">
  .blog-content {
    img {
      max-width: 100%;
    }

    p {
      color: $dark;
    }

    a {
      color: $primary;
    }

    h1,
    h2 {
      padding-top: 3rem;
    }

    h3,
    h4,
    h5 {
      padding-top: 1.5rem;
    }
  }
</style>