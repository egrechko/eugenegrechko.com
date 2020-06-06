<template>
  <div>
    <HomeHero />
    <div class="section">
      <div class="container">
        <h1 class="title is-size-2">Latest Blog Posts</h1>
        <BlogPostCard
          class="blog-posts"
          v-for="post in posts"
          :key="post.title"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeHero from '~/components/HomeHero'
import BlogPostCard from '~/components/BlogPostCard'

export default {
  components: {
    HomeHero,
    BlogPostCard
  },
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await this.$content('blog')
      .only(['title', 'description', 'date', 'path'])
      .sortBy('date', 'desc')
      .limit(5)
      .fetch()
  },
  head() {
    const seoTitle = 'Eugene Grechko Freelance Web Developer Portland Oregon'

    const seoDescription =
      "My name is Eugene Grechko. I am a web developer & entrepreneur who likes to tinker around with technology. I built this site to document the things I am learning about and help others with the same issues I'm having."

    return {
      title: seoTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: seoDescription
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: seoTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: seoDescription
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: seoTitle
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: seoDescription
        }
      ]
    }
  }
}
</script>

<style></style>
