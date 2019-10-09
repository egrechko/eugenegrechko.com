<template>
  <Layout>
    <div class="container">
      <h1>Blog</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
      <hr class="line">

      <section class="blog-posts">
        <PostList v-for="edge in $page.allBlogPost.edges" :key="edge.node.id" :post="edge.node" />
      </section>

      <Pager :info="$page.allBlogPost.pageInfo"/>
    </div>
  </Layout>
</template>

<page-query>
query Blog($page: Int) {
  allBlogPost(perPage: 2, page: $page) @paginate {
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
