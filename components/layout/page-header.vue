<template>
  <header class="header">
    <div class="header-container">
      <strong>
        <nuxt-link class="site-title" to="/">Eugene Grechko 👨‍💻</nuxt-link>
      </strong>
      <nav class="nav">
        <nuxt-link class="nav__link" to="/">Home</nuxt-link>
        <nuxt-link class="nav__link" to="/blog/">Blog</nuxt-link>
        <nuxt-link class="nav__link" to="/work/">Work</nuxt-link>
        <nuxt-link class="nav__link" to="/about/">About</nuxt-link>
        <nuxt-link class="nav__link" to="/contact/">Contact</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 15px;
  box-shadow: 0 1px 5px rgba(33, 33, 33, 0.13);
  border-top: 8px solid $primary;
}

.header-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 1140px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 400;
  font-size: 1.5rem;
}

a.site-title {
  display: inline-block;
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 15px;
}

.nav__link {
  margin-right: 20px;
}

@media (min-width: $medium) {
  .header-container {
    flex-direction: row;
  }

  a {
    font-size: 1.6rem;
  }

  a.site-title {
    margin-bottom: 0;
  }
}
</style>
