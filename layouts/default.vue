<!--
  # Full height layout component

  Component will put header at the top of the page, footer at the bottom and fill in the middle with the content. If there is no content the footer will still be at the bottom.

  ## Requirement

  - Page header component (or use placeholder)
  - Page footer component (or use placeholder)
  - Sass loader for webpack

  CREDIT: Eugene Grechko https:eugenegrechko.com
-->

<template>
  <div class="site">
    <PageHeader />

    <div class="site-content">
      <nuxt />
    </div>

    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '~/components/layout/page-header'
import PageFooter from '~/components/layout/page-footer'

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
