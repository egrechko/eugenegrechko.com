<template>
  <div class="blog-post">
    <BlogHero
      :title="doc.title"
      :description="doc.description"
      :date="doc.date"
    />
    <div class="section">
      <div class="container content">
        <nuxt-content :document="doc" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogHero from '~/components/BlogHero'

export default {
  components: {
    BlogHero
  },
  head() {
    return {
      title: this.doc.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.description
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.doc.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.doc.description
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.doc.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.doc.description
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const doc = await $content(`blog/${params.slug}`).fetch()

    return { doc }
  }
}
</script>

<style lang="scss">
.nuxt-content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    & a {
      display: none;
    }
  }
}
</style>
