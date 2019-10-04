<template>
  <header class="header">
    <div class="header-container">
      <strong>
        <g-link class="site-title" to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">Blog</g-link>
        <g-link class="nav__link" to="/about/">Work</g-link>
        <g-link class="nav__link" to="/about/">Contact</g-link>
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
  padding: 15px;
  margin-bottom: 20px;
  // height: 80px;
  box-shadow: 0 3px 6px rgba(33, 33, 33, 0.2);
  border-top: 8px solid #4281A4;

  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    max-width: 1140px;
    margin: 0 auto;
  }
}

a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 400;
  font-size: 1.5rem;
}

a.site-title {
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
}

.nav__link {
  margin-right: 20px;
}

@media (min-width: $medium) {
  a {
    font-size: 1.8rem;
  }
}
</style>