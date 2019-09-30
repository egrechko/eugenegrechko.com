<template>
  <div class="site">
    
    <PageHeader />

    <div class="site-container">
      <slot/>
    </div>

  </div>
</template>

<script>
import PageHeader from '~/layouts/PageHeader.vue'

export default {
  components: {
    PageHeader
  }
}
</script>


<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.site-container {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

</style>
