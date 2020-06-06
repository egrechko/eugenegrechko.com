<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-size-2">Blog</h1>
      <p>
        Welcome to my blog. Here I will write posts about different things that
        I am learning and solutions to problems that I have solved. Some random
        guides will be sprinkled in as well since I like to play around with
        Linux servers in my free time.
      </p>
      <hr />
      <BlogPostCard
        class="blog-posts"
        v-for="post in posts"
        :key="post.title"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import BlogPostCard from '~/components/BlogPostCard'

export default {
  components: {
    BlogPostCard
  },
  head: {
    title: 'Blog | Eugene Grechko Freelance Web Developer'
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
      .fetch()
  }
}
</script>
