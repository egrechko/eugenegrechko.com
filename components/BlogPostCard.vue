<template>
  <div class="post-list">
    <p class="date">{{ post.date | formatDate }}</p>
    <h1 class="title">{{ post.title }}</h1>
    <p class="description">{{ post.description }}</p>
    <!-- <b>{{post.timeToRead}} min read</b> &nbsp; -->
    <nuxt-link :to="post.path" class="read">Read More...</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="scss" scoped>
.post-list {
  padding: 2rem;
  margin-bottom: 3rem;
  color: $light;

  &:hover {
    box-shadow: 0 0 6px rgba(33, 33, 33, 0.1);
  }
}

.line {
  border: 0.5px solid #cdc8c5;
  margin: 30px 0;
}

.date {
  font-size: 1.5rem;
  line-height: 0;
  margin-bottom: 2rem;
  // color: $light;
}

.title {
  color: $dark;
}

.description {
  margin-bottom: 3rem;
}

.read {
  padding: 7px;
  color: #333;
  text-decoration: none;
  border: 2px dashed $primary;
}
</style>
