<template>
  <div class="site">
    
    <PageHeader />

    <div class="site-content">
      <slot/>
    </div>

    <PageFooter />

  </div>
</template>

<script>
import PageHeader from '~/layouts/PageHeader.vue'
import PageFooter from '~/layouts/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter
  }
}
</script>


<style lang="scss">
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}

</style>
