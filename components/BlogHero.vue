<template>
  <div class="blog-hero hero is-primary is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-1 has-text-white">{{ title }}</h1>
        <p class="description">{{ description }}</p>
        <p class="misc-details">📅 {{ date | formatDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'date']
}
</script>

<style lang="scss" scoped>
.blog-hero {
  background-color: $primary;
  color: #fff;
}

.description,
.misc-details {
  color: rgba(#fff, 0.8);
}

.misc-details {
  margin-top: 2rem;
}
</style>
