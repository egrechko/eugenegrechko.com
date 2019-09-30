<template>
  <header class="header">
    <div class="site-container">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </div>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss" scoped>
.header {
  padding: 20px 0;
  margin-bottom: 20px;
  height: 80px;

  .site-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.nav__link {
  margin-left: 20px;
}
</style>