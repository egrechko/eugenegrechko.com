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


<style lang="scss">
:root {
  font-size: 62.5%;
}

body {
  font-family: "Nunito",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  font-size: 1.4rem;
}

.site-container {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

</style>
