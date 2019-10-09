<template>
  <footer class="footer">
    <div class="footer-container">
      <p>Made with ❤ in Portland, Oregon</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    background-color: $dark;
    border-bottom: 8px solid $primary;
    color: #fff;
    margin-top: 7rem;
  }

  .footer-container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 15px;
  }

  p {
    font-size: 1.4rem;
  }

  @media (min-width: $medium) {
    .footer {
      margin-top: 10rem;
    }

    .footer-container {
      padding: 0 30px;
    }

    p {
      font-size: 1.6rem;
    }
  }
</style>

