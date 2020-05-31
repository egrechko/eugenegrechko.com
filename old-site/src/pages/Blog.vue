<template>
  <Layout>
    <div class="container">
      <h1>Blog</h1>
      <p>Welcome to my blog. Here I will write posts about different things that I am learning and solutions to problems that I have solved. Some random guides will be sprinkled in as well since I like to play around with Linux servers in my free time.</p>
      <hr class="line">

      <section class="blog-posts">
        <PostList v-for="edge in $page.allBlogPost.edges" :key="edge.node.id" :post="edge.node" />
      </section>

      <div class="pagination-container">
        <Pager class="pagination" :info="$page.allBlogPost.pageInfo"/>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Blog($page: Int) {
  allBlogPost(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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

<script>
import PostList from '~/components/PostList.vue';
import { Pager } from 'gridsome';


export default {
  components: {
    PostList,
    Pager
  },
  metaInfo: {
    title: 'Blog'
  }
}
</script>

<style lang="scss" scoped>
  .line {
    border: 0.5px solid #cdc8c5;
    margin: 3rem 0;
  }

  .pagination-container {
    margin-top: 4rem;
  }

  .pagination {
    a {
      color: #fff;
      background-color: $primary;
      margin-right: 1rem;
      padding: 7px 20px;
      text-decoration: none;

      &:hover {
        background-color: darken($primary, 8%);
      }
    }
  }
</style>
