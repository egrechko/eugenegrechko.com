<template>
  <div class="blog-hero">
    <div class="container">
      <h1 class="title">{{ $page.blogPost.title }}</h1>
      <p class="description">{{ $page.blogPost.description }}</p>
      <p class="misc-details">📅 {{ $page.blogPost.date }} | ☕ {{ $page.blogPost.timeToRead }} time to read</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .blog-hero {
    margin-bottom: 6rem;
    padding: 3rem 0;
    background-color: $primary;
    color: #fff;
  }
</style>
